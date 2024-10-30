const joi = require('joi');

const userRegistrationStudentSchema = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
    }),
    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ser um email válido!',
        'any.required': 'O campo email é obrigatório!',
        'string.empty': 'O campo email é obrigatório!',
    }),
    password: joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigatório!',
        'string.empty': 'O campo senha é obrigatório!',
        'string.min': 'A senha precisa ter no mínimo 5 caracteres.'
    }),
    cpf: joi.string().pattern(new RegExp('^(\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}|\\d{11})$')).required().messages({
        'any.required': 'O campo cpf é obrigatório!',
        'string.empty': 'O campo cpf é obrigatório!',
        'string.pattern': 'O campo cpf deve conter um cpf válido!'
    }),
    studentId: joi.string().required().messages({
        'any.required': 'O campo RA é obrigatório.',
        'string.empty': 'O campo RA é obrigatório.',
    }),
})

const userRegistrationGuardianSchema = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
    }),
    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ser um email válido!',
        'any.required': 'O campo email é obrigatório!',
        'string.empty': 'O campo email é obrigatório!',
    }),
    password: joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigatório!',
        'string.empty': 'O campo senha é obrigatório!',
        'string.min': 'A senha precisa ter no mínimo 5 caracteres.'
    }),
    cpf: joi.string().pattern(new RegExp('^(\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}|\\d{11})$')).required().messages({
        'any.required': 'O campo cpf é obrigatório!',
        'string.empty': 'O campo cpf é obrigatório!',
        'string.pattern': 'O campo cpf deve conter um cpf válido!'
    }),
})

module.exports = {userRegistrationGuardianSchema, userRegistrationStudentSchema}
