const express = require('express');
const router = express.Router();
const fs = require("fs");

const TestModel = require('../model/TestModel');

var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage: storage });

router.post('/create_test', upload.any(), async function (req, res) {
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
    const newTestModel = new TestModel(examJSON);
    try {
        const saveExam = await newTestModel.save();
        console.log('/api/test/create saveExam', saveExam);
        res.status(200).send(saveExam);
        console.log(saveExam.sections[0].images[0])
    } catch (err) {
        console.log('/api/test/create  const saveExam = await newTestModel.save(); Error', err);
    }
})

module.exports = router;

router.post('/createFakeTestModelData', async function (req, res) {
    const requestBody = req.body;
    const newFakeTestData = {
        "is_used": false,
        "type": 1,
        "audio_path": "",
        "sections": [
            {
                "key": 1,
                "section_questions": "I. Sections I Reading Pargraph Blah Blah",
                "image_path": "",
                "questions": [
                    {
                        "key": 1,
                        "question": "1. Question 1 Choose A",
                        "answerState": 'NG',
                        "chosenAnswer": "",
                        "answers": [
                            {
                                "answer": "AAAA",
                                "is_correct": true,

                            },
                            {
                                "answer": "BBBB",
                                "is_correct": false
                            },
                            {
                                "answer": "CCCC",
                                "is_correct": false
                            },
                            {
                                "answer": "DDDD",
                                "is_correct": false
                            }
                        ]
                    },
                    {
                        "key": 2,
                        "question": "2. Question 2 Choose B",
                        "answerState": 'NG',
                        "chosenAnswer": "",
                        "answers": [
                            {
                                "answer": "AAAA",
                                "is_correct": false
                            },
                            {
                                "answer": "BBBB",
                                "is_correct": true
                            },
                            {
                                "answer": "CCCC",
                                "is_correct": false
                            },
                            {
                                "answer": "DDDD",
                                "is_correct": false
                            }
                        ]
                    }
                ]
            },
            {
                "key": 2,
                "section_questions": "II. Sections II Reading Pargraph Blah Blah",
                "image_path": "",
                "questions": [
                    {
                        "key": 1,
                        "question": "1. Question 1 Choose A",
                        "answerState": 'NG',
                        "chosenAnswer": "",
                        "answers": [
                            {
                                "answer": "AAAA",
                                "is_correct": true
                            },
                            {
                                "answer": "BBBB",
                                "is_correct": false
                            },
                            {
                                "answer": "CCCC",
                                "is_correct": false
                            },
                            {
                                "answer": "DDDD",
                                "is_correct": false
                            }
                        ]
                    },
                    {
                        "key": 2,
                        "question": "2. Question 2 Choose B",
                        "answerState": 'NG',
                        "chosenAnswer": "",
                        "answers": [
                            {
                                "answer": "AAAA",
                                "is_correct": false
                            },
                            {
                                "answer": "BBBB",
                                "is_correct": true
                            },
                            {
                                "answer": "CCCC",
                                "is_correct": false
                            },
                            {
                                "answer": "DDDD",
                                "is_correct": false
                            }
                        ]
                    }
                ]
            }
        ]
    }

    const saveTestModel = new TestModel(newFakeTestData);
    try {
        await saveTestModel.save();
        res.status(200).send(saveTestModel);
    } catch (err) {
        res.status(401).send("Error in create saveTestModel");
    }
})

router.get('/:test_id/detail', async function (req, res) {
    const { test_id } = req.params;
    try {
        const TestModelQuery = await TestModel.findOne({ _id: test_id });
        res.status(200).send(TestModelQuery);
    } catch (err) {
        console.log('/:test_id/detail const TestModelQuery = await TestModel.findOne({ _id: test_id }); Error', err);
        res.status(401).send(err);
    }
})

module.exports = router;