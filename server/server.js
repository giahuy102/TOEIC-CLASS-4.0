const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConnection = require('./services/database/connection')

dotenv.config();//load config from .env to process.env

const cors = require('cors') //cross origin
app.use(cors())

// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
//     console.log("Connect DB successfully")
// );

// let client1 = require('./services/mqtt/subcriber');


dbConnection.connect();

app.use(express.json());

const authRoute = require('./routes/auth');
const classroomRoute = require('./routes/classroom');


app.use('/api/classroom', classroomRoute);
app.use('/api/user', authRoute);



// const auth = require('./middleware/verifyToken');

// const verifyToken = require('./middleware/verifyToken');
// app.get('/', verifyToken, (req, res) => {
//     res.send('success');
// });


// const subcriber = require('./services/mqtt/subcriber');
// let client = subcriber.subcribe();

// client.then(e => {
//     console.log(e);
// })


app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`));