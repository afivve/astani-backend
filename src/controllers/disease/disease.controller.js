const { Disease } = require('../../database/models')
const utils = require('../../utils')

module.exports = {
    create: async (req, res) => {
        try {
            const { name, caused, symtomps } = req.body

            const disease = await Disease.create({
                name, caused, symtomps
            })

            return res.status(201).json(utils.apiSuccess("Data berhasil dibuat", disease))
        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    },

    readById: async (req, res) => {
        try {
            const id = req.params.id

            const disease = await Disease.findByPk(id)

            if (!disease) return res.status(404).json(utils.apiError("Data berdasarkan id tidak ditemukan"))

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data berdasarkan id", disease))

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    },

    readAll: async (req, res) => {
        try {
            const disease = await Disease.findAll()

            if (!disease) return res.status(404).json(utils.apiError("Tidak ada data"))

            return res.status(200).json(utils.apiSuccess("Berhasil mengambil data", disease))

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    },

    update: async (req, res) => {
        try {
            const { name, caused, symtomps } = req.body
            const id = req.params.id

            const diseaseUpdate = await Disease.update(
                { name, caused, symtomps },
                {
                    where: {
                        id: id
                    }
                }
            )

            if (diseaseUpdate) return res.status(200).json(utils.apiSuccess("Data berhasil diperbarui"))

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error")
        }
    },

    delete: async (req, res) => {
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
    }
}
