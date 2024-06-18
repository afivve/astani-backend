const { body } = require("express-validator")

module.exports = {

    discussion: [
        body("title")
            .notEmpty().withMessage("Nama tidak boleh kosong")
            .isLength({ min: 4 }).withMessage("Terlalu pendek")
            .isString().withMessage("Nama harus berupa string"),
        body("question")
            .notEmpty().withMessage("Nama tidak boleh kosong")
            .isLength({ min: 4 }).withMessage("Terlalu pendek")
            .isString().withMessage("Nama harus berupa string"),
    ],

    likeDiscussion: [
        body("discussiondId")
            .notEmpty().withMessage("Discussion ID tidak boleh kosong")
    ],

    commentar: [
        body("commentar")
            .notEmpty().withMessage("Nama tidak boleh kosong")
            .isLength({ min: 4 }).withMessage("Terlalu pendek")
            .isString().withMessage("Nama harus berupa string"),
    ],

}