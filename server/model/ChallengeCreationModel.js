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
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChallengeCreationModel', userSchema);