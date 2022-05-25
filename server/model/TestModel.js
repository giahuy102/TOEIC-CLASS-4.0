const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    type: String, //Reading or Listening
    audio_path: String,
    title: String,
    duration: Number,
    score: Number,
    sections: [
        {
            key: Number, //0, 1, 2, 3, 4, 5,...
            section_question: String,
            images: [{
                key: Number,
                path: Buffer
            }],
            questions: [
                {
                    key: Number,
                    question: String,
                    answerState: String, //'NG','WA','AC'
                    chosenAnswer: String,
                    answers: [
                        {
                            key: Number,
                            answer: String,
                            is_correct: Boolean
                        }
                    ]
                }
            ]
        }
    ]
});

module.exports = mongoose.model('TestModel', userSchema);