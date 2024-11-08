const express = require('express');
const userRouter = express.Router();

const {updateUser, getUserData, getStudentByStudentId, getAllStudentOfGuardian, userByCpfOrStudentId} = require('../controller/userController');
const validate = require('../middlewares/requestMiddleware');
const userSchema = require('../validations/userSchema');

userRouter.put('/users', validate(userSchema), updateUser);
userRouter.get('/userData', getUserData);
userRouter.get('/students/:ra', getStudentByStudentId)
userRouter.get('/guardians/:guardianId/students', getAllStudentOfGuardian)
userRouter.get('/users', userByCpfOrStudentId)

module.exports = userRouter;

