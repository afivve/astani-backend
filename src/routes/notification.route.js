const express = require('express')
const controller = require('../controllers/notification/notification.controller')
const { verifyToken } = require('../middlewares/verify.token')

const router = express.Router()

router.put('/notifications', verifyToken, controller.readNotificationByUserId)

module.exports = router