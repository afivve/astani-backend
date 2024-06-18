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

    formatTanggalIndonesia: (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    },

    formatWaktuIndonesia: (createdAt) => {
        const now = new Date()
        const diffMs = now - createdAt
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        let formattedCreatedAt
        if (diffMinutes < 1) {
            formattedCreatedAt = "baru saja"
        } else if (diffMinutes < 60) {
            formattedCreatedAt = `${diffMinutes} menit yang lalu`
        } else if (diffHours < 24) {
            formattedCreatedAt = `${diffHours} jam yang lalu`
        } else {
            formattedCreatedAt = `${diffDays} hari yang lalu`
        }

        return formattedCreatedAt
    }
}