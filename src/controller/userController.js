const bcrypt = require('bcryptjs');
const knex = require('../connection/connection');
const { updateUserData, studentByStudentId, studentByGuardianId, guardianByCpf, studentByCpf, userByEmail } = require('../services/userServices');




const updateUser = async (req, res) => {
    const updateData = req.body;
    const { id, email: currentEmail, type} = req.user;

    try {

        if (updateData.email && updateData.email !== currentEmail) {
            const user = await userByEmail(updateData.email)
            if (user) {
                return res.status(400).json({ message: "O email informado já existe!" });
            }
        }

        const updatedUser = await updateUserData(
            id, updateData, type
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor. Tente novamente mais tarde." })
    }

}

const getUserData = async (req, res) => {
    return res.status(200).json(req.user);
}

const getStudentByStudentId = async (req, res) => {
    const { ra } = req.params;

    try {
        const student = await studentByStudentId(ra)

        if (!student) {
            return res.status(404).json({ message: "Estudante não encontrado" });
        }

        return res.status(200).json(student)

    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor. Tente novamente mais tarde." })
    }
}

const getAllStudentOfGuardian = async (req, res) => {
    const { guardianId } = req.params;

    try {
        const students = await studentByGuardianId(guardianId)

        if (studentByStudentId.length === 0) {
            return res.status(404).json({
                message: "Nenhum estudante encontrado para este responsável."
            })
        }

        res.json(students)

    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor. Tente novamente mais tarde." })
    }

}

const userByCpfOrStudentId = async (req, res) => {

    const { cpf, ra } = req.query;

    try {

        let user;

        if (cpf) {
            const guardian = await guardianByCpf(cpf);


            if (guardian) {
                user = guardian;
                user.guardianInfo = { cpf: guardian.cpf }
            } else {
                const student = await studentByCpf(cpf)

                if (student) {
                    user = student
                    user.studentInfo = {
                        cpf: student.cpf,
                        ra: student.ra,
                        school: student.school,
                        address: student.address,
                        guardian_id: student.guardian_id
                    };
                }


            }

        }

        if (ra && !user) {
            const student = await studentByStudentId(ra);

            if (student) {
                user = student;
                user.studentInfo = {
                    cpf: student.cpf,
                    ra: student.ra,
                    school: student.school,
                    address: student.address,
                    guardian_id: student.guardian_id
                };
            }
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor. Tente novamente mais tarde." })
    }


}

module.exports = {
    userByCpfOrStudentId,
    updateUser,
    getUserData,
    getStudentByStudentId,
    getAllStudentOfGuardian
}
