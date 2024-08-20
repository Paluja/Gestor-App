const express = require('express');
const userRouter = express.Router();

const { userToken, authUser, registerUser } = require('../controllers/users/userAuthController');
const { getAllUsers } = require('../controllers/users/userController');
const validateLoginDto = require('../services/dto/validateLogin');

userRouter.post('/login',userToken);
userRouter.get('/auth',authUser);
userRouter.post('/register',registerUser);
userRouter.get('/all',getAllUsers);

module.exports = userRouter;