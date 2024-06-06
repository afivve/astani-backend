const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')

module.exports = {

    predict: async (req, res) => {
        const file = req.file

        const allowedMimes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp'
        ]

        if (typeof file === 'undefined') return res.status(400).json("Gambar tidak boleh kosong")

        if (!allowedMimes.includes(file.mimetype)) return res.status(400).json("Harus bertipe gambar (.png, .jpeg, .jpg, .webp)")

        try {

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

            return res.status(200).json(response.data)
        } catch (error) {
            /* console.log(error); */
            return res.status(500).json("internal server error");
        }

    }
}