const express = require('express');
const userRouter = express.Router();

const {updateUser, getUserData} = require('../controller/UserController');
const validate = require('../middlewares/userMiddleware');
const userSchema = require('../validations/userSchema');
const verifyLogin = require('../middlewares/loginMiddleware');

userRouter.put('/', validate(userSchema), updateUser);
userRouter.get('/', verifyLogin, getUserData);

module.exports = userRouter;

