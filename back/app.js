const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const adminAuthRouter = require('./router/adminAuthRouter');
const userAuthRouter = require('./router/userAuthRouter');
const userTasksRouter = require('./router/tasks/userTasksRouter');

const PORT = process.env.PORT
const app = express()
dotenv.config();

app.use(cors());
app.use(logger('dev'))
app.use(express.json())
app.use(logger('dev'));
app.use(cookieParser());


app.use('/admin', adminAuthRouter);
app.use('/user', userAuthRouter);
app.use('/tasks', userTasksRouter);


app.listen(PORT, () =>
    console.log(`Server in port ${PORT}`)
);