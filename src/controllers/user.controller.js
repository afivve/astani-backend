const service = require('../services/user.services')
const utils = require('../utils')

module.exports = {
    register: async (req, res) => {
        try {

            const { name, email, password, gender, age, address } = req.body

            const userData = { name, email, password, gender, age, address }

            const { user, created } = await service.register(userData)

            if (created) {
                return utils.successResponse(res, 201, "Pendaftaran berhasil", user)
            } else {
                return utils.errorResponse(res, 409, "Email sudah terdaftar")
            }

        } catch (error) {
            console.log(error)
            return utils.errorResponse(res, 500, "Internal server error")
        }
    },

    login: async (req, res) => {
        try {

            const { email, password } = req.body
            const { user } = await service.login(email, password)

            if (!user) return errorResponse(res, 401, error.message)

            return utils.successResponse(res, 200, "Login berhasil", user)


        } catch (error) {
            console.log(error)
            return utils.errorResponse(res, 500, "Internal server error")
        }
    }
}