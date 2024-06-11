const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } = require("../config")

module.exports = {
    apiSuccess: (msg, data, extraData = {}) => {
        const response = {
            status: 'success',
            message: msg,
            ...extraData,
            value: data
        }
        return response
    },

    apiError: (msg, errors) => {
        const response = {
            status: 'error',
            message: msg,
            errors: errors,
        }
        return response
    },


    hashData: async (data, saltRounds = 10) => {
        try {
            const hashedData = await bcrypt.hash(data, saltRounds)
            return hashedData
        } catch (error) {
            console.log(error)
        }
    },

    verifyHashData: async (unhashed, hashed) => {
        try {
            const match = await bcrypt.compare(unhashed, hashed)
            return match
        } catch (error) {
            console.log(error)
        }
    },

    createJwt: async (payload) => {
        try {
            return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24h" })
        } catch (error) {
            console.log(error)
        }
    },

    generateOtp: async () => {
        try {
            return `${Math.floor(100000 + Math.random() * 900000)}`
        } catch (error) {
            console.log(error)
        }
    },
}