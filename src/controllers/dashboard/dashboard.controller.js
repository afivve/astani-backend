const { User, Discussion, DiscussionCommentar, Disease, PredictHistory } = require('../../database/models')
const utils = require('../../utils')
const { Sequelize, Op } = require('sequelize')

module.exports = {

    precentageResultPredict: async (req, res) => {
        try {
            const predictHistory = await PredictHistory.findAll({
                attributes: [
                    'diseaseId',
                    [Sequelize.fn('COUNT', Sequelize.col('diseaseId')), 'count']
                ],
                include: [
                    {
                        model: Disease,
                        as: 'disease',
                        attributes: ['name']
                    }
                ],
                group: ['diseaseId', 'disease.name']
            })

            if (!predictHistory.length) return res.status(404).json(utils.apiError("Tidak ada data"))

            const totalPredictions = predictHistory.reduce((sum, record) => sum + parseInt(record.dataValues.count, 10), 0)

            const result = predictHistory.map(record => {
                const count = parseInt(record.dataValues.count, 10)
                const percentage = (count / totalPredictions * 100)
                return {
                    diseaseName: record.disease.name,
                    count,
                    percentage,
                }
            })

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data presentase", result, { totalPredict: predictHistory.length }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    totalUser: async (req, res) => {
        try {
            const user = await User.findAll()

            const totalUser = user.length

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data total user", { totalUser }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    totalPredict: async (req, res) => {
        try {
            const predictHistory = await PredictHistory.findAll()

            const totalPredictHistory = predictHistory.length

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data total identifikasi", { totalPredictHistory }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    lastSevenDaysActive: async (req, res) => {
        try {

            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const predictHistory = await PredictHistory.findAll({
                attributes: [
                    'userId',
                    [Sequelize.fn('COUNT', Sequelize.col('userId')), 'count']
                ],
                where: {
                    createdAt: {
                        [Op.gte]: sevenDaysAgo
                    }
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: []
                    }
                ],
                group: ['userId']
            })

            if (!predictHistory.length) return res.status(404).json(utils.apiError("Tidak ada data histori"))


            const totalUser = predictHistory.length

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data user aktif 7 hari terakhir", { totalUser }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    mostActiveDiscussion: async (req, res) => {
        try {

            const now = new Date()
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(now.getDate() - 7)

            const discussions = await Discussion.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [sevenDaysAgo, now]
                    }
                },
                include: [
                    {
                        model: DiscussionCommentar,
                        as: 'commentars',
                    },
                ],
                order: [['createdAt', 'DESC']]
            })

            discussions.sort((a, b) => b.commentars.length - a.commentars.length)

            const topDiscussions = discussions.slice(0, 5)

            const data = topDiscussions.map((discussion) => {
                const totalComments = discussion.commentars.length;

                return {
                    id: discussion.id,
                    title: discussion.title,
                    question: discussion.question,
                    userId: discussion.userId,
                    totalComments: totalComments,
                    createdAt: discussion.createdAt,
                }
            })

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data diskusi teratas", data));

        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    }
}
