const express = require('express');
const adminAuthRouter = express.Router();

const { adminToken, authAdmin, registerAdmin,logoutAdmin } = require('../controllers/admin/adminAuthController');
const validateLoginDto = require('../services/dto/validateLogin');

adminAuthRouter.post('/login',adminToken);
adminAuthRouter.get('/auth',authAdmin);
adminAuthRouter.post('/logout',logoutAdmin)
adminAuthRouter.post('/register',validateLoginDto,registerAdmin);

module.exports = adminAuthRouter;