const mongoose = require('mongoose');
const Schema = mongoose;

const userSchema = new mongoose.Schema({
    classname: String,
    number_student: Number,
    level: Number,
    start_date: Date,
    end_date: Date,
    password: String,
});

module.exports = mongoose.model('ClassroomModel', userSchema);  