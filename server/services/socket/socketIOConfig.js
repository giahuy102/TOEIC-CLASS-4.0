const cron = require('node-cron');
const jwt = require('jsonwebtoken');

const UserModel = require("../../model/UserModel");
const ChallengeModel = require("../../model/ChallengeModel");
const TestModel = require("../../model/TestModel");
const ChallengeParticipationModel = require("../../model/ChallengeParticipationModel");
const ChallengeEventsRecordModel = require("../../model/ChallengeEventsRecordModel");
const ClassroomModel = require("../../model/ClassroomModel");
const UserJoinClassroomModel = require("../../model/UserJoinClassroomModel");

const socketIOConfig = (io, challenge_id) => {
    /**
     * Application has multiple tenants so you want to dynamically create one namespace per tenant
     */
    // const socketIOAllServersNamespace = io.of(/^\/dynamic-\d+$/);
    // const socketIOAllServersNamespace = io.of('/');
    console.log('New Challenge _id is submitted with creation of new dedicated SocketIO Server Namespace', challenge_id);
    const socketIOServerDedicatedNamespaceByChallengeId = io.of(`/${challenge_id}`);

    socketIOServerDedicatedNamespaceByChallengeId.on("connection", async function (socket) {
        console.log("'socketIOConfig.js io.of(`/${challenge_id}`).on('connection')' challenge_id Namespace", challenge_id);
        const socketIOServerDedicatedNamespaceByChallengeId = socket.nsp;
        // console.log('io.of(`/${challenge_id}`).on("connection",...) socketIOServerDedicatedNamespaceByChallengeId', socketIOServerDedicatedNamespaceByChallengeId);
        /**
         * socketIOServerDedicatedNamespaceByChallengeId.emit() to emit notify all other client about
         * a changing in ChallengeEventsRecordModel RankingChart (whenever a user emit a right answer
         * that adding a score in server RankingChart)
         */
        socket.isAuthenticated = false;
        socket.on('authenticate', async function (token) {
            try {
                console.log("Inside socketIOConfig.js socket.on('authenticate') Namespace", socket.nsp.name);
                const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
                const user_id = decoded.user_id;
                const verifyUserModel = await UserModel.find({ _id: user_id })
                if (!verifyUserModel) {
                    console.log("socketIOConfig.js socket.on('authenticate') token invalid since user_id not match with any user");
                } else {
                    // console.log("Authenticated socket, socket.id:", socket.id);
                    // console.log("Authenticated socket, socket.handshake.auth:", socket.handshake.auth);
                    socket.isAuthenticated = true;
                    socket.verifyUserModel = JSON.parse(JSON.stringify(verifyUserModel));
                    const { user_id, challenge_id, classroom_id } = socket.handshake.auth; /** Line 20 SocketClient.js */
                    const ChallengeModelQuery = await ChallengeModel.findOne({ _id: challenge_id });

                    const test_id = ChallengeModelQuery.test_id;
                    const TestModelQuery = await TestModel.findOne({ _id: test_id });
                    let TestModelQueryMutableObject = JSON.parse(JSON.stringify(TestModelQuery));
                    let TestModelQuerySections = TestModelQueryMutableObject.sections;

                    const ChallengePariticipationModelQueryToCheckIfUserHasParticipateAlready = await ChallengeParticipationModel.findOne({
                        user: user_id,
                        challenge: challenge_id,
                    });

                    const anotherChallengeModelQuery = await ChallengeModel.findOne({ _id: challenge_id });

                    if (!ChallengePariticipationModelQueryToCheckIfUserHasParticipateAlready) {
                        /**
                         * New User Participate Challenge -> create new ChallengeParticipationModel()
                         */
                        const newChallengeParticipationModel = new ChallengeParticipationModel({
                            user: user_id,
                            challenge: challenge_id,
                            classroom: anotherChallengeModelQuery.classroom_id,
                            score: 0,
                            status: 0,
                            examState: TestModelQuerySections,
                        });

                        try {
                            await newChallengeParticipationModel.save();
                            const ChallengeEventsRecordModelQuery = await ChallengeEventsRecordModel.findOne({
                                challenge_id: challenge_id,
                            })
                            console.log("socket.on('authenticate',...) ChallengeEventsRecordModelQuery challenge_id", challenge_id)
                            console.log("socket.on('authenticate',...) ChallengeEventsRecordModelQuery", ChallengeEventsRecordModelQuery)
                            const UserModelQuery = await UserModel.findOne({ _id: user_id });
                            ChallengeEventsRecordModelQuery.rankingChart.push({
                                user_id,
                                score: 0,
                                answers: 0,
                                username: UserModelQuery.username,
                            })
                            try {
                                await ChallengeEventsRecordModelQuery.save();
                                socketIOServerDedicatedNamespaceByChallengeId.emit('newUserParticipateChallenge', { user_id, score: 0, answers: 0 })
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
                    } else {
                        /**
                         * User has already join challenge, just reconnect
                         */
                        const ChallengeEventsRecordModelQuery = await ChallengeEventsRecordModel.findOne({
                            challenge_id: challenge_id,
                        })
                        console.log(`[SocketIOConfig.js] socketIOServerDedicatedNamespaceByChallengeId.on("connection",...) ChallengePariticipationModelQueryToCheckIfUserHasParticipateAlready`, ChallengePariticipationModelQueryToCheckIfUserHasParticipateAlready);
                        socket.emit('initChallengeRealTimeSliceDataEmitted', {
                            newChallengeParticipationModel: ChallengePariticipationModelQueryToCheckIfUserHasParticipateAlready,
                            ChallengeEventsRecordModelQuery
                        });
                    }
                }
            } catch (err) {
                console.log("socketIOConfig.js io.on('connection') error:", err);
            }
        });



        socket.on('userChooseAnAnswer', async function (data) {
            // console.log("[socketIOConfig.js]  socket.on('userChooseAnAnswer',...) data ", data);
            console.log("Inside socketIOConfig.js socket.on('userChooseAnAnswer',...) Namespace", socket.nsp.name);
            console.log("Inside socketIOConfig.js socket.on('userChooseAnAnswer',...) challenge_id", data.challenge_id);
            const { user_id, sectionIndex, questionIndex, theAnswer, isAnswerCorrected, challenge_id } = data;
            const ChallengeParticipationModelQuery = await ChallengeParticipationModel.findOne({ user: user_id, challenge: challenge_id });
            const ChallengeEventsRecordModelQuery = await ChallengeEventsRecordModel.findOne({ challenge_id: challenge_id });

            const ChallengeModelAndTestModelDataQuery = await ChallengeModel.findOne({ _id: challenge_id }).populate('test_id');

            const totalTestScore = ChallengeModelAndTestModelDataQuery.test_id.score;

            /**
             * Only if the question state is still 'NG' shall we update examStatew
             */
            if (ChallengeParticipationModelQuery.examState[sectionIndex].questions[questionIndex].answerState === 'NG') {
                if (!isAnswerCorrected) {
                    ChallengeParticipationModelQuery.examState[sectionIndex].questions[questionIndex].chosenAnswer = theAnswer;
                    ChallengeParticipationModelQuery.examState[sectionIndex].questions[questionIndex].answerState = 'WA';
                    for (const rankingChartItemPointer of ChallengeEventsRecordModelQuery.rankingChart) {
                        // console.log(`${rankingChartItemPointer.user_id} ${user_id} ${rankingChartItemPointer.user_id == user_id}`);
                        if (rankingChartItemPointer.user_id == user_id) {
                            rankingChartItemPointer.answers += 1;
                            break;
                        }
                    }
                }
                else {
                    ChallengeParticipationModelQuery.examState[sectionIndex].questions[questionIndex].chosenAnswer = theAnswer;
                    ChallengeParticipationModelQuery.examState[sectionIndex].questions[questionIndex].answerState = 'AC';
                    ChallengeParticipationModelQuery.score += (1 / totalTestScore) * 10;
                    for (const rankingChartItemPointer of ChallengeEventsRecordModelQuery.rankingChart) {
                        if (rankingChartItemPointer.user_id == user_id) {
                            rankingChartItemPointer.answers += 1;
                            rankingChartItemPointer.score += (1 / totalTestScore) * 10;
                            break;
                        }
                    }
                }
                try {
                    await ChallengeParticipationModelQuery.save();
                    try {
                        await ChallengeEventsRecordModelQuery.save();
                        socketIOServerDedicatedNamespaceByChallengeId.emit('serverEmitBackChallengeEventsRecordModelDataToClientForUpdate', { ChallengeEventsRecordModelQuery });
                    } catch (err) {
                        console.log("socket.on('userChooseAnAnswer', ...): await ChallengeEventsRecordModelQuery.save(); Error", err)
                    }
                } catch (err) {
                    console.log("socket.on('userChooseAnAnswer', ...): await ChallengeParticipationModelQuery.save(); Error", err)
                }
            }
        })


        setTimeout(function () {
            if (!socket.isAuthenticated) {
                console.log("Disconnecting unauthorized by token socket ", socket.id);
                socket.disconnect('unauthorized')
            }
        }, 20000);
    })
}

const checkAndUpdateAllChallengeStatus = async (io) => {
    cron.schedule('*/3 * * * * *', async function () {
        var currentDate = new Date()
        const AllChallengesModel = await ChallengeModel.find({});
        for (const ChallengeModelItem of AllChallengesModel) {
            if (ChallengeModelItem.start > currentDate) {
                if (ChallengeModelItem.status !== 1) {
                    console.log(`Status of challenge ${ChallengeModelItem._id} change to upcoming`)
                    ChallengeModelItem.status = 1
                }
            }
            else if (ChallengeModelItem.start < currentDate && ChallengeModelItem.end > currentDate) {
                if (ChallengeModelItem.status !== 0) {
                    console.log(`Status of challenge ${ChallengeModelItem._id} change to challenging`)
                    ChallengeModelItem.status = 0;
                }

                const ChallengeEventsRecordModelQuery = await ChallengeEventsRecordModel.findOne({ challenge_id: ChallengeModelItem._id });

                if (!ChallengeEventsRecordModelQuery) {
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
                        currentTimeLeft: Math.max(ChallengeModelItem.end - currentDate, 0),
                        /**
                         * Sort by score
                         */
                        rankingChart: []
                    });
                    try {
                        await newChallengeEventsRecordModel.save();
                        /**
                         * Register on('connection') for now newly challenging Challenge to start
                         * receiving connection request from socket clients for this namespace ('challenge_id') socket
                         */
                        socketIOConfig(io, ChallengeModelItem._id);
                    } catch (err) {
                        console.log("checkAndUpdateAllChallengeStatus await newChallengeEventsRecordModel.save(); Error", err);
                    }
                } else {
                    /**
                     * Challenging is Still Ongoing, Update the currentTime field for ChallengeEventsRecordModel
                     */
                    ChallengeEventsRecordModelQuery.currentTime = currentDate;
                    ChallengeEventsRecordModelQuery.currentTimeLeft = ChallengeEventsRecordModelQuery.end - currentDate;
                    try {
                        await ChallengeEventsRecordModelQuery.save();
                        const socketIOServerDedicatedNamespaceByChallengeId = io.of(`/${ChallengeModelItem._id}`);
                        socketIOServerDedicatedNamespaceByChallengeId.emit('serverEmitBackChallengeEventsRecordModelCurrentTimeLeftToClientForUpdate', { newCurrentTimeLeft: ChallengeEventsRecordModelQuery.end - currentDate });
                    } catch (err) {
                        console.log("checkAndUpdateAllChallengeStatus await ChallengeEventsRecordModelQuery.save(); Error", err);
                    }
                }
            }
            else if (ChallengeModelItem.end < currentDate) {
                if (ChallengeModelItem.status !== 2) {
                    console.log(`Status of challenge ${ChallengeModelItem._id} change to ended`)
                    /**
                     *
                     *      Code for Challenge EndTime Reached Here
                     *
                     *      - Broadcast Changing Status Event to all Client to move all of them to Final Result Screen
                     *      - From each of them client will send back an event to normalize (scale 10) the ChallengeParticipationModel score
                     *      - Then finally Run normalization in All Of ChallengeEventsRecordModel rankingChart scores
                     * 
                     *      - THEN: Update the all time accumulated scored in UserJoinClassroomModel
                     *
                     */
                    ChallengeModelItem.status = 2;
                    const ChallengeEventsRecordModelQuery = await ChallengeEventsRecordModel.findOne({ challenge_id: ChallengeModelItem._id });
                    try {
                        await ChallengeEventsRecordModelQuery.save();
                        const classroom_id = ChallengeEventsRecordModelQuery.classroom_id;
                        const rankingChart = ChallengeEventsRecordModelQuery.rankingChart;

                        const ClassroomModelQuery = await ClassroomModel.findOne({ _id: classroom_id });
                        const currentClassroomNumberOfCompletedChallenge = ClassroomModelQuery.number_of_completed_challenge;
                        for (const rankingChartItem of rankingChart) {
                            const user_id = rankingChartItem.user_id;
                            const newScore = rankingChartItem.score;
                            const UserJoinClassroomModelQuery = await UserJoinClassroomModel.findOne({ user: user_id, classroom: classroom_id });
                            const currentUserAverageScoreInClass = UserJoinClassroomModelQuery.average_score;
                            console.log("Current Average Score", (currentUserAverageScoreInClass * UserJoinClassroomModelQuery.number_of_test_done + newScore) / (UserJoinClassroomModelQuery.number_of_test_done + 1))
                            UserJoinClassroomModelQuery.average_score = (currentUserAverageScoreInClass * UserJoinClassroomModelQuery.number_of_test_done + newScore) / (UserJoinClassroomModelQuery.number_of_test_done + 1);
                            UserJoinClassroomModelQuery.number_of_test_done += 1;
                            await UserJoinClassroomModelQuery.save();
                            ClassroomModelQuery.number_of_completed_challenge += 1;
                            await ClassroomModelQuery.save();
                        }
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