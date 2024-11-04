const express = require('express');
const loginRouter = express.Router();

const login = require('../controller/loginController');
const validate = require('../middlewares/requestMiddleware');
const loginSchema = require('../validations/loginSchema');

loginRouter.post('/', validate(loginSchema), login)

module.exports = loginRouter;