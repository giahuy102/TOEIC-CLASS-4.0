const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    average_score: Number,
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