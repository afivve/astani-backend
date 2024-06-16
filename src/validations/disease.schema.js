const { body } = require("express-validator")

module.exports = {
    disease: [
        body("name")
            .notEmpty().withMessage("Nama Penyakit tidak boleh kosong"),
        body("caused")
            .notEmpty().withMessage("Data Penyebab tidak boleh kosong"),
        body("symptomps")
            .notEmpty().withMessage("Data Gejala tidak boleh kosong"),
    ],

    diseaseSolution: [
        body("action")
            .notEmpty().withMessage("Data Tindakan Pencegahan tidak boleh kosong"),
    ],

    diseaseLiteratur: [
        body("link")
            .notEmpty().withMessage("Link Litertur tidak boleh kosong"),
    ],

    diseaseYoutube: [
        body("link")
            .notEmpty().withMessage("Link Youtube tidak boleh kosong"),
    ],
}
