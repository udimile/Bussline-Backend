const express = require('express');
const loginRouter = express.Router();

const login = require('../controller/loginController');
const verifyLogin = require('../middlewares/loginMiddleware');
const loginSchema = require('../validations/loginSchema');

loginRouter.post('/', verifyLogin(loginSchema), login)

module.exports = loginRouter;