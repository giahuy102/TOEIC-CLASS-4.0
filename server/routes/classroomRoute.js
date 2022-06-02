const express = require('express');
const cron = require('node-cron');
const router = express.Router();

const ClassroomModel = require('../model/ClassroomModel');
const UserJoinClassroomModel = require('../model/UserJoinClassroomModel');

const checkAndUpdateAllClassroomsStatus = () => {
    cron.schedule("* * * * * *", async function () {
        var currentDate = new Date();
        const AllClassroomsModel = await ClassroomModel.find({});
        for (const ClassroomModelItem of AllClassroomsModel) {
            if (ClassroomModelItem.start_date > currentDate) {
                if (ClassroomModelItem.status !== 1) {
                    console.log(`Status of challenge ${ClassroomModelItem.challenge_id} change to upcoming`)
                }
                ClassroomModelItem.status = 1
            }

            else if (ClassroomModelItem.start_date < currentDate && ClassroomModelItem.end_date > currentDate) {
                if (ClassroomModelItem.status !== 0) {
                    console.log(`Status of challenge ${ClassroomModelItem.challenge_id} change to ongoing`)
                }
                ClassroomModelItem.status = 0
            }

            else if (ClassroomModelItem.end_date < currentDate) {
                if (ClassroomModelItem.status !== 2) {
                    console.log(`Status of challenge ${ClassroomModelItem.challenge_id} change to ended`)
                }
                ClassroomModelItem.status = 2
            }
            ClassroomModelItem.save();
        }
    })
}
checkAndUpdateAllClassroomsStatus();

const tokenValidation = require('../middleware/verifyToken');
router.post('/create', tokenValidation, async function (req, res) {
    const requestBody = req.body;
    const { classroomName, number_student, toeicLevel, startDateValue, endDateValue, classroomPassword } = requestBody;

    const status_check = 0;
    var currentDate = new Date()
    if (startDateValue > endDateValue) {
        res.status(400).send({ message: 'Invalid end date and start date' })
    }
    if (startDateValue > currentDate) {
        status_check = 1
    }
    else if (startDateValue < currentDate && endDateValue > currentDate) {
        status_check = 0
    }
    else if (endDateValue < currentDate) {
        status_check = 2
    }

    const newClassroomModel = new ClassroomModel({
        classname: classroomName,
        number_student: number_student,
        level: toeicLevel,
        start_date: startDateValue,
        end_date: endDateValue,
        password: classroomPassword,
        status: status_check,
        number_of_completed_challenge: 0,
    });

    try {
        await newClassroomModel.save();
        const newUserJoinClassroomModel = new UserJoinClassroomModel({
            average_score: 0.0,
            role: 'Teacher',
            user: req.user.user_id,
            classroom: newClassroomModel._id,
            number_of_test_done: 0,
        })

        try {
            newUserJoinClassroomModel.save();
        } catch (err) {
            console.log('create UserJoinClassroomModel error', err);
        }

        // const responseData = { _id: newClassroomModel._id, classroomName, number_student, toeicLevel, startDateValue, endDateValue, classroomPassword }
        responsePayload = { data: newClassroomModel, message: 'Create Classroom Successfully' }
        res.status(201).send(responsePayload);
    } catch (err) {
        console.log('Create new Classroom err', err);
        res.status(400).send(err);
    }
})

router.post('/join', tokenValidation, async function (req, res) {
    const userId = req.user.user_id;
    const { password, classId } = req.body;
    let requestedClassroom = await ClassroomModel.findOne({ _id: classId });
    if (password === requestedClassroom['password']) {
        const newJoin = new UserJoinClassroomModel({
            average_score: 0.0,
            role: 'Student',
            user: userId,
            classroom: classId,
            number_of_test_done: 0,
        })
        try {
            newJoin.save();
            console.log('/classroom/join save newJoin success');
            res.status(200).send(JSON.stringify({ _id: classId }));
        } catch (err) {
            res.status(400).send(err)
            console.log("Processing new join request error", err);
        }
    } else {
        res.status(401).send({ message: "Invalid Classroom Password" })
    }
})

router.post('/all', tokenValidation, async function (req, res) {
    let AllClassrooms = await ClassroomModel.find({});
    AllClassrooms = JSON.parse(JSON.stringify(AllClassrooms));
    let responseBody = [];
    const userId = req.user.user_id;
    for (let ClassroomInfo of AllClassrooms) {
        const { _id: classroomId } = ClassroomInfo;
        // console.log(`userId: ${userId}, classroomId: ${classroomId}`);
        try {
            const findUserJoinClassroomModel = await UserJoinClassroomModel.find({ classroom: classroomId, user: userId })
            // console.log('/api/classroom/all', findUserJoinClassroomModel);
            responseBody.push({ ...ClassroomInfo, isJoined: findUserJoinClassroomModel.length !== 0 })
        } catch (err) {
            console.log('find UserJoinClassroomModel error', err);
        }
    }
    res.status(201).send(JSON.stringify(responseBody));
})

router.get('/:class_id/get_basic_info_all_member', async function (req, res) {
    const classId = req.params.class_id;
    try {
        await UserJoinClassroomModel
            .find({ classroom: classId })
            .populate('user')
            .populate('classroom')
            .exec(function (err, queryResultList) {
                /**
                 * queryResultList is currently a mongoose model instance returned from a mongoose query which is not mutable.
                 */

                queryResultList = JSON.parse(JSON.stringify(queryResultList));
                if (err) console.log(err);
                else {
                    const responseData = { classroom: queryResultList[0]["classroom"], students_list: [] };
                    for (const UserJoinClassroomModelItem of queryResultList) {
                        let newUser = UserJoinClassroomModelItem["user"];
                        newUser['role'] = UserJoinClassroomModelItem["role"];
                        newUser['average_score'] = UserJoinClassroomModelItem["average_score"];
                        responseData.students_list.push(newUser)
                    }
                    res.status(200).json(responseData);
                }
            });
    }
    catch (err) {
        res.status(404).send(err);
    }
});


module.exports = router;