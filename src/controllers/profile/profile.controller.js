const { User } = require('../../database/models')
const utils = require('../../utils')
const imageKitFile = require('../../utils/imageKitFile')
const notification = require('../../utils/notification')

module.exports = {
    me: async (req, res) => {
        try {
            const { id } = res.user
            const user = await User.findByPk(id)

            const data = {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                age: user.age,
                city: user.city,
                province: user.province,
                photoProfile: user.photoProfile,
                role: user.role
            }

            return res.status(200).json(utils.apiSuccess("Data user berhasil diambil", data))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
        }
    },

    updateProfile: async (req, res) => {
        try {

            const { name, email, phone, gender, age, province, city } = req.body

            await User.update(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    gender: gender,
                    age: age,
                    province: province,
                    city: city
                },
                {
                    where: {
                        id: res.user.id
                    }
                }

            )

            const sendNotification = await notification.createNotification("Update Profile", "Profile berhasil diperbarui", null, false, res.user.id)

            if (!sendNotification) console.log('Gagal mengirim notifikasi')

            return res.status(200).json(utils.apiSuccess("Profile berhasil diperbarui"))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
        }
    },

    updateProfilePhoto: async (req, res) => {
        try {

            const photoProfile = req.file

            const allowedSizeMb = 2
            const allowedMimes = [
                'image/png',
                'image/jpeg',
                'image/jpg',
                'image/webp'
            ]

            if (typeof photoProfile === 'undefined') return res.status(400).json(utils.apiError("Gambar tidak boleh kosong"))

            if (!allowedMimes.includes(photoProfile.mimetype)) return res.status(400).json(utils.apiError("Harus bertipe gambar (.png, .jpeg, .jpg, .webp)"))

            if ((photoProfile.size / (1024 * 1024)) > allowedSizeMb) return res.status(400).json(utils.apiError("Gambar tidak boleh lebih dari 2mb"))


            const uploadFile = await imageKitFile.upload(photoProfile)

            if (!uploadFile) return res.status(500).json(utils.apiError("Kesalahan pada internal server"))

            await User.update(
                {
                    photoProfile: uploadFile.url,
                    imageFilename: uploadFile.name
                },
                {
                    where: {
                        id: res.user.id
                    }
                }
            )

            const sendNotification = await notification.createNotification("Update Profile Photo", "Foto profile berhasil diubah", null, false, res.user.id)

            if (!sendNotification) console.log('Gagal mengirim notifikasi')

            return res.status(200).json(utils.apiSuccess("Foto profile berhasil diperbarui"))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
        }
    }
}
