const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const sharp = require('sharp')

const { User, Disease, DiseaseSolution, PredictHistory } = require('../../database/models')
const utils = require('../../utils')
const imageKitFile = require('../../utils/imageKitFile')

module.exports = {

    predict: async (req, res) => {
        try {
            const { id } = res.user
            const file = req.file

            const allowedMimes = [
                'image/png',
                'image/jpeg',
                'image/jpg',
                'image/webp'
            ];

            if (!file) {
                return res.status(400).json(utils.apiError("Gambar tidak boleh kosong"));
            }

            if (!allowedMimes.includes(file.mimetype)) {
                /*  fs.unlinkSync(file.path); */
                return res.status(400).json(utils.apiError("Harus bertipe gambar (.png, .jpeg, .jpg, .webp)"));
            }

            // Validasi format RGB
            const image = sharp(file.buffer);
            const metadata = await image.metadata();
            if (metadata.channels !== 3) {
                /*  fs.unlinkSync(file.path); */
                return res.status(400).json(utils.apiError("Gambar harus dalam format RGB"));
            }

            // Membuat form-data untuk prediksi
            const form = new FormData();
            form.append('file', file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype
            });

            const response = await axios.post('http://localhost:8000/predict', form, {
                headers: {
                    ...form.getHeaders(),
                }
            });

            // Menghapus file lokal setelah prediksi
            /*  fs.unlinkSync(file.path); */

            if (response && response.data && response.data.class_name) {
                // Unggah file ke ImageKit setelah prediksi berhasil
                const uploadFile = await imageKitFile.upload(file);

                if (!uploadFile) {
                    return res.status(500).json(utils.apiError("Internal server error"));
                }

                const diseases = await Disease.findOne({
                    where: {
                        name: response.data.class_name
                    },
                    include: [{
                        model: DiseaseSolution,
                        as: 'solutions'
                    }]
                });

                if (!diseases) {
                    return res.status(404).json(utils.apiError("Tidak ada data"));
                }

                const history = await PredictHistory.create({
                    imageUrl: uploadFile.url,
                    imageFilename: uploadFile.name,
                    userId: id,
                    diseaseId: diseases.id
                })

                const data = {
                    name: diseases.name,
                    confidence: response.data.prediction,
                    caused: diseases.caused,
                    symtomps: diseases.symtomps,
                    solutions: diseases.solutions
                };

                if (history) {
                    return res.status(200).json(utils.apiSuccess("Identifikasi berhasil dilakukan", data));
                }
            }

            return res.status(500).json(utils.apiError("Internal server error"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"));
        }
    }
}