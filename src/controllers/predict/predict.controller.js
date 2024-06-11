const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const sharp = require('sharp')

const { Disease } = require('../../database/models')
const utils = require('../../utils')

module.exports = {

    predict: async (req, res) => {
        const file = req.file

        const allowedMimes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp'
        ]

        if (typeof file === 'undefined') return res.status(400).json(utils.apiError("Gambar tidak boleh kosong"))

        if (!allowedMimes.includes(file.mimetype)) return res.status(400).json(utils.apiError("Harus bertipe gambar (.png, .jpeg, .jpg, .webp)"))

        try {

            const image = sharp(file.path);
            const metadata = await image.metadata();

            if (metadata.channels !== 3) {
                fs.unlinkSync(file.path);
                return res.status(400).json(utils.apiError("Gambar harus dalam format RGB"));
            }

            const form = new FormData();
            form.append('file', fs.createReadStream(file.path));

            const response = await axios.post('http://localhost:8000/predict', form, {
                headers: {
                    ...form.getHeaders(),
                }
            })

            fs.unlinkSync(file.path)

            /* const data = {
                disease: response.data.class_name,
                confidence: response.data.prediction
            } */

            const disease = await Disease.findOne({
                where: {
                    name: response.data.class_name
                }
            })

            if (!disease) return res.status(404).json(utils.apiError("Tidak ada data"))

            const data = {
                name: response.data.class_name,
                confidence: response.data.prediction,
                caused: disease.caused,
                symtomps: disease.symtomps,
            }

            return res.status(200).json(utils.apiSuccess("Identifikasi berhasil dilakukan", data))
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("internal server error"))
        }

    }
}