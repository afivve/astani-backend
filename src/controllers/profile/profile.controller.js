const { User } = require('../../database/models')
const utils = require('../../utils')

module.exports = {
    me: async (req, res) => {
        try {
            const { id } = res.user
            const user = await User.findByPk(id)

            const data = {
                name: user.name,
                email: user.email,
                gender: user.gender,
                age: user.age,
                photoProfile: user.photoProfile
            }

            return res.status(200).json(utils.apiSuccess("Data user berhasil diambil", data))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
        }
    },
}
