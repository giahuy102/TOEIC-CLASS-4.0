const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    fullname: String,
    birthdate: Date,
    created_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('UserModel', userSchema);