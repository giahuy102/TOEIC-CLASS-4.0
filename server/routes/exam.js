const express = require('express');
const router = express.Router();
const fs = require("fs");
const mongoose = require('mongoose');

const Exam = require('../model/Test');

var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});




var upload = multer({ storage : storage });

router.post('/create_new_exam', upload.any(), async function(req, res) {
    formData = await req.body;
    let examJSON = await JSON.parse(formData.new_exam);
    for (let i = 0; i < req.files.length; i++) {
        let s = req.files[i].originalname.split('.')[0].split('_');
        const sectionIdx = parseInt(s[1]);
        const imgIdx = parseInt(s[2]);
        var img = fs.readFileSync(req.files[i].path);
        // var encode_img = img.toString('base64');
        examJSON.sections[sectionIdx].images[imgIdx].path = img;
        
    }
    const exam = new Exam(examJSON);
    const saveExam = await exam.save();
    console.log(saveExam.sections[0].images[0])
})

module.exports = router;