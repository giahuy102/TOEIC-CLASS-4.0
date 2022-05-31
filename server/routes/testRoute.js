const express = require('express');
const router = express.Router();
const fs = require("fs");

const TestModel = require('../model/TestModel');
const UserModel = require('../model/UserModel');

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
    
    // console.log(req.files[0])
    formData = await req.body;
    let examJSON = await JSON.parse(formData.new_exam);


    for (let i = 0; i < req.files.length; i++) {

        // examJSON.audio.remotePath = req.files[i].path;
        // examJSON.audio.localPath = '';


        if (req.files[i].mimetype.split('/')[0] != 'image') {
            examJSON.audio.remotePath = req.files[i].path;
            examJSON.audio.localPath = '';
        }
        else {
            let s = req.files[i].originalname.split('.')[0].split('_');

            

            const sectionIdx = parseInt(s[s.length - 2]);
            const imgIdx = parseInt(s[s.length - 1]);
            // var img = fs.readFileSync(req.files[i].path);

            // console.log(img)

            // var encode_img = img.toString('base64');
            // console.log(encode_img);


            // examJSON.sections[sectionIdx].images[imgIdx].base64 = {
            //     data: Buffer.from(encode_img, 'base64'),
            //     contentType: examJSON.sections[sectionIdx].images[imgIdx].type
            // }
            // examJSON.sections[sectionIdx].images[imgIdx].base64 = img;

            // console.log(examJSON.sections[sectionIdx].images[imgIdx].base64)

            examJSON.sections[sectionIdx].images[imgIdx].remotePath = req.files[i].path;
            examJSON.sections[sectionIdx].images[imgIdx].localPath = '';


        }
    }
    const newTestModel = new TestModel(examJSON);

    
    
    try {
        const saveExam = await newTestModel.save();
        res.status(201).send('Success');
        
    } catch (err) {
        console.log(err)
        res.status(409).send(err);
    }
})

router.get('/get_all_test', async function(req, res) {
    try {
        TestModel.find({}).exec(function(err, result) {
            res.status(200).send(result);
        });
        // console.log(allTest)
        
        
    }
    catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
    

})

router.post('/:test_id/delete', async function(req, res) {
    

    const { test_id } = req.params;
    try {
        await TestModel.deleteOne({_id: test_id});
        // console.log(99999)
        res.status(200).send('Success');
    }
    catch(err) {
        console.log(err)
        res.status(409).send(err);
    }
    

})

let clearId = examJSON => {
    delete examJSON._id;
    if (examJSON.audio && '_id' in examJSON.audio) delete examJSON.audio._id;
    if ('sections' in examJSON) {
        for (let section of examJSON.sections) {
            if ('_id' in section) delete section._id;
            if ('images' in section) {
                for (let image of section.images) {
                    if ('_id' in image) delete image._id;
                }
            }
            if ('questions' in section) {
                for (let question of section.questions) {
                    if ('_id' in question) delete question._id;
                    if ('answers' in question) {
                        for (answer of question.answers) {
                            delete answer._id;
                        }
                    }
                }
            }
        }
    }

    
}

router.post('/:test_id/update', upload.any(), async function(req, res) {
    

    const { test_id } = req.params;
    // console.log(req.files[0])
    formData = await req.body;
    let examJSON = await JSON.parse(formData.new_exam);
    
    clearId(examJSON);

    // console.log(examJSON)
    // console.log(test_id)


    for (let i = 0; i < req.files.length; i++) {

        // examJSON.audio.remotePath = req.files[i].path;
        // examJSON.audio.localPath = '';


        if (req.files[i].mimetype.split('/')[0] != 'image') {
            examJSON.audio.remotePath = req.files[i].path;
            examJSON.audio.localPath = '';
        }
        else {
            let s = req.files[i].originalname.split('.')[0].split('_');

            

            const sectionIdx = parseInt(s[s.length - 2]);
            const imgIdx = parseInt(s[s.length - 1]);
            // var img = fs.readFileSync(req.files[i].path);

            // console.log(img)

            // var encode_img = img.toString('base64');
            // console.log(encode_img);


            // examJSON.sections[sectionIdx].images[imgIdx].base64 = {
            //     data: Buffer.from(encode_img, 'base64'),
            //     contentType: examJSON.sections[sectionIdx].images[imgIdx].type
            // }

            // console.log(examJSON.sections[sectionIdx].images[imgIdx].base64)

            examJSON.sections[sectionIdx].images[imgIdx].remotePath = req.files[i].path;
            examJSON.sections[sectionIdx].images[imgIdx].localPath = '';


        }
    }
    // const newTestModel = new TestModel(examJSON);

    
    
    try {
        // const saveExam = await newTestModel.save();
        let t = await TestModel.findOneAndUpdate({_id: test_id}, examJSON, {
            new: true
        })


        res.status(201).send('Success');
        
    } catch (err) {
        console.log(err)
        res.status(409).send(err);
    }
    

})

router.post('/createFakeTestModelData', async function (req, res) {
    const requestBody = req.body;
    const newFakeTestData = {
        "is_used": false,
        "type": 1,
        "audio_path": "",
        "sections": [
            {
                "key": 0,
                "section_questions": "I. Sections I Reading Pargraph Blah Blah",
                "image_path": "",
                "questions": [
                    {
                        "key": 0,
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
                        "key": 1,
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
                "key": 1,
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