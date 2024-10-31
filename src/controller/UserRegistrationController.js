const knex = require('../connection/connection')
const bcrypt = require('bcrypt')

const createStudent = async (req, res) => {
    const {name, email, password, cpf, studentId} = req.body

    try {
        const user = await knex('student').where({email: email});

        if (user.length > 0) {
            return res.status(409).json({message: "Email já existe!"})
        }

        const passwordBcrypt = await bcrypt.hash(password, 10)

        const newUser = await knex('student').insert({
            name,
            email,
            password: passwordBcrypt,
            studentId,
            cpf,
        }).returning(['name', 'email', 'password', 'student_id', 'cpf']);

        return res.status(201).json(newUser[0])

    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor. Tente novamente mais tarde."})
    }
}

const createGuardian = async (req, res) => {
    const {name, email, password, cpf} = req.body

    try {
        const user = await knex('guardian').where({email: email});

        if (user.length > 0) {
            return res.status(409).json({message: "Email já existe!"})
        }

        const passwordBcrypt = await bcrypt.hash(password, 10)

        const newUser = await knex('user').insert({
            name,
            email,
            password: passwordBcrypt,
            cpf,
        }).returning(['name', 'email', 'password', 'cpf']);

        return res.status(201).json(newUser[0])

    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor. Tente novamente mais tarde."})
    }
}

module.exports = {createGuardian, createStudent}