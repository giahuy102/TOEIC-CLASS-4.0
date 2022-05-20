const express = require('express');
const UserModel = require('../model/UserModel');
const router = express.Router();
const ChallengeModel = require('../model/ChallengeModel');

router.post('/create_challenge', async (req, res) => {
    try {
        console.log("req body: ", req.body)
        const user = await UserModel.findOne({ email: req.body['emailUser'] });
        console.log("user: ", user)
        var currentDate = new Date()
        var startDate = new Date(req.body['challenge']['startDate'])
        var endDate = new Date(req.body['challenge']['endDate'])
        var status_check = 0

        // upcoming
        if (startDate > currentDate) {
            status_check = 1
        }
        else if (startDate < currentDate
            && endDate > currentDate) {
            status_check = 0
        }

        console.log("status_check: ", status_check)

        const challenge = new ChallengeModel({
            challenge_id: Date.now(),
            status: status_check,
            title: req.body['challenge']['title'],
            start: req.body['challenge']['startDate'],
            end: req.body['challenge']['endDate'],
            created_at: currentDate,
            created_by: user['fullname'],
        })

        try {
            const savedChallengeModel = await challenge.save();
            res.status(201).send("create challenge successfully");
        } catch (err) {
            console.log("here 1")
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

router.get('/get_challenges_challenging', async (req, res) => {
    try {
        let challenges = await ChallengeModel.find({ status: 0 })
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_upcoming', async (req, res) => {
    try {
        let challenges = await ChallengeModel.find({ status: 1 })
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_ended', async (req, res) => {
    try {
        let challenges = await ChallengeModel.find({ status: 2 })
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