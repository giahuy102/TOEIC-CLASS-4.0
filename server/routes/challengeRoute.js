const express = require('express');
const cron = require('node-cron');
const router = express.Router();

const UserModel = require('../model/UserModel');
const TestModel = require('../model/TestModel');
const ChallengeModel = require('../model/ChallengeModel');
const ChallengeEventsRecordModel = require('../model/ChallengeEventsRecordModel');

const checkAndUpdateAllChallengeStatus = async () => {
    /**
     * Is it every 10 second run cron task?
     */
    cron.schedule('10 * * * * *', async function () {
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
                        currentTimeLeft: 1000000, /** Hope Date() - Date() will throw a Number that is convertible back to HH:MM:SS unit */
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
                    ChallengeModelItem.status = 2
                    /**
                     * 
                     *      Code for Challenge EndTime Reached Here
                     * 
                     *      - Broadcast Changing Status Event to all Client to move all of them to Final Result Screen
                     *      - From each of them client will send back an event to normalize (scale 10) the ChallengeParticipationModel score
                     *      - Then finally Run normalization in All Of ChallengeEventsRecordModel rankingChart scores
                     * 
                     */

                    /**
                     * You are currently here
                     */
                }
            }


            ChallengeModelItem.save();
        }
    });
}

checkAndUpdateAllChallengeStatus();

router.post('/create_challenge', async (req, res) => {
    try {
        console.log("req body: ", req.body)
        const { userId, classId } = req.body;
        const user = await UserModel.findOne({ _id: userId });
        console.log("user: ", user)
        var currentDate = new Date()
        var startDate = new Date(req.body['challenge']['startDate'])
        var endDate = new Date(req.body['challenge']['endDate'])
        var status_check = 0

        // upcoming

        if (startDate > endDate) {
            res.status(400).send({ message: 'Invalid end date and start date' })
        }
        console.log('Status picked by date');
        if (startDate > currentDate) {
            status_check = 1
        }
        else if (startDate < currentDate && endDate > currentDate) {
            status_check = 0
        }
        else if (endDate < currentDate) {
            status_check = 2
        }

        const NumberOfTestCount = await TestModel.countDocuments();
        const RandomTestCountIndex = Math.floor(Math.random() * NumberOfTestCount);
        console.log('challengeRoute /create_challenge TestModel Number Of Test', NumberOfTestCount);
        let RandomTestModel = {};
        try {
            RandomTestModel = await TestModel.findOne().skip(RandomTestCountIndex).exec();
        } catch (err) {
            console.log('const RandomTestModel = await TestModel.findOne().skip(random); Error', err);
            res.status(400).send(err);
        }
        console.log('challengeRoute /create_challenge TestModel RandomTestModel', RandomTestModel);

        const challenge = new ChallengeModel({
            challenge_id: Date.now(),
            create_user_id: userId,
            classroom_id: classId,
            test_id: RandomTestModel._id,
            status: status_check,
            title: req.body['challenge']['title'],
            start: req.body['challenge']['startDate'],
            end: req.body['challenge']['endDate'],
            created_at: currentDate,
            created_by: user['username'],
        })

        try {
            const savedChallengeModel = await challenge.save();
            res.status(201).send(savedChallengeModel);
        } catch (err) {
            res.status(400).send(err);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_all_challenges', async (req, res) => {
    try {
        let challenges = await ChallengeModel.find({})
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_challenging/:class_id', async (req, res) => {
    try {
        const { class_id } = req.params;
        let challenges = await ChallengeModel.find({ status: 0, classroom_id: class_id })
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_upcoming/:class_id', async (req, res) => {
    try {
        const { class_id } = req.params;
        let challenges = await ChallengeModel.find({ status: 1, classroom_id: class_id })
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_ended/:class_id', async (req, res) => {
    try {
        const { class_id } = req.params;
        let challenges = await ChallengeModel.find({ status: 2, classroom_id: class_id })
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenge/:challenge_id', async (req, res) => {
    try {
        console.log(req.params.challenge_id)
        // let challenges = await ChallengeModel.find({})
        // console.log("challenges list: ", challenges)
        // res.status(200).send(challenges);
        res.status(200).send('get a single challenge');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;