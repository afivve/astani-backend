const axios = require('axios')
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
                return res.status(400).json(utils.apiError("Gambar tidak boleh kosong"))
            }

            if (!allowedMimes.includes(file.mimetype)) {

                return res.status(400).json(utils.apiError("Harus bertipe gambar (.png, .jpeg, .jpg, .webp)"))
            }

            const image = sharp(file.buffer);
            const metadata = await image.metadata();
            if (metadata.channels !== 3) {

                return res.status(400).json(utils.apiError("Gambar harus dalam format RGB"))
            }

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


            if (response && response.data && response.data.class_name) {

                const uploadFile = await imageKitFile.upload(file);

                if (!uploadFile) {
                    return res.status(500).json(utils.apiError("Internal server error"))
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
                    return res.status(404).json(utils.apiError("Tidak ada data"))
                }

                const history = await PredictHistory.create({
                    imageUrl: uploadFile.url,
                    imageFilename: uploadFile.name,
                    userId: id,
                    diseaseId: diseases.id,
                    confidence: response.data.prediction
                })

                const data = {
                    name: diseases.name,
                    confidence: response.data.prediction,
                    caused: diseases.caused,
                    symtomps: diseases.symtomps,
                    solutions: diseases.solutions
                };

                if (history) {
                    return res.status(200).json(utils.apiSuccess("Identifikasi berhasil dilakukan", data))
                }
            }

            return res.status(500).json(utils.apiError("Internal server error"))
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    predictDummy: async (req, res) => {
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
                return res.status(400).json(utils.apiError("Gambar tidak boleh kosong"))
            }

            if (!allowedMimes.includes(file.mimetype)) {

                return res.status(400).json(utils.apiError("Harus bertipe gambar (.png, .jpeg, .jpg, .webp)"))
            }

            const uploadFile = await imageKitFile.upload(file);

            if (!uploadFile) {
                return res.status(500).json(utils.apiError("Internal server error"))
            }

            const diseaseId = 2

            const history = await PredictHistory.create({
                imageUrl: uploadFile.url,
                imageFilename: uploadFile.name,
                userId: id,
                diseaseId: diseaseId,
                confidence: 90
            })

            const data = {
                name: "Hawar Daun Bakteri",
                confidence: 90,
                caused: "Virus Xanthomonas oryzae pv. oryzae",
                symtomps: "Gejala awal penyakit HDB terlihat pada tepi daun yang berubah menjadi",
                solutions: [
                    {
                        solutionId: 1,
                        action: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, voluptas!"
                    },
                    {
                        solutionId: 2,
                        action: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, voluptas!"
                    },
                    {
                        solutionId: 3,
                        action: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, voluptas!"
                    },
                    {
                        solutionId: 4,
                        action: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, voluptas!"
                    },
                ]
            };

            if (history) {
                return res.status(200).json(utils.apiSuccess("Identifikasi berhasil dilakukan", data))

            }

            return res.status(500).json(utils.apiError("Internal server error"))
        } catch (error) {
            console.log(error);
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    }
}