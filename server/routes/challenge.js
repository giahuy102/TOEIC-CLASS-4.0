const express = require('express');
const User = require('../model/User');
const router = express.Router();
const Challenge = require('../model/Challenge');

router.post('/create_challenge', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body['emailUser'] });
        var currentDate = new Date();
        var status_check = 0

        if (req.body['challenge']['startDate'] > currentDate) {
            status_check = 1
        }

        const challenge = Challenge({
            challenge_id: Date.now(),
            status: status_check,
            title: req.body['challenge']['title'],
            start: req.body['challenge']['startDate'],
            end: req.body['challenge']['endDate'],
            created_at: currentDate,
            created_by: user['fullname'],
        })

        try {
            const savedChallenge = await challenge.save();
            res.status(201).send("create challenge successfully");
        } catch (err) {
            res.status(400).send(err);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_all_challenges', async (req, res) => {
    try {
        let challenges = await Challenge.find({})
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_challenging', async (req, res) => {
    try {
        let challenges = await Challenge.find({ status: 0 })
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_upcoming', async (req, res) => {
    try {
        let challenges = await Challenge.find({ status: 1 })
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenges_ended', async (req, res) => {
    try {
        let challenges = await Challenge.find({ status: 2 })
        console.log("challenges list: ", challenges)
        res.status(200).send(challenges);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/get_challenge/:challenge_id', async (req, res) => {
    try {
        console.log(req.params.challenge_id)
        // let challenges = await Challenge.find({})
        // console.log("challenges list: ", challenges)
        // res.status(200).send(challenges);
        res.status(200).send('get a single challenge');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;