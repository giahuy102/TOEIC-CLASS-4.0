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

/**
 *      Socket IO 
 */
const expressHttpServer = require("http").createServer(app);
const io = require("socket.io")(expressHttpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
exports.io = io;

const { socketIOConfig, checkAndUpdateAllChallengeStatus } = require("./services/socket/socketIOConfig");
socketIOConfig(io);
checkAndUpdateAllChallengeStatus(io);

/**
 * Export Io Server to use all over the project for methods not having access to req, res object
 */

/**
 * io Server availabele from now on
 */

app.use((req, res, next) => {
    req.io = io;
    next();
})

/**
 *      Express Router & Controller
 */

const authRoute = require('./routes/authRoute');
const classroomRoute = require('./routes/classroomRoute');
const challengeRoute = require('./routes/challengeRoute');
const testRoute = require('./routes/testRoute');
const examRoute = require('./routes/examRoute');

app.use('/api/classroom', classroomRoute);
app.use('/api/user', authRoute);
app.use('/api/challenge', challengeRoute);
app.use('/api/test', testRoute);
app.use('/api/exam', examRoute);

/*
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | month
    | | | day of month
    | | hour
    | minute
    second ( optional )
    cron.schedule('* * * * * *', function () {
        console.log('running a task every second');
    });
*/

expressHttpServer.listen(process.env.PORT, () => console.log(`Http Server is running at http://localhost:${process.env.PORT}`));