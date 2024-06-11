const { DiseaseSolution } = require('../../database/models')
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

            return res.status(201).json(utils.apiSuccess("Data berhasil dibuat", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    },

    /* delete: async (req, res) => {
        try {
            const id = req.params.id

            const disease = await Disease.findByPk(id)

            if (!disease) return res.status(404).json(utils.apiError("Data berdasarkan id tidak ditemukan"))

            const deleteDisease = await Disease.destroy({
                where: {
                    id: id
                }
            })

            if (deleteDisease) return res.status(200).json(utils.apiSuccess("Berhasil menghapus data berdasarkan id"))

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    } */
}
