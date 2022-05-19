const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const UserModel = require('../model/UserModel');
const ClassroomModel = require('../model/ClassroomModel');
const UserJoinClassroomModel = require('../model/UserJoinClassroomModel');


// const newJoin = new Join({
//     accumulate_score: 5.4,
//     rank: 12,
//     role: "Leader",
//     user: new_user_id,
//     classroom: new_classroom_id
// });

// newJoin.save(function(err, result){
//     if (err){
//         console.log(err);
//     }
//     else{
//         // console.log(result)
//     }
// })

// Join
//     .findOne({ rank: 12 })
//     .populate('user')
//     .exec(function(err, join) {
//         if (err) console.log(err);
//         else console.log(join.user);
//     })

const tokenValidation = require('../middleware/verifyToken');
const { response } = require('express');
router.post('/create', tokenValidation, async function (req, res) {
    const requestBody = req.body;
    // console.log("Create classroom request body", requestBody);
    // console.log("Request user decoded from token", req.user);
    const { classroomName, number_student, toeicLevel, startDateValue, endDateValue, classroomPassword } = requestBody;
    const newClassroomModel = new ClassroomModel({
        classname: classroomName,
        number_student: number_student,
        level: toeicLevel,
        start_date: startDateValue,
        end_date: endDateValue,
        password: classroomPassword,
    });

    try {
        await newClassroomModel.save();
        const newUserJoinClassroomModel = new UserJoinClassroomModel({
            accumulate_score: 0.0,
            rank: 0,
            role: 'Teacher',
            user: req.user.user_id,
            classroom: newClassroomModel._id,
        })

        try {
            newUserJoinClassroomModel.save();
        } catch (err) {
            console.log('create UserJoinClassroomModel error', err);
        }

        const responseData = { _id: newClassroomModel._id, classroomName, number_student, toeicLevel, startDateValue, endDateValue, classroomPassword }
        responsePayload = { data: responseData, message: 'Create Classroom Successfully' }
        res.status(201).send(responsePayload);
    } catch (err) {
        console.log('Create new Classroom err', err);
        res.status(400).send(err);
    }
})

router.get('/all', async function (req, res) {
    const AllClassrooms = await ClassroomModel.find({});
    res.status(201).send(JSON.stringify(AllClassrooms));
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
                        newUser['rank'] = UserJoinClassroomModelItem["rank"];
                        newUser['role'] = UserJoinClassroomModelItem["role"];
                        newUser['accumulate_score'] = UserJoinClassroomModelItem["accumulate_score"];
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