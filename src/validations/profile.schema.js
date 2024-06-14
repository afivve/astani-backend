const { body } = require("express-validator")

module.exports = {
    updateProfile: [
        body("name")
            .notEmpty().withMessage("Nama tidak boleh kosong")
            .matches(/^[a-zA-Z\s'-]+$/).withMessage("Nama tidak boleh mengandung karakter spesial")
            .isString().withMessage("Nama harus berupa string"),
        body("phone")
            .notEmpty().withMessage("Nomor telepon tidak boleh kosong")
            .isInt().withMessage("Nomor telepon tidak valid"),
        body("age")
            .notEmpty().withMessage("Umur tidak boleh kosong")
            .isInt().withMessage("Umur tidak valid"),
        body("gender")
            .notEmpty().withMessage("Jenis kelamin tidak boleh kosong")
            .matches(/^[a-zA-Z\s'-]+$/).withMessage("Jenis kelamin tidak boleh mengandung karakter spesial")
            .isString().withMessage("Jenis kelamin harus berupa string"),
        body("province")
            .notEmpty().withMessage("Provinsi tidak boleh kosong")
            .matches(/^[a-zA-Z\s'-]+$/).withMessage("Provinsi tidak boleh mengandung karakter spesial")
            .isString().withMessage("Provinsi harus berupa string"),
        body("city")
            .notEmpty().withMessage("Kabupaten / Kota tidak boleh kosong")
            .matches(/^[a-zA-Z\s'-]+$/).withMessage("Kabupaten / Kota tidak boleh mengandung karakter spesial")
            .isString().withMessage("Kabupaten / Kota harus berupa string"),
    ],

    updateProfilePhoto: [
        body("photoProfile")
            .optional({ values: null })
    ],

    changePassword: [
        body("newPassword")
            .notEmpty().withMessage("Password baru tidak boleh kosong")
            .isLength({ min: 8 }).withMessage("Password baru minimal 8 karakter")
            .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/).withMessage("Password baru harus mengandung setidaknya satu huruf kapital dan satu angka"),
        body("confPassword")
            .notEmpty().withMessage("Konfirmasi password baru tidak boleh kosong")
            .custom((confPassword, { req }) => {
                if (confPassword !== req.body.newPassword) {
                    throw new Error("Password baru dan konfirmasi password baru tidak cocok");
                }
                return true;
            })
    ],
}