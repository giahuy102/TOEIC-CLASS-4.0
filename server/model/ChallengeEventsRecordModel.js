const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    challenge_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChallengeModel',
    },

    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomModel',
    },

    test_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestModel',
    },

    status: Number, //0: ongoing, 1: upcoming, 2: finish
    title: String,
    start: Date,
    end: Date,
    currentTime: Date,
    currentTimeLeft: Number, /** Hope Date() - Date() will throw a Number that is convertible back to HH:MM:SS unit */
    /**
     * Sort by score
     */
    rankingChart: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel',
            },
            score: Number,
            answers: Number,
        }
    ]

});

module.exports = mongoose.model('ChallengeEventsRecordModel', userSchema);