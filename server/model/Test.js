const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    is_used: Boolean,
    type: Number, //0: Listening, 1: Reading
    audio_path: String,
    sections: [
        {
            section_question: String,
            image_path: String,
            questions: [
                {
                    question: String,
                    answers: [
                        {
                            answer: String,
                            is_correct: Boolean
                        }
                    ]
                }
            ]
        }

    ]
});

module.exports = mongoose.model('Test', userSchema);