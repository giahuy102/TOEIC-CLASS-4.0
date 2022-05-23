const express = require('express');
const router = express.Router();

const UserModel = require("../model/UserModel");


// const auth = require('../middleware/verifyToken');
// router.post('/get_user', auth, async (req, res) => {
//     try {
//         const user = await UserModel.findOne({ _id: req.user.user_id });
//         if (!user) {
//             res.status(404).send('User Not Found');
//         } else {
//             const responseData = JSON.parse(JSON.stringify(user));
//             responseData['password'] = '';
//             responseData['created_at'] = '';
//             res.status(201).send(responseData);
//         }
//     } catch (err) {
//         res.status(404).send(`Mongoose query error: ${err}`);
//     }
// });

/* 
    Loi 404. Kha nang cao loi giong o dong 12 cua file authRoute.js
    handle update, change -> finish
    challenge result not done -> must be done
*/

router.post('/update', async (req, res) => {
    const user = req.body.user;
    console.log("/update -> user: ", user);
    if (req.body.email != req.body.oldEmail) {
        const emailExist = await UserModel.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email already exists');
        user.email = req.body.email;
    }
    user.username = req.body.username;
    try {
        const saved = await user.saved();
        res.status(201).send("Update account successfully");
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/change', async (req, res) => {
    const user = req.body.user;
    console.log("/change -> user: ", user);
    user.fullname = req.body.fullname;
    user.birthday = req.body.birthday;
    try {
        const saved = await user.saved();
        res.status(201).send("Change information successfully");
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;