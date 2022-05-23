const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChallengeModel'
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomModel'
    },
    score: mongoose.Schema.Types.Decimal128,
    status: Number, //0: Not done, 1: Done
    examState: [
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

module.exports = mongoose.model('ChallengeParticipationModel', userSchema);