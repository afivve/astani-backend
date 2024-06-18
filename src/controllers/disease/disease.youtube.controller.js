const { DiseaseYoutube } = require('../../database/models')
const utils = require('../../utils')

module.exports = {
    create: async (req, res) => {
        try {
            const { link } = req.body
            const diseaseId = req.params.diseaseId

            const disease = await DiseaseYoutube.create({
                link: link,
                diseaseId: diseaseId
            })

            return res.status(201).json(utils.apiSuccess("Data video YouTube tentang penyakit berhasil dibuat", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readByIdDisease: async (req, res) => {
        try {
            const diseaseId = req.params.diseaseId
            const diseaseYoutubes = await DiseaseYoutube.findAll({ where: { diseaseId: diseaseId } })

            if (!disease) {
                return res.status(404).json(utils.apiError("Data video YouTube tentang penyakit tidak ditemukan"))
            }

            const disease = await Disease.findOne({
                where: {
                    id: diseaseId
                }
            })

            const diseaseName = disease.name

            const data = diseaseYoutubes.map(diseaseYoutube => ({
                id: diseaseYoutube.id,
                action: diseaseYoutube.action,
                diseaseId: diseaseYoutube.diseaseId,
                diseaseName: diseaseYoutube.disease.name,
                createdAt: diseaseYoutube.createdAt,
                updatedAt: diseaseYoutube.updatedAt,
            }))


            return res.status(200).json(utils.apiSuccess("Data video YouTube tentang penyakit berhasil ditemukan", data, { diseaseName }))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readByIdYoutube: async (req, res) => {
        try {

            const youtubeId = req.params.youtubeId
            const disease = await DiseaseYoutube.findOne({ where: { id: youtubeId } })

            if (!disease) {
                return res.status(404).json(utils.apiError("Data video YouTube tentang penyakit tidak ditemukan"))
            }

            return res.status(200).json(utils.apiSuccess("Data video YouTube tentang penyakit berhasil ditemukan", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    update: async (req, res) => {
        try {

            const { link } = req.body

            const youtubeId = req.params.youtubeId
            const solutionDisease = await DiseaseYoutube.findOne({ where: { id: youtubeId } })

            if (!solutionDisease) {
                return res.status(404).json(utils.apiError("Data video YouTube tentang penyakit tidak ditemukan"))
            }

            await DiseaseYoutube.update(
                { link: link },
                {
                    where: {
                        id: youtubeId,
                    }
                }
            )

            return res.status(200).json(utils.apiSuccess("Data video YouTube tentang penyakit berhasil diperbarui"))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    delete: async (req, res) => {
        try {

            const youtubeId = req.params.youtubeId

            const disease = await DiseaseYoutube.findOne({ where: { id: youtubeId } })

            if (!disease) {
                return res.status(404).json(utils.apiError("Data video YouTube tentang penyakit tidak ditemukan"))
            }

            await disease.destroy()

            return res.status(200).json(utils.apiSuccess("Data video YouTube tentang penyakit berhasil dihapus"))
        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },
}
