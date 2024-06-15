const { User, Discussion, DiscussionCommentar } = require('../../database/models')
const utils = require('../../utils')
const imageKitFile = require('../../utils/imageKitFile')
const notification = require('../../utils/notification')

module.exports = {
    create: async (req, res) => {
        try {

            let uploadFileUrl
            let uploadFileName

            if (req.file) {

                const photoCommentar = req.file
                const allowedMimes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
                const allowedSizeMb = 2

                if (!allowedMimes.includes(photoCommentar.mimetype)) return res.status(409).json(utils.apiError("Format gambar tidak diperbolehkan"))

                if ((photoCommentar.size / (1024 * 1024)) > allowedSizeMb) return res.status(409).json(utils.apiError("Gambar kategori tidak boleh lebih dari 2mb"))

                const uploadFile = await imageKitFile.upload(photoCommentar)

                if (!uploadFile) return res.status(500).json(utils.apiError("Kesalahan pada internal server"))

                uploadFileUrl = uploadFile.url
                uploadFileName = uploadFile.name
            }

            const { commentar } = req.body
            const discussionId = req.params.discussionId
            const userId = res.user.id

            const user = await User.findByPk(userId)

            const checkDiscussion = await Discussion.findOne({
                where: {
                    id: discussionId
                }
            })

            if (!checkDiscussion) return res.status(404).json(utils.apiError("Diskusi tidak ditemukan"))

            const userIdDiscussion = checkDiscussion.userId

            const discussionCommentar = await DiscussionCommentar.create({
                commentar: commentar,
                discussionId: discussionId,
                userId: userId,
                urlPhoto: uploadFileUrl,
                imageFilename: uploadFileName

            })

            const fullTitle = checkDiscussion.title
            const limitedTitle = fullTitle.split(' ').slice(0, 4).join(' ')
            const limitedCommentar = commentar.split(' ').slice(0, 3).join(' ')

            const message = `${user.name} memberikan komentar pada diskusi Anda, (${limitedTitle}...: ${limitedCommentar}...)`

            const link = `http://localhost:5000/api/v1/discussions/${checkDiscussion.id}`

            if (userId !== userIdDiscussion) {
                const sendNotification = await notification.createNotification("Forum Diskusi", message, link, false, userIdDiscussion)

                if (!sendNotification) console.log('Gagal mengirim notifikasi')
            }

            return res.status(201).json(utils.apiSuccess("Berhasil membuat komentar", discussionCommentar))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada Internal Server"))
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id
            const discussionId = req.params.discussionId

            const discussion = await Discussion.findByPk(discussionId)

            if (!discussion) return res.status(404).json(utils.apiError("Diskusi Tidak di temukan"))

            const commentars = await DiscussionCommentar.findByPk(id)

            if (!commentars) return res.status(404).json(utils.apiError("Komentar Tidak di temukan"))


            const photoCommentar = req.file

            const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

            const allowedSizeMb = 2

            let imageUrl = null
            let imageFileName = null

            if (typeof photoCommentar === 'undefined') {

                imageUrl = commentars.urlPhoto
                imageFileName = commentars.imageFilename

            } else {
                if (!allowedMimes.includes(photoCommentar.mimetype)) return res.status(409).json(utils.apiError("Format gambar tidak diperbolehkan"))
                if ((photoCommentar.size / (1024 * 1024)) > allowedSizeMb) return res.status(409).json(utils.apiError("Gambar tidak boleh lebih dari 2mb"))
                if (photoCommentar.imageFileName != null) {
                    const deleteFile = await imageKitFile.delete(photoCommentar.imageFileName)
                    if (!deleteFile) return res.status(500).json(utils.apiError("Kesalahan pada internal server"))
                }

                const uploadFile = await imageKitFile.upload(photoCommentar)

                if (!uploadFile) return res.status(500).json(utils.apiError("Kesalahan pada internal server"))

                imageUrl = uploadFile.url
                imageFileName = uploadFile.name
            }

            const { commentar } = req.body

            let message = 'Berhasil update komentar'

            await DiscussionCommentar.update(
                {
                    commentar: commentar,
                    discussionId: discussionId,
                    urlPhoto: imageUrl,
                    imageFilename: imageFileName
                },
                {
                    where: {
                        id: commentars.id
                    },

                }
            )

            return res.status(201).json(utils.apiSuccess(message))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada Internal Server"))
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const discussionId = req.params.discussionId
            const userId = res.user.id

            const discussion = await Discussion.findByPk(discussionId)

            if (!discussion) return res.status(404).json(utils.apiError("Diskusi Tidak di temukan"))

            const commentars = await DiscussionCommentar.findByPk(id)

            if (!commentars) return res.status(404).json(utils.apiError("Komentar Tidak di temukan"))

            await DiscussionCommentar.destroy({
                where: {
                    id: id,
                    userId: userId
                }
            })

            return res.status(201).json(utils.apiSuccess("Berhasil hapus data komentar"))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },
}