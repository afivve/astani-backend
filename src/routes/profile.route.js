const express = require('express')
const controller = require('../controllers/profile/profile.controller')
const { verifyToken } = require('../middlewares/verify.token')

const router = express.Router()

router.get('/profile', verifyToken, controller.me)

module.exports = router