const knex = require('../connection/connection');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const studentByStudentId = async (studentId) => {
    const student = await knex('students').where({ ra: studentId });

    return student;
}

const studentByGuardianId = async (guardianId) => {

    const students = await knex('students')
        .join('users', 'students.user.id', '=', 'users.id')
        .select('students.id', 'users.name', 'students.cpf', 'students.ra', 'students.school', 'students.address')
        .where('student.guardian_id', guardianId)

    return students

}

const getAllStudent = async () => {
    const student = await knex('students').select('*');
    return student;
}

const guardianByCpf = async (cpf) => {
    return await knex('users')
        .join('users', 'guardians.user_id', '=', 'users.id')
        .select('users.id', 'users.name', 'users.email', 'users.type', 'guardians.cpf')
        .where('guardians.cpf', cpf)
        .first();
}

const studentByCpf = async (cpf) => {
    return knex('students')
        .join('users', 'students.user_id', '=', 'users.id')
        .select('users.id', 'users.name', 'users.email', 'users.type', 'students.cpf', 'students.ra', 'students.school', 'students.address', 'students.guardian_id')
        .where('students.cpf', cpf)
        .first();
}

const userById = async (id) => {
    const user = await knex('users').where({ id }).first();

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (user.type === 'guardian') {
        const guardian = await knex('guardians')
            .select('id', 'cpf')
            .where('user_id', user.id)
            .first();
        user.guardianInfo = guardian;
    } else if (user.type === 'student') {
        const student = await knex('students')
            .select('id', 'cpf', 'ra', 'school', 'address', 'guardian_id')
            .where('user_id', user.id)
            .first();
        user.studentInfo = student;
    }

    res.json(user)


}

const userByEmail = async (email) => {
    return await knex('users').where({ email }).first()
}

const encryptUserPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const verifyPassword = async (email, password) => {
    const user = await userByEmail(email);
    return await bcrypt.compare(password, user.password);
}

const getLoggedUserData = async (id) => {
    const user = await userById(id);

    return user
}

const updateUserData = async (is, updateData) => {

    const { name, email, password, type, ...specificData } = updateData;

    const encryptedPassword = await encryptUserPassword(password);

    const userUpdateData = { name, email, password: encryptedPassword, type };

    if (email !== req.user.email) {
        const user = await userByEmail(email);
        if (user) {
            return res.status().json({ message: "O email informado já existe!" })
        }
    }

    await knex('users').where({ id: userId }).update(userUpdateData);

    if (type === 'guardian') {
      if (specificData.cpf) {
        await knex('guardians').where({ user_id: userId }).update({ cpf: specificData.cpf });
      }
    } else if (type === 'student') {
      const studentUpdateData = {
        cpf: specificData.cpf,
        ra: specificData.ra,
        school: specificData.school,
        address: specificData.address,
        guardian_id: specificData.guardian_id
      };
      await knex('students').where({ user_id: userId }).update(studentUpdateData);
    }

    return userById(id)

}

module.exports = {
    verifyPassword,
    updateUserData,
    getLoggedUserData,
    guardianByCpf,
    userById,
    userByEmail,
    encryptUserPassword,
    studentByStudentId,
    getAllStudent,
    studentByGuardianId,
    studentByCpf
}