const utils = require('../utils')

const checkRole = (...roles) => {
    return async (req, res, next) => {
        try {

            const role = res.user.role

            if (roles.includes(role)) {
                return next()
            } else {
                return res.status(403).json(utils.apiError("Akses tidak diperbolehkan"))
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada Internal Server"))
        }
    }
}


module.exports = checkRole
