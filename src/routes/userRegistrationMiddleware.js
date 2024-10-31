const express = require('express');
const registrationRouter = express.Router();

const {createStudent, createGuardian} = require('../controller/UserRegistrationController')
const validate = require('../middlewares/requestMiddleware');
const {userRegistrationStudentSchema, userRegistrationGuardianSchema} = require('../validations/userRegistrationSchema');

registrationRouter.post('/student', validate(userRegistrationStudentSchema), createStudent);
registrationRouter.post('/guardian', validate(userRegistrationGuardianSchema), createGuardian);

module.exports = registrationRouter;

