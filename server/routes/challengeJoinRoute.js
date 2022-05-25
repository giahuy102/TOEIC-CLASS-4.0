const express = require('express');
const router = express.Router();

const ChallengeParticipationModel = require('../model/ChallengeParticipationModel');

router.get('/get_result_all', async (req, res) => {
    try {
        res.status(200).send("get all participation challenge")
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;