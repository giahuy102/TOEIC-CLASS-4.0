const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accumulate_score: mongoose.Schema.Types.Decimal128,
    rank: Number,
    role: String, // 'Teacher' / 'Student'
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }
});

module.exports = mongoose.model('Join', userSchema);