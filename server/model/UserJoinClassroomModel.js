const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    average_score: Number,
    role: String, // 'Teacher' / 'Student',
    number_of_test_done: Number,
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