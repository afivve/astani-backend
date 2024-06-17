const { User, Otp } = require('../../database/models')
const utils = require('../../utils')
const utilsOtp = require('../../utils/otp')
const resetUtils = require('../../utils/reset.password')
const axios = require('axios')
const notification = require('../../utils/notification')


module.exports = {

    register: async (req, res) => {
        try {
            const { name, email, phone, password, gender, age, province, city } = req.body

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
                    phone: phone,
                    password: hashPassword,
                    gender: gender,
                    age: age,
                    province: province,
                    city: city,
                    photoProfile: "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png",
                })

                return res.status(201).json(utils.apiSuccess("Pendaftaran akun berhasil. Periksa email masuk untuk kode verifikasi Otp", { email: user.email }))

            } else {
                return res.status(500).json(utils.apiError("Internal server error"))
            }


        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
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
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    resendOtp: async (req, res) => {
        try {
            const { email } = req.body

            const emailSent = await utilsOtp.sendOtp(email, 'resend-otp')

            if (emailSent) {
                return res.status(200).json(utils.apiSuccess("Otp berhasil dikirim ulang. Periksa email masuk"))
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
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

            const payload = { id: user.id, role: user.role }
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

    googleLogin: async (req, res) => {
        try {
            const { accessToken } = req.body

            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
            );

            const { sub, email, name } = response.data

            /* let user = await User.findOne({ where: { googleId: sub } }); */

            let user = await User.findOne({
                where: {
                    googleId: sub
                }
            })

            if (!user) {
                user = await db.user.create({
                    email: email,
                    name: name,
                    googleId: sub,
                    role: "user",
                    photoProfile: "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png",
                })
            }

            /* if (!user)
              user = await User.create({
                email,
                name,
                googleId: sub,
                registeredVia: "google",
                roleId,
              }); */

            const payload = { id: user.id, role: user.roleName }
            const token = await utils.createJwt(payload)
            const data = {
                token: token
            }

            return res.status(200).json(utils.apiSuccess("Login berhasil", data))
        } catch (error) {
            console.error(error);

            let status = 500;
            if (axios.isAxiosError(error)) {
                error.message = error.response.data.error_description;
                status = error.response.status;
            }

            return res.status(status).json(utils.apiError(error.message));
        }
    },

    loginAdmin: async (req, res) => {
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

            if (!user.role === 'admin') return res.status(403).json(utils.apiError("Email atau Password Salah"))

            const payload = { id: user.id, role: user.role }
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

    changePassword: async (req, res) => {

        try {

            const userId = res.user.id
            const { oldPassword, newPassword } = req.body

            const user = await User.findByPk(userId)

            if (!user) return res.status(404).json(utils.apiError("User tidak ditemukkan"))

            if (user.password) {
                const verifyOldPassword = await utils.verifyHashData(oldPassword, user.password)

                if (!verifyOldPassword) return res.status(409).json(utils.apiError("Password lama salah"))
            }

            const hashPassword = await utils.hashData(newPassword)

            await User.update(
                {
                    password: hashPassword
                },
                {
                    where: {
                        id: userId
                    }
                }
            )

            const sendNotification = await notification.createNotification("Update Password", "Ubah password berhasil", null, false, userId)

            if (!sendNotification) console.log('Gagal mengirim notifikasi')

            return res.status(200).json(utils.apiSuccess("Password berhasil diubah"))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
        }
    },


    requestResetPassword: async (req, res) => {
        try {

            const { email } = req.body

            const user = await db.user.findFirst({
                where: {
                    email: email
                }
            })

            if (!user) return res.status(404).json(utils.apiError("Email tidak ditemukkan"))

            if (user.resetToken != null) return res.status(500).json(utils.apiError("Link untuk reset password sudah dikirim ke email anda"))

            let bcryptResetToken = await utils.hashData(email)

            let resetToken = bcryptResetToken.replace(/[\/\\.]/g, "a")

            await User.update(
                {
                    resetToken: resetToken
                },
                {
                    where: {
                        id: user.id
                    }
                }
            )

            const resetPasswordSent = await resetUtils.send(email, resetToken)

            if (!resetPasswordSent) return res.status(500).json(utils.apiError('Kesalahan pada internal server'))

            return res.status(200).json(utils.apiSuccess("Periksa email anda untuk link reset password"))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
        }
    },

    resetPassword: async (req, res) => {
        try {

            const { resetToken, password } = req.body

            const user = await User.findOne({
                where: {
                    resetToken: resetToken
                }
            })

            if (!user) return res.status(500).json(utils.apiError("Reset password token invalid"))

            const hashPassword = await utils.hashData(password)

            await User.update(
                {
                    password: hashPassword,
                    resetToken: null
                },
                {
                    where: {
                        id: user.id
                    }
                }
            )

            /* const sendNotification = await notification.createNotification("Reset Password", null, "Reset password berhasil", user.id)

            if (!sendNotification) console.log('Gagal mengirim notifikasi') */

            return res.status(200).json(utils.apiSuccess("Reset password berhasil"))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
        }
    },

}