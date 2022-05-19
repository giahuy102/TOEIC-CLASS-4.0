const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChallengeCreationModel', userSchema);