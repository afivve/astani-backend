const { Disease, DiseaseSolution } = require('../../database/models')
const utils = require('../../utils')

module.exports = {
    create: async (req, res) => {
        try {
            const { action } = req.body
            const diseaseId = req.params.diseaseId

            const disease = await DiseaseSolution.create({
                action: action,
                diseaseId: diseaseId
            })

            return res.status(201).json(utils.apiSuccess("Data penanganan penyakit berhasil dibuat", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readByIdDisease: async (req, res) => {
        try {
            const diseaseId = req.params.diseaseId;
            const diseaseSolutions = await DiseaseSolution.findAll({
                where: {
                    diseaseId: diseaseId
                },
                include: [
                    {
                        model: Disease,
                        as: 'disease'
                    },
                ]

            })

            if (!diseaseSolutions) {
                return res.status(404).json(utils.apiError("Data penanganan penyakit tidak ditemukan"));
            }

            const disease = await Disease.findOne({
                where: {
                    id: diseaseId
                }
            })

            const diseaseName = disease.name

            const data = diseaseSolutions.map(diseaseSolution => ({
                id: diseaseSolution.id,
                action: diseaseSolution.action,
                diseaseId: diseaseSolution.diseaseId,
                diseaseName: diseaseSolution.disease.name,
                createdAt: diseaseSolution.createdAt,
                updatedAt: diseaseSolution.updatedAt,
            }))

            return res.status(200).json(utils.apiSuccess("Data penanganan penyakit berdasarkan ID penyakit berhasil ditemukan", data, { diseaseName }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"));
        }
    },

    readByIdSolution: async (req, res) => {
        try {
            const solutionId = req.params.solutionId;
            const disease = await DiseaseSolution.findOne({ where: { id: solutionId } })

            if (!disease) {
                return res.status(404).json(utils.apiError("Data penanganan penyakit berdasarkan ID tidak ditemukan"));
            }

            return res.status(200).json(utils.apiSuccess("Data penanganan penyakit berdasarkan ID berhasil ditemukan", disease));
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"));
        }
    },

    update: async (req, res) => {
        try {

            const { action } = req.body

            const solutionId = req.params.solutionId;
            const solutionDisease = await DiseaseSolution.findOne({ where: { id: solutionId, } });

            if (!solutionDisease) {
                return res.status(404).json(utils.apiError("Data penanganan penyakit tidak ditemukan"));
            }

            await DiseaseSolution.update(
                { action: action },
                {
                    where: {
                        id: solutionId,
                    }
                }
            )

            return res.status(200).json(utils.apiSuccess("Data penanganan penyakit berhasil diperbarui"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"));
        }
    },

    delete: async (req, res) => {
        try {
            const solutionId = req.params.solutionId;
            const disease = await DiseaseSolution.findOne({ where: { id: solutionId } });

            if (!disease) {
                return res.status(404).json(utils.apiError("Data penanganan penyakit tidak ditemukan"));
            }

            await disease.destroy();

            return res.status(200).json(utils.apiSuccess("Data penanganan penyakit berhasil dihapus"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"));
        }
    },
}
