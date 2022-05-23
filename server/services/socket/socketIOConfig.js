const cron = require('node-cron');

const UserModel = require("../../model/UserModel");
const ChallengeModel = require("../../model/ChallengeModel");
const TestModel = require("../../model/TestModel");
const ChallengeParticipationModel = require("../../model/ChallengeParticipationModel");
const ChallengeEventsRecordModel = require("../../model/ChallengeEventsRecordModel");
const ClassroomModel = require("../../model/ClassroomModel");

const socketIOConfig = (io) => {
    /**
     * Application has multiple tenants so you want to dynamically create one namespace per tenant
     */
    const socketIOAllServersNamespace = io.of(/^\/w+$/);


    socketIOAllServersNamespace.on("connection", async function (socket) {
        console.log("/******************* 'socketIOConfig.js io.on('connection')' ********************/");
        const socketIOServerDedicatedNamespaceByChallengeId = socket.nsp;
        /**
         * socketIOServerDedicatedNamespaceByChallengeId.emit() to emit notify all other client about
         * a changing in ChallengeEventsRecordModel RankingChart (whenever a user emit a right answer
         * that adding a score in server RankingChart)
         */
        socket.isAuthenticated = false;
        socket.on('authenticate', async function (token) {
            try {
                const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
                req.user = decoded;
                const user_id = req.user.user_id;
                const verifyUserModel = await UserModel.find({ _id: user_id })
                if (!verifyUserModel) {
                    console.log("socketIOConfig.js io.on('connection') token invalid since user_id not match with any user");
                } else {
                    console.log("Authenticated socket, socket.id:", socket.id);
                    socket.isAuthenticated = true;
                    socket.verifyUserModel = JSON.parse(JSON.stringify(verifyUserModel));
                    const { user_id, challenge_id, classroom_id } = socket.handshake.auth; /** Line 20 SocketClient.js */
                    const UserModelQuery = new UserModel.findOne({ _id: user_id });
                    const ChallengeModelQuery = new ChallengeModel.findOne({ _id: challenge_id });
                    const ClassroomModelQuery = new ClassroomModel.findOne({ _id: classroom_id });

                    const test_id = ChallengeModelQuery.test_id;
                    const TestModelQuery = new TestModel.findOne({ _id: test_id });
                    let TestModelQueryMutableObject = JSON.parse(JSON.stringify(TestModelQuery));
                    let TestModelQuerySections = TestModelQueryMutableObject.sections;
                    TestModelQuerySections.forEach(section => {
                        section.questions.forEach(question => {
                            question['questionState'] = 'Not answered';
                        })
                    })

                    const newChallengeParticipationModel = new ChallengeParticipationModel({
                        user: user_id,
                        challenge: challenge_id,
                        classroom: classroom_id,
                        score: 0,
                        status: 0,
                        examState: TestModelQuerySections,
                    });

                    try {
                        await newChallengeParticipationModel.save();
                        const ChallengeEventsRecordModelQuery = await ChallengeEventsRecordModel.findOne({
                            challenge_id: challenge_id,
                        })

                        ChallengeEventsRecordModelQuery.rankingChart.push({
                            user_id, score: 0
                        })

                        try {
                            ChallengeEventsRecordModelQuery.save();
                            socketIOServerDedicatedNamespaceByChallengeId.emit('newUserParticipateChallenge', { user_id, score: 0 })
                            /** 
                             * Hope the Query is change accordingly to the current database value after using .save() method 
                             * */
                            socket.emit('initChallengeRealTimeSliceDataEmitted', { newChallengeParticipationModel, ChallengeEventsRecordModelQuery })
                        } catch (err) {
                            console.log("socketIOConfig.js io.on('connection') ChallengeEventsRecordModelQuery.save() Error", err);
                        }

                    } catch (err) {
                        console.log("socketIOConfig.js io.on('connection') newChallengeParticipationModel.save() Error", err)
                    }
                }
                // console.log(req.user);
            } catch (err) {
                console.log("socketIOConfig.js io.on('connection') error:", err);
            }
        });


        setTimeout(function () {
            if (!socket.isAuthenticated) {
                console.log("Disconnecting unauthorized by token socket ", socket.id);
                socket.disconnect('unauthorized')
            }
        }, 60000);
    })
}

