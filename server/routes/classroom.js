const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../model/User');
const Classroom = require('../model/Classroom');
const Join = require('../model/Join');

// new_user_id = mongoose.Types.ObjectId('628336acf0f1ccfe7c1048b1');
// new_classroom_id = mongoose.Types.ObjectId('62833c14aa2821eadb979cd9');


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

router.get('/:class_id/get_basic_info_all_member', async function(req, res) {
    const classId = req.params.class_id;
    try {
        await Join
        .find({classroom: classId})
        .populate('user')
        .exec(function(err, docs) {
            if (err) console.log(err);
            else{
                res.status(200).json(docs)
            } 
        });
    }
    catch(err) {
        res.status(404).send(err);
    }

    
});


module.exports = router;