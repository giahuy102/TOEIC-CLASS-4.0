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
            section_question: String,
            questions: [
                {
                    question: String,
                    questionState: String, // "Not answered", "Wrong Answer", "Corrected Answer"
                }
            ]
        }
    ]
});

module.exports = mongoose.model('ChallengeParticipationModel', userSchema);