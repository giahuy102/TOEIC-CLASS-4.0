const mongoose = require('mongoose');
const Schema = mongoose;

const userSchema = new mongoose.Schema({
    classname: String,
    number_student: Number,
    level: Number,
    start_date: Date,
    end_date: Date,
    status: Number, //0: upcoming, 1: ongoing, 2: finish
});

module.exports = mongoose.model('Classroom', userSchema);  