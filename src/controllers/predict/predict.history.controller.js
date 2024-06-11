const { User, Disease, DiseaseSolution, PredictHistory } = require('../../database/models')
const utils = require('../../utils')


module.exports = {

    readAll: async (req, res) => {
        try {

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
                ]
            })

            if (!predictHistory) return res.status(404).json(utils.apiError("Tidak ada data histori"))

            const data = predictHistory.map(history => ({
                historyId: history.id,
                diseaseName: history.disease.name,
                confidence: history.confidence,
                username: history.user.name,
                userId: history.userId,
                imageUrl: history.imageUrl,
                createdAt: history.createdAt
            }))

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data", data))

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
                ]
            })

            if (!predictHistory) return res.status(404).json(utils.apiError("Tidak ada data histori"))

            const data = predictHistory.map(history => ({
                historyId: history.id,
                diseaseName: history.disease.name,
                confidence: history.confidence,
                imageUrl: history.imageUrl,
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
                            }
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
                }))
            }

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data", data))

        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },
}