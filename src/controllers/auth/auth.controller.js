const { User, Otp } = require('../../database/models')
const utils = require('../../utils')
const utilsOtp = require('../../utils/otp')

module.exports = {

    register: async (req, res) => {
        try {
            const { name, email, password, gender, age, address } = req.body

            const hashPassword = await utils.hashData(password)

            const checkEmail = await User.findOne({
                where: {
                    email: email
                }
            })

            if (checkEmail) res.status(409).json(utils.apiError("Email telah terdaftar"))

            const emailSent = await utilsOtp.sendOtp(email, 'register')

            if (emailSent) {
                const user = await User.create({
                    name: name,
                    email: email,
                    password: hashPassword,
                    gender: gender,
                    age: age,
                    address: address

                })

                return res.status(201).json(utils.apiSuccess("Pendaftaran akun berhasil. Periksa email masuk untuk kode verifikasi Otp", { email: user.email }))

            } else {
                return res.status(500).json("Internal server error")
            }


        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    },

    verification: async (req, res) => {
        try {
            const { email, otp } = req.body

            const existOtp = await Otp.findOne({
                where: {
                    email: email
                }
            })

            if (!existOtp) return res.status(404).json(utils.apiError('Otp tidak ditemukan. Silahkan kirim ulang kembali'))

            const verifyOtp = await utilsOtp.verifyOtp(email, otp)

            if (verifyOtp.status === 'success') {
                await User.update(
                    { verified: true },
                    {
                        where: {
                            email: email
                        }
                    }
                )
                return res.status(200).json(utils.apiSuccess("User berhasil diverifikasi"))
            } else {
                return res.status(409).json(utils.apiError(verifyOtp.message))
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    },

    login: async (req, res) => {
        try {

            const { email, password } = req.body

            const user = await User.findOne({
                where: {
                    email: email,
                },
            })

            if (!user) return res.status(400).json(utils.apiError("Email tidak terdaftar"))

            const verifyPassword = await utils.verifyHashData(password, user.password)

            if (!verifyPassword) return res.status(409).json(utils.apiError("Password salah"))

            const verified = user.verified

            if (!verified) {
                const emailSent = await utilsOtp.sendOtp(email, 'register')
                if (emailSent) {
                    return res.status(409).json(utils.apiError("Akun belum terverifikasi. Periksa email masuk untuk verifikasi kode Otp", { email }))
                } else {
                    return res.status(500).json(utils.apiError('Kesalahan pada internal server'))
                }
            }

            if (!user.role === 'user') return res.status(403).json(utils.apiError("Akses tidak diperbolehkan"))

            const payload = { id: user.id, roleName: user.role }
            const token = await utils.createJwt(payload)

            const data = {
                token: token
            }

            return res.status(200).json(utils.apiSuccess("Login berhasil", data))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError('Kesalahan pada internal server'))
        }
    },

    me: async (req, res) => {

    },

    changePassword: async (req, res) => {

    },

    resetPassword: async (req, res) => {

    }

}