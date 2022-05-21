const express = require('express');
const cron = require('node-cron');
const router = express.Router();

const UserModel = require('../model/UserModel');
const ChallengeModel = require('../model/ChallengeModel');

const checkAndUpdateAllChallengeStatus = async () => {
    cron.schedule('* * * * * *', async function () {
        var currentDate = new Date()
        const AllChallengesModel = await ChallengeModel.find({});
        for (const ChallengeModelItem of AllChallengesModel) {
            if (ChallengeModelItem.start > currentDate) {
                if (ChallengeModelItem.status !== 1) {
                    console.log(`Status of challenge ${ChallengeModelItem.challenge_id} change to upcoming`)
                }
                ChallengeModelItem.status = 1
            }
            else if (ChallengeModelItem.start < currentDate && ChallengeModelItem.end > currentDate) {
                if (ChallengeModelItem.status !== 0) {
                    console.log(`Status of challenge ${ChallengeModelItem.challenge_id} change to challenging`)
                }
                ChallengeModelItem.status = 0
            }
            else if (ChallengeModelItem.end < currentDate) {
                if (ChallengeModelItem.status !== 2) {
                    console.log(`Status of challenge ${ChallengeModelItem.challenge_id} change to ended`)
                }
                ChallengeModelItem.status = 2
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


        const challenge = new ChallengeModel({
            challenge_id: Date.now(),
            create_user_id: userId,
            classroom_id: classId,
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