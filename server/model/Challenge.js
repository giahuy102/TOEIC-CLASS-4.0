const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    challenge_id: Number,
    status: Number, //0: upcoming, 1: ongoing, 2: finish
    title: String,
    start: Date,
    end: Date,
    created_at: Date,
    created_by: String,
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }

});

module.exports = mongoose.model('Challenge', userSchema);