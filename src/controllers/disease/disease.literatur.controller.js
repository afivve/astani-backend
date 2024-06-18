const { Disease, DiseaseLiteratur } = require('../../database/models')
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

            return res.status(201).json(utils.apiSuccess("Data literatur penyakit berhasil dibuat", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readByIdDisease: async (req, res) => {
        try {
            const diseaseId = req.params.diseaseId
            const diseaseLiteraturs = await DiseaseLiteratur.findAll({
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

            if (!diseaseLiteraturs) {
                return res.status(404).json(utils.apiError("Data Literatur Penyakit tidak ada"))
            }

            const disease = await Disease.findOne({
                where: {
                    id: diseaseId
                }
            })

            const diseaseName = disease.name

            const data = diseaseLiteraturs.map(diseaseLiteratur => ({
                id: diseaseLiteratur.id,
                link: diseaseLiteratur.link,
                diseaseId: diseaseLiteratur.diseaseId,
                diseaseName: diseaseLiteratur.disease.name,
                createdAt: diseaseLiteratur.createdAt,
                updatedAt: diseaseLiteratur.updatedAt,
            }))

            return res.status(200).json(utils.apiSuccess("Data literatur penyakit berdasarkan ID penyakit berhasil ditemukan", data, { diseaseName }))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readByIdLiteratur: async (req, res) => {
        try {

            const literaturId = req.params.literaturId
            const disease = await DiseaseLiteratur.findOne({ where: { id: literaturId, } })

            if (!disease) {
                return res.status(404).json(utils.apiError("Data literatur penyakit tidak ditemukan"))
            }

            return res.status(200).json(utils.apiSuccess("Data literatur penyakit berdasarkan id berhasil ditemukan", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    update: async (req, res) => {
        try {

            const { link } = req.body

            const literaturId = req.params.literaturId
            const solutionDisease = await DiseaseLiteratur.findOne({ where: { id: literaturId } })

            if (!solutionDisease) {
                return res.status(404).json(utils.apiError("Data literatur penyakit tidak ditemukan"))
            }

            await DiseaseLiteratur.update(
                { link: link },
                {
                    where: {
                        id: literaturId,
                    }
                }
            )

            return res.status(200).json(utils.apiSuccess("Data literatur penyakit berhasil diperbarui"))
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
                return res.status(404).json(utils.apiError("Data literatur penyakit tidak ditemukan"))
            }

            await disease.destroy()

            return res.status(200).json(utils.apiSuccess("Data literatur penyakit berhasil dihapus"))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },
}
