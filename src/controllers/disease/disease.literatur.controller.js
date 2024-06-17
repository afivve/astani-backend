const { DiseaseLiteratur } = require('../../database/models')
const utils = require('../../utils')

module.exports = {
    create: async (req, res) => {
        try {
            const { link } = req.body
            const diseaseId = req.params.diseaseId

            const disease = await DiseaseLiteratur.create({
                link: link,
                diseaseId: diseaseId
            })

            return res.status(201).json(utils.apiSuccess("Data berhasil dibuat", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readByIdDisease: async (req, res) => {
        try {
            const diseaseId = req.params.diseaseId
            const disease = await DiseaseLiteratur.findAll({ where: { diseaseId: diseaseId } })

            if (!disease) {
                return res.status(404).json(utils.apiError("Data tidak ditemukan"))
            }

            return res.status(200).json(utils.apiSuccess("Data berhasil ditemukan", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readByIdLiteratur: async (req, res) => {
        try {
            const diseaseId = req.params.diseaseId
            const literaturId = req.params.literaturId
            const disease = await DiseaseLiteratur.findOne({ where: { id: literaturId, diseaseId: diseaseId } })

            if (!disease) {
                return res.status(404).json(utils.apiError("Data tidak ditemukan"))
            }

            return res.status(200).json(utils.apiSuccess("Data berhasil ditemukan", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    update: async (req, res) => {
        try {

            const { link } = req.body

            const diseaseId = req.params.diseaseId
            const literaturId = req.params.literaturId
            const solutionDisease = await DiseaseLiteratur.findOne({ where: { id: literaturId, diseaseId: diseaseId } })

            if (!solutionDisease) {
                return res.status(404).json(utils.apiError("Data tidak ditemukan"))
            }

            await DiseaseLiteratur.update(
                { link: link },
                {
                    where: {
                        id: literaturId,
                        diseaseId: diseaseId
                    }
                }
            )

            return res.status(200).json(utils.apiSuccess("Data berhasil diperbarui"))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    delete: async (req, res) => {
        try {
            const literaturId = req.params.literaturId
            const disease = await DiseaseLiteratur.findOne({ where: { id: literaturId } })

            if (!disease) {
                return res.status(404).json(utils.apiError("Data tidak ditemukan"))
            }

            await disease.destroy()

            return res.status(200).json(utils.apiSuccess("Data berhasil dihapus"))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },
}
