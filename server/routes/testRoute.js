const express = require("express");
const router = express.Router();

const TestModel = require('../model/TestModel');

router.post('/createFakeTestModelData', async function (req, res) {
    const requestBody = req.body;
    const newFakeTestData = {
        "is_used": false,
        "type": 1,
        "audio_path": "",
        "sections": [
            {
                "section_questions": "I. Sections I Reading Pargraph Blah Blah",
                "image_path": "",
                "questions": [
                    {
                        "question": "1. Question 1 Choose A",
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
                        "question": "2. Question 2 Choose B",
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
                "section_questions": "II. Sections II Reading Pargraph Blah Blah",
                "image_path": "",
                "questions": [
                    {
                        "question": "1. Question 1 Choose A",
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
                        "question": "2. Question 2 Choose B",
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