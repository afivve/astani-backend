const axios = require('axios')
const FormData = require('form-data')
const sharp = require('sharp')

const { User, Disease, DiseaseSolution, PredictHistory, DiseaseLiteratur, DiseaseYoutube } = require('../../database/models')
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

            const getRandomNumberInRange = (min, max) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            const randomId = getRandomNumberInRange(1, 4);

            const diseases = await Disease.findOne({
                where: {
                    id: randomId
                },
                include: [
                    {
                        model: DiseaseSolution,
                        as: 'solutions'
                    },
                    {
                        model: DiseaseLiteratur,
                        as: 'literaturs'
                    },
                    {
                        model: DiseaseYoutube,
                        as: 'youtubes'
                    },
                ]
            });

            if (!diseases) {
                return res.status(404).json(utils.apiError("Tidak ada data"))
            }


            const randomConifendce = getRandomNumberInRange(50, 98);

            const history = await PredictHistory.create({
                imageUrl: uploadFile.url,
                imageFilename: uploadFile.name,
                userId: id,
                diseaseId: diseases.id,
                confidence: randomConifendce
            })

            const data = {
                name: diseases.name,
                confidence: randomConifendce,
                caused: diseases.caused,
                symtomps: diseases.symtomps,
                solutions: diseases.solutions,
                literaturs: diseases.literaturs,
                youtubes: diseases.youtubes
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