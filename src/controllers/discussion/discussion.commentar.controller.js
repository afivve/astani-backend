const { User, Discussion, DiscussionCommentar } = require('../../database/models')
const utils = require('../../utils')
const imageKitFile = require('../../utils/imageKitFile')

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

            const checkDiscussion = await Discussion.findOne({
                where: {
                    id: discussionId
                }
            })

            if (!checkDiscussion) return res.status(404).json(utils.apiError("Diskusi tidak ditemukan"))


            const discussionCommentar = await DiscussionCommentar.create({

                commentar: commentar,
                discussionId: discussionId,
                userId: userId,
                urlPhoto: uploadFileUrl,
                imageFilename: uploadFileName

            })


            return res.status(201).json(utils.apiSuccess("sukses", discussionCommentar))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Kesalahan pada Internal Server"))
        }
    },
}