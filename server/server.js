const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnection = require('./services/database/dbInitConnectionService')

dotenv.config();

const cors = require('cors')
app.use(cors())

dbConnection.connect();

app.use(express.json());

const authRoute = require('./routes/authRoute');
const classroomRoute = require('./routes/classroomRoute');


app.use('/api/classroom', classroomRoute);
app.use('/api/user', authRoute);


app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`));