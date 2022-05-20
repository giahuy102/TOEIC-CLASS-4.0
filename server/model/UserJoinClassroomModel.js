const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accumulate_score: mongoose.Schema.Types.Decimal128,
    rank: Number,
    role: String, // 'Teacher' / 'Student'
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomModel'
    }
});

module.exports = mongoose.model('UserJoinClassroomModel', userSchema);