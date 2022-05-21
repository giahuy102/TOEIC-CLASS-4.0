const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cron = require('node-cron');
const dbConnection = require('./services/database/dbInitConnectionService')

dotenv.config();

const cors = require('cors')
app.use(cors())

dbConnection.connect();

app.use(express.json());

const authRoute = require('./routes/authRoute');
const classroomRoute = require('./routes/classroomRoute');
const challengeRoute = require('./routes/challengeRoute')

app.use('/api/classroom', classroomRoute);
app.use('/api/user', authRoute);
app.use('/api/challenge', challengeRoute)

/*
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | month
    | | | day of month
    | | hour
    | minute
    second ( optional )
*/

cron.schedule('* * * * * *', function () {
    console.log('running a task every second');
});



app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`));