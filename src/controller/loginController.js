const knex = require('../connection/connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const passwordHash = process.env.SENHA_JWT

const login = async (req, res) => {

    const {email, password} = req.body

    try {
        const user = await knex('user').where({email}).first()

        if (!user) {
            return res.status(401).json({message: "Credenciais Inválidas."})
        }

        const correctPass = await bcrypt.compare(password, user.password)

        if (!correctPass) {
            return res.status(401).json({message: "Credenciais Inválidas"})
        }

        const token = jwt.sign({id: user.id}, passwordHash, {expiresIn: '30d'})

        const {senha: _, ...userData} = user

        return res.status(200).json({message: "Login realizado com sucesso!", user: userData, token})

    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor. Tente novamente mais tarde."})
    }
}

module.exports = {login}
