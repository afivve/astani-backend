const express = require('express')
const controller = require('../controllers/notification/notification.controller')
const { verifyToken } = require('../middlewares/verify.token')

const router = express.Router()

router.get('/notifications', verifyToken, controller.getNotificationByUserId)
router.put('/notifications', verifyToken, controller.readNotificationByUserId)

module.exports = router