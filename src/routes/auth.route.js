const express = require('express')
const controller = require('../controllers/auth/auth.controller')

const router = express.Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/verification-user', controller.verification)

module.exports = router