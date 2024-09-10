// app.js
const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const http = require('http');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { initSocket } = require('./socket');  // Importa el inicializador de socket

dotenv.config();

const app = express();
const server = http.createServer(app);

initSocket(server);  // Inicializa el socket después de crear el servidor

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

const adminAuthRouter = require('./router/adminRouter');
const userAuthRouter = require('./router/userRouter');
const userTasksRouter = require('./router/tasks/userTasksRouter');
const userAwardsRouter = require('./router/awardsRouter');

app.use('/admin', adminAuthRouter);
app.use('/user', userAuthRouter);
app.use('/tasks', userTasksRouter);
app.use('/awards', userAwardsRouter);

server.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));
