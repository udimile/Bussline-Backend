const jwt = require('jsonwebtoken');
const knex = require('../connection/connection');

const hashPassword = process.env.SENHA_JWT;

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Não autorizado!" });
    }

    try {
        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, hashPassword);

        const userExists = await knex('users').where({ id }).first()

        if (!userExists) {
            return res.status(401).json({ message: "Não autorizado!" })
        }

        const { password, ...user } = userExists;

        req.user = user;

        next()
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor." })
    }
}

module.exports = verifyLogin;
