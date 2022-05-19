const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    status: Number, //0: upcoming, 1: ongoing, 2: finish
    start: Date,
    end: Date,
    created_at: Date,
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestModel'
    }

});

module.exports = mongoose.model('ChallengeModel', userSchema);