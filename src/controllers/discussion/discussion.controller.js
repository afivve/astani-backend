const { User, Discussion, DiscussionCommentar } = require('../../database/models')
const utils = require('../../utils')
const imageKitFile = require('../../utils/imageKitFile')

module.exports = {
    create: async (req, res) => {
        try {

            let uploadFileUrl
            let uploadFileName

            if (req.file) {

                const photoDiscussion = req.file
                const allowedMimes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
                const allowedSizeMb = 2

                if (!allowedMimes.includes(photoDiscussion.mimetype)) return res.status(409).json(utils.apiError("Format gambar tidak diperbolehkan"))

                if ((photoDiscussion.size / (1024 * 1024)) > allowedSizeMb) return res.status(409).json(utils.apiError("Gambar kategori tidak boleh lebih dari 2mb"))

                const uploadFile = await imageKitFile.upload(photoDiscussion)

                if (!uploadFile) return res.status(500).json(utils.apiError("Internal server error"))

                uploadFileUrl = uploadFile.url
                uploadFileName = uploadFile.name
            }

            const { title, question } = req.body
            const userId = res.user.id

            const discussion = await Discussion.create({
                title: title,
                question: question,
                userId: userId,
                urlPhoto: uploadFileUrl,
                imageFilename: uploadFileName

            })

            return res.status(201).json(utils.apiSuccess("Berhasil membuat diskusi", discussion))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id

            const dicsussion = await Discussion.findByPk(id)

            if (!dicsussion) return res.status(404).json(utils.apiError("Diskusi Tidak di temukan"))

            const photoDiscussion = req.file

            const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

            const allowedSizeMb = 2

            let imageUrl = null
            let imageFileName = null

            if (typeof photoDiscussion === 'undefined') {

                imageUrl = dicsussion.urlPhoto
                imageFileName = dicsussion.imageFilename

            } else {
                if (!allowedMimes.includes(photoDiscussion.mimetype)) return res.status(409).json(utils.apiError("Format gambar tidak diperbolehkan"))
                if ((photoDiscussion.size / (1024 * 1024)) > allowedSizeMb) return res.status(409).json(utils.apiError("Gambar tidak boleh lebih dari 2mb"))
                if (discussion.imageFileName != null) {
                    const deleteFile = await imageKitFile.delete(discussion.imageFileName)
                    if (!deleteFile) return res.status(500).json(utils.apiError("Internal server error"))
                }

                const uploadFile = await imageKitFile.upload(photoDiscussion)

                if (!uploadFile) return res.status(500).json(utils.apiError("Internal server error"))

                imageUrl = uploadFile.url
                imageFileName = uploadFile.name
            }

            const { title, question } = req.body
            const userId = res.user.id

            const discussion = await Discussion.update(
                {
                    title: title,
                    question: question,
                    userId: userId,
                    urlPhoto: imageUrl,
                    imageFilename: imageFileName
                },
                {
                    where: {
                        id: id
                    }
                }
            )

            return res.status(201).json(utils.apiSuccess("Berhasil update data diskusi"))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readById: async (req, res) => {
        try {

            const discussionId = req.params.id

            const discussion = await Discussion.findOne({
                where: {
                    id: discussionId
                },
                include: [
                    {
                        model: DiscussionCommentar,
                        as: 'commentars',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            }
                        ]
                    },
                    {
                        model: User,
                        as: 'user',
                    }
                ]
            });

            if (!discussion) return res.status(404).json(utils.apiError("Diskusi tidak ditemukan"))

            const data = {
                discussionId: discussion.id,
                title: discussion.title,
                urlPhoto: discussion.urlPhoto,
                question: discussion.question,
                userId: discussion.user.id,
                username: discussion.user.name,
                userPhoto: discussion.user.photoProfile,
                createdAt: discussion.createdAt,
                updatedAt: discussion.updatedAt,
                commentars: discussion.commentars.map((comment) => ({
                    commentarId: comment.id,
                    commentar: comment.commentar,
                    photoCommentar: comment.urlPhoto,
                    userId: comment.userId,
                    username: comment.user ? comment.user.name : null,
                    userPhoto: comment.user ? comment.user.photoProfile : null,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt
                }))
            }

            return res.status(200).json(utils.apiSuccess("Sukses", data))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readAll: async (req, res) => {
        try {
            const discussions = await Discussion.findAll({
                include: [
                    {
                        model: DiscussionCommentar,
                        as: 'commentars',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            }
                        ]
                    },
                    {
                        model: User,
                        as: 'user',
                    }
                ]
            });

            const data = discussions.map((discussion) => {
                const totalComments = discussion.commentars.length
                return {
                    id: discussion.id,
                    title: discussion.title,
                    question: discussion.question,
                    userId: discussion.user.id,
                    username: discussion.user.name,
                    userPhoto: discussion.user.photoProfile,
                    totalComments: totalComments,
                    createdAt: discussion.createdAt,
                }
            })

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data diskusi", data))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const userId = res.user.id

            await Discussion.destroy({
                where: {
                    id: id,
                    userId: userId
                }
            })

            return res.status(201).json(utils.apiSuccess("Berhasil hapus data diskusi"))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },
}