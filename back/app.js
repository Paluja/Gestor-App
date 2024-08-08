const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const adminAuthRouter = require('./router/adminAuthRouter');


const PORT = process.env.PORT
const app = express()
dotenv.config();

app.use(logger('dev'))
app.use(express.json())
app.use(logger('dev'));
app.use(cookieParser());


app.use('/admin', adminAuthRouter);


app.listen(PORT, () =>
    console.log(`Server in port ${PORT}`)
);