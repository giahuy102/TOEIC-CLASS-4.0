const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    number_student: Number,
    level: Number,
    start_date: Date,
    end_date: Date
});

module.exports = mongoose.model('Classroom', userSchema);