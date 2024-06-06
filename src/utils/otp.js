const { Otp } = require('../database/models')
const utils = require('./index')
const emailHelper = require('../helpers/email')
const transporter = require('./transporter')

module.exports = {
    sendOtp: async (email, confEmail) => {
        try {

            const existOtp = await Otp.findOne({
                where: {
                    email: email
                }
            })

            if (existOtp) {
                await Otp.destroy({
                    where: {
                        id: existOtp.id
                    }
                })
            }

            const otp = await utils.generateOtp()

            let mailOptions

            if (confEmail === 'register') {
                mailOptions = await emailHelper.register(email, otp)
            } /* else if (confEmail === 'request-reset-password') {
                mailOptions = await emailHelper.requestResetPassword(email, otp)
            } else if (confEmail === 'resend-otp') {
                mailOptions = await emailHelper.resendOtp(email, otp)
            } */

            await transporter.sendEmail(mailOptions)

            const hashedOtp = await utils.hashData(otp)
            const expiredAt = new Date(Date.now() + 600000)

            await Otp.create({
                email: email,
                otp: hashedOtp,
                expiredAt: expiredAt
            })

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },

    verifyOtp: async (email, otp) => {
        try {

            const existOtp = await Otp.findOne({
                where: {
                    email: email
                }
            })

            const expiredAt = existOtp.expiredAt

            const hashedOtp = existOtp.otp
            const verifyOtp = await utils.verifyHashData(otp, hashedOtp)

            if (verifyOtp) {
                if (expiredAt < Date.now()) {
                    await Otp.destroy({
                        where: {
                            id: existOtp.id
                        }
                    })

                    return utils.apiError("Otp telah kadaluwarsa")
                }
                await Otp.destroy({
                    where: {
                        id: existOtp.id
                    }
                })

                return utils.apiSuccess("Verifikasi otp berhasil")
            } else {
                return utils.apiError("Otp tidak valid atau tidak cocok")
            }

        } catch (error) {
            console.log(error)

        }
    }

}
