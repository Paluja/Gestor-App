const express = require('express');
const userAuthRouter = express.Router();

const { userToken, authUser, registerUser } = require('../controllers/users/userAuthController');
const validateLoginDto = require('../services/dto/validateLogin');

userAuthRouter.post('/login',userToken);
userAuthRouter.get('/auth',authUser);
userAuthRouter.post('/register',validateLoginDto,registerUser);

module.exports = userAuthRouter;