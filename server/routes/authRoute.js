const express = require('express');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../services/auth/validationService');
const UserModel = require('../model/UserModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const { username } = require('../services/mqtt/config');

router.post('/register', async (req, res) => {
    //validate before saving to database
    const { error } = registerValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const emailExist = await UserModel.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);

    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.password = await bcrypt.hash(user.password, salt);

    try {
        const savedUser = await user.save();
        // const token = jwt.sign(
        //     { user_id: user._id,  },
        //     process.env.SECRET_TOKEN,
        //     {
        //         expiresIn: "2h",
        //     }
        // );

        // res.status(201).header('auth-token', token).send(token);
        res.status(201).send("Register successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //validate before saving to database
    const { error } = loginValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).send('UserModel does not exist');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    const email = user.email;
    if (validPassword) {
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.SECRET_TOKEN,
        );

        res.status(200).json({
            username: user.username,
            email: user.email,
            accessToken: token
        });
    }
    else {
        res.status(400).send('Invalid password');
    }
});


const auth = require('../middleware/verifyToken');
router.post('/get_user', auth, async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user.user_id });
        if (!user) {
            res.status(404).send('User Not Found');
        } else {
            res.status(201).send(user.username);
        }
    } catch (err) {
        res.status(404).send(`Mongoose query error: ${err}`);
    }
});

module.exports = router;