const checkAndUpdateAllChallengeStatus = async (io) => {
    cron.schedule('* * * * * *', async function () {
        // console.log('checkAndUpdateAllChallengeStatus every second');
        var currentDate = new Date()
        const AllChallengesModel = await ChallengeModel.find({});
        for (const ChallengeModelItem of AllChallengesModel) {
            if (ChallengeModelItem.start > currentDate) {
                if (ChallengeModelItem.status !== 1) {
                    console.log(`Status of challenge ${ChallengeModelItem.challenge_id} change to upcoming`)
                    ChallengeModelItem.status = 1
                }
            }
            else if (ChallengeModelItem.start < currentDate && ChallengeModelItem.end > currentDate) {
                if (ChallengeModelItem.status !== 0) {
                    console.log(`Status of challenge ${ChallengeModelItem.challenge_id} change to challenging`)
                    ChallengeModelItem.status = 0;

                    const newChallengeEventsRecordModel = new ChallengeEventsRecordModel({
                        /** 
                         * Currenly Challenge is create with challenge_id as main id 
                         * -> Must change back to _id for JOIN query to be functional
                         * */
                        challenge_id: ChallengeModelItem._id,
                        classroom_id: ChallengeModelItem.classroom_id,
                        test_id: ChallengeModelItem.test_id,
                        status: 0, //0: ongoing, 1: upcoming, 2: finish
                        title: ChallengeModelItem.title,
                        start: ChallengeModelItem.start,
                        end: ChallengeModelItem.end,
                        currentTime: currentDate,
                        /* Date() - Date() will throw a Number that in ms unit */
                        currentTimeLeft: currentDate - ChallengeModelItem.start,
                        /**
                         * Sort by score
                         */
                        rankingChart: []
                    });
                    try {
                        await newChallengeEventsRecordModel.save();
                    } catch (err) {
                        console.log("checkAndUpdateAllChallengeStatus await newChallengeEventsRecordModel.save(); Error", err);
                    }
                } else {
                    /**
                     * Challenging is Still Ongoing, Update the currentTime field for ChallengeEventsRecordModel
                     */
                    const ChallengeEventsRecordModelQuery = await ChallengeEventsRecordModel.findOne({ challenge_id: ChallengeModelItem._id });
                    ChallengeEventsRecordModelQuery.currentTime = currentDate;
                    ChallengeEventsRecordModelQuery.currentTimeLeft = ChallengeEventsRecordModelQuery.end - currentDate;
                    try {
                        await ChallengeEventsRecordModelQuery.save();
                    } catch (err) {
                        console.log("checkAndUpdateAllChallengeStatus await ChallengeEventsRecordModelQuery.save(); Error", err);
                    }
                }
            }
            else if (ChallengeModelItem.end < currentDate) {
                if (ChallengeModelItem.status !== 2) {
                    console.log(`Status of challenge ${ChallengeModelItem.challenge_id} change to ended`)
                    /**
                     * 
                     *      Code for Challenge EndTime Reached Here
                     * 
                     *      - Broadcast Changing Status Event to all Client to move all of them to Final Result Screen
                     *      - From each of them client will send back an event to normalize (scale 10) the ChallengeParticipationModel score
                     *      - Then finally Run normalization in All Of ChallengeEventsRecordModel rankingChart scores
                     * 
                     */
                    ChallengeModelItem.status = 2;
                    const ChallengeEventsRecordModelQuery = await ChallengeEventsRecordModel.findOne({ challenge_id: ChallengeModelItem._id });
                    try {
                        await ChallengeEventsRecordModelQuery.save();
                        /**
                         * Get the namespace by ChallengeModelItem._id to broadcast 'endingChallengeRealTimeEvent'event
                         * to all the sockets belongs to that namespace IO Server only 
                         */
                        const socketIOServerDedicatedNamespaceByChallengeId = io.of(`/${ChallengeModelItem._id}`);
                        socketIOServerDedicatedNamespaceByChallengeId.emit('endingChallengeRealTimeEvent', { ChallengeModelItem, ChallengeEventsRecordModelQuery });
                    } catch (err) {
                        console.log("checkAndUpdateAllChallengeStatus await ChallengeEventsRecordModelQuery.save(); Error", err);
                    }
                }
            }
            await ChallengeModelItem.save();
        }
    });
}

module.exports = { socketIOConfig, checkAndUpdateAllChallengeStatus }