const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const userSchema = new mongoose.Schema({
    challenge_id: Number,

    create_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
    },

    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomModel',
    },

    test_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestModel',
    },

    type: String, // "Reading", "Listening"
    status: Number, //0: ongoing, 1: upcoming, 2: finish
    title: String,
    start: Date,
    end: Date,
    created_at: Date,
    created_by: String,
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestModel'
    }

});

module.exports = mongoose.model('ChallengeModel', userSchema);