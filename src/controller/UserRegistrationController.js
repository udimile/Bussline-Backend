const knex = require('../connection/connection')
const bcrypt = require('bcrypt')

const createStudent = async (req, res) => {
    const {name, email, password, cpf, studentId, school} = req.body

    try {

        const existingUser = await knex('users').where({email: email});


        if (existingUser.length > 0) {
            return res.status(409).json({message: "Email já existe!"})
        }

        const passwordBcrypt = await bcrypt.hash(password, 10)

        let newStudent;
        let newUser;


        await knex.transaction(async trx => {
            newUser = await trx('users').insert({
                name,
                email,
                password: passwordBcrypt,
                type: 'student',
            }).returning(['id', 'name', 'email', 'type' ]);

            const userId = newUser[0].id;

            newStudent = await trx('students').insert({
                user_id: userId,
                cpf,
                ra: studentId,
                school,
            }).returning(['*']);


        })

        return res.status(201).json({
            usuario: newUser[0],
            estudante: newStudent[0]
        })

    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor. Tente novamente mais tarde."})
    }
}

const createGuardian = async (req, res) => {
    const {name, email, password, cpf} = req.body

    try {


        const existingUser = await knex('users').where({email: email});

        if (existingUser.length > 0) {
            return res.status(409).json({message: "Email já existe!"})
        }

        const passwordBcrypt = await bcrypt.hash(password, 10)

        let newGuardian;
        let newUser;

       

        await knex.transaction(async trx => {
            newUser = await trx('users').insert({
                name,
                email,
                password: passwordBcrypt,
                type: 'guardian',
            }).returning(['id','name', 'email']);

            const userId = newUser[0].id;

            newGuardian = await trx('guardians').insert({
                user_id: userId,
                cpf,
            }).returning(['*']);
        })
        
        return res.status(201).json({
            usuario: newUser[0],
            responsavel: newGuardian[0]
        })

    } catch (error) {
       
        return res.status(500).json({message: "Erro interno do servidor. Tente novamente mais tarde."})
    }
}

module.exports = {createGuardian, createStudent}