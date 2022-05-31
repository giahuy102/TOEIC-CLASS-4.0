const express = require('express');
const cron = require('node-cron');
const router = express.Router();

const UserModel = require('../model/UserModel');
const TestModel = require('../model/TestModel');
const ChallengeModel = require('../model/ChallengeModel');
const ChallengeEventsRecordModel = require('../model/ChallengeEventsRecordModel');

router.post('/create_challenge', async (req, res) => {
    try {
        console.log("[challengeRoute.js] /create_challenge req.body: ", req.body)
        const { userId, classId, challenge } = req.body;
        const { type } = challenge;
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

        const NumberOfTestCount = await TestModel.countDocuments({ classroom_id: { $eq: classId }, type: { $eq: type } });
        if (NumberOfTestCount < 1) {
            res.status(401).send({
                message: `Your Classroom has no ${type} test created, please create one before proceed`,
            })
        }
        else {
            const RandomTestCountIndex = Math.floor(Math.random() * NumberOfTestCount);
            let RandomTestModel = {};
            try {
                RandomTestModel = await TestModel.findOne({ classroom_id: classId }).skip(RandomTestCountIndex).exec();
            } catch (err) {
                console.log('const RandomTestModel = await TestModel.findOne().skip(random); Error', err);
                res.status(400).send(err);
            }

            const newChallengeModel = new ChallengeModel({
                challenge_id: Date.now(),
                create_user_id: userId,
                classroom_id: classId,
                test_id: RandomTestModel._id,
                status: status_check,
                type: req.body['challenge']['type'],
                title: req.body['challenge']['title'],
                start: req.body['challenge']['startDate'],
                end: req.body['challenge']['endDate'],
                created_at: currentDate,
                created_by: user['username'],
            })

            try {
                const savedChallengeModel = await newChallengeModel.save();
                res.status(201).send(savedChallengeModel);
            } catch (err) {
                res.status(400).send(err);
            }
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_all_challenges', async (req, res) => {
    try {
        let challenges = await ChallengeModel.find({})
        // console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_challenging/:class_id', async (req, res) => {
    try {
        const { class_id } = req.params;
        let challenges = await ChallengeModel.find({ status: 0, classroom_id: class_id })
        // console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_upcoming/:class_id', async (req, res) => {
    try {
        const { class_id } = req.params;
        let challenges = await ChallengeModel.find({ status: 1, classroom_id: class_id })
        // console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_ended/:class_id', async (req, res) => {
    try {
        const { class_id } = req.params;
        let challenges = await ChallengeModel.find({ status: 2, classroom_id: class_id })
        // console.log("challenges list: ", challenges)
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