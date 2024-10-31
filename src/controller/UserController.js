const bcrypt = require('bcryptjs');
const knex = require('../connection/connection')

const {updateUserData, userByEmail} = require('../middlewares/UserMiddleware');

const updateUser = async (req, res) => {
    const {name, email, password} = req.body;
    const {id} = req.user;

    try {
        if (email !== req.user.email) {
            const user = await userByEmail(email);
            if (user) {
                return res.status().json({message: "O email informado já existe!"})
            }
        }

        const updatedUser = await updateUserData(
            name,
            email,
            password,
            id
        );

        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor. Tente novamente mais tarde."})
    }

}

const getUserData = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {updateUser, getUserData}
