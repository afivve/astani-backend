const { User, Disease, DiseaseSolution, PredictHistory, DiseaseLiteratur } = require('../../database/models')
const utils = require('../../utils')


module.exports = {

    readAll: async (req, res) => {
        try {

            let { page = 1, limit = 10 } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);
            let offset = (page - 1) * limit;

            const predictHistory = await PredictHistory.findAll({
                include: [
                    {
                        model: Disease,
                        as: 'disease'
                    },
                    {
                        model: User,
                        as: 'user'
                    }
                ],
                order: [['id', 'DESC']],
                limit: limit,
                offset: offset
            })

            if (!predictHistory) return res.status(404).json(utils.apiError("Tidak ada data histori"))

            const totalData = await PredictHistory.count()

            const totalPage = Math.ceil(totalData / limit)

            const data = predictHistory.map(history => ({
                historyId: history.id,
                diseaseName: history.disease.name,
                confidence: history.confidence,
                username: history.user.name,
                userId: history.userId,
                imageUrl: history.imageUrl,
                time: utils.formatTanggalIndonesia(history.createdAt),
                createdAt: history.createdAt
            }))

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data", data, {
                currentPage: page,
                totalPage: totalPage,
                totalData: totalData
            }))

        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readByIdUser: async (req, res) => {
        try {
            const { id } = res.user

            const predictHistory = await PredictHistory.findAll({
                where: {
                    userId: id
                },
                include: [
                    {
                        model: Disease,
                        as: 'disease',
                    }
                ],
                order: [['id', 'DESC']]
            })

            if (!predictHistory) return res.status(404).json(utils.apiError("Tidak ada data histori"))

            const data = predictHistory.map(history => ({
                historyId: history.id,
                diseaseName: history.disease.name,
                confidence: history.confidence,
                imageUrl: history.imageUrl,
                time: utils.formatTanggalIndonesia(history.createdAt),
                createdAt: history.createdAt,
            }))

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data", data))

        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readDetailHistoryByIdUser: async (req, res) => {
        try {
            const historyId = req.params.historyId
            const { id } = res.user

            const predictHistory = await PredictHistory.findOne({
                where: {
                    id: historyId,
                    userId: id,
                },
                include: [
                    {
                        model: Disease,
                        as: 'disease',
                        include: [
                            {
                                model: DiseaseSolution,
                                as: 'solutions'
                            },
                            {
                                model: DiseaseLiteratur,
                                as: 'literaturs'
                            },
                        ]
                    }
                ]
            })

            if (!predictHistory) return res.status(404).json(utils.apiError("Tidak ada data histori"))

            const data = {
                historyId: predictHistory.id,
                userId: predictHistory.userId,
                diseaseName: predictHistory.disease.name,
                caused: predictHistory.disease.caused,
                symtomps: predictHistory.disease.symtomps,
                confidence: predictHistory.confidence,
                imageUrl: predictHistory.imageUrl,
                createdAt: predictHistory.createdAt,
                solutions: predictHistory.disease.solutions.map(solution => ({
                    solutionId: solution.id,
                    action: solution.action
                })),
                literaturs: predictHistory.disease.literaturs.map(literatur => ({
                    literaturId: literatur.id,
                    link: literatur.link
                }))
            }

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data", data))

        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },
}