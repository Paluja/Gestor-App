const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const adminAuthRouter = require('./router/adminRouter');
const userAuthRouter = require('./router/userRouter');
const userTasksRouter = require('./router/tasks/userTasksRouter');
const userAwardsRouter = require('./router/awardsRouter');

const PORT = process.env.PORT
const app = express()
dotenv.config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(logger('dev'))
app.use(express.json())
app.use(logger('dev'));
app.use(cookieParser());


app.use('/admin', adminAuthRouter);
app.use('/user', userAuthRouter);
app.use('/tasks', userTasksRouter);
app.use('/awards', userAwardsRouter);


app.listen(PORT, () =>
    console.log(`Server in port ${PORT}`)
);