const express = require('express')
const controller = require('../controllers/auth/auth.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/auth.schema')
const { verifyToken } = require('../middlewares/verify.token')

const router = express.Router()

router.post('/register', validate(schema.register), controller.register)
router.post('/login', validate(schema.login), controller.login)
router.post('/verify-user', validate(schema.verifyUser), controller.verification)
router.post('/resend-otp', validate(schema.resendOtp), controller.resendOtp)
router.post('/change-password', verifyToken, validate(schema.changePassword), controller.changePassword)



module.exports = router