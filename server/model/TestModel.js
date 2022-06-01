const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    classroom_id: {
        $type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomModel',
    },
    type: String, //Reading or Listening
    audio: new mongoose.Schema({
        name: String,
        type: String,
        localPath: String,
        remotePath: String,
    }),
    title: String,
    duration: Number,
    score: Number,
    sections: [
        {
            key: Number, //0, 1, 2, 3, 4, 5,...
            section_question: String,
            images: [{
                key: Number,
                // type: String,
                localPath: String,
                remotePath: String,

                // base64: Buffer,
                type: String
            }],
            questions: [
                {
                    key: Number,
                    question: String,
                    answerState: {
                        $type: String,
                        default: 'NG'
                    }, //'NG','WA','AC'
                    chosenAnswer: {
                        $type: String,
                        default: ''
                    },
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
    ],

}, { typeKey: '$type' });

module.exports = mongoose.model('TestModel', userSchema);
