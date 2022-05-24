const express = require('express');
const router = express.Router();

const UserModel = require("../model/UserModel");

router.put('/update_account', async (req, res) => {
    // console.log("req body: ", req.body)
    const newUsername = req.body['newUsername']
    const newEmail = req.body['newEmail']
    const oldEmail = req.body['oldEmail']

    let foundUser = await UserModel.findOne({ email: oldEmail })

    if (newEmail != oldEmail) {
        let emailExist = await UserModel.findOne({ email: newEmail })
        if (emailExist) {
            return res.status(404).send("Email exists")
        }
        foundUser['email'] = newEmail
        foundUser['username'] = newUsername
    }

    try {
        await foundUser.save()
        res.status(200).send(foundUser)
    }
    catch (err) {
        res.status(404).send("Error when updating account")
    }

});

router.put('/change_info', async (req, res) => {
    // console.log("req body: ", req.body)
    const newFullName = req.body['newFullName']
    const newBirthDate = req.body['newBirthDate']
    const email = req.body['email']

    let foundUser = await UserModel.findOne({ email: email })

    console.log("test: ", foundUser['fullname'])
    console.log("test: ", foundUser['birthdate'])

    foundUser['fullname'] = newFullName
    foundUser['birthdate'] = newBirthDate

    try {
        await foundUser.save()
        res.status(200).send(foundUser)
    }
    catch (err) {
        res.status(404).send("Error when change info")
    }
});

module.exports = router;