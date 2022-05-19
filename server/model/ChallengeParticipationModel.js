const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChallengeModel'
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomModel'
    },
    score: mongoose.Schema.Types.Decimal128,
    status: Number //0: Not done, 1: Done
});

module.exports = mongoose.model('ChallengeParticipationModel', userSchema);