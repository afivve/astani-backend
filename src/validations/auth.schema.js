const { body } = require("express-validator")

module.exports = {
    login: [
        body("email")
            .notEmpty().withMessage("Email tidak boleh kosong")
            .isEmail().withMessage("Format email tidak valid"),
        body("password")
            .notEmpty().withMessage("Password tidak boleh kosong")
            .isLength({ min: 8 }).withMessage("Password minimal 8 karakter")
            .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/).withMessage("Password harus mengandung setidaknya satu huruf kapital dan satu angka")
            .isString().withMessage("Password harus berupa string"),
    ],

    verifyUser: [
        body("email")
            .notEmpty().withMessage("Email tidak boleh kosong")
            .isEmail().withMessage("Format email tidak valid"),
        body("otp")
            .notEmpty().withMessage("Otp tidak boleh kosong")
            .isLength({ min: 6, max: 6 }).withMessage("Otp berisi 6 angka")
            .isString().withMessage("Otp harus berupa string"),
    ],

    resendOtp: [
        body("email")
            .notEmpty().withMessage("Email tidak boleh kosong")
            .isEmail().withMessage("Format email tidak valid"),
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