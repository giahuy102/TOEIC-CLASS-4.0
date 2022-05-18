const mongoose = require('mongoose');
const Schema = mongoose;

const userSchema = new mongoose.Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    classname: {
        type: String
    },
    number_student: Number,
    level: Number,
    start_date: Date,
    end_date: Date
});

module.exports = mongoose.model('Classroom', userSchema);  