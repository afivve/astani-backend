const express = require('express')
const controller = require('../controllers/dashboard/dashboard.controller')
const { verifyToken } = require('../middlewares/verify.token')

const router = express.Router()

router.get('/dashboard/result-precentage', /* verifyToken, */ controller.precentageResultPredict)
router.get('/dashboard/total-user', /* verifyToken, */ controller.totalUser)
router.get('/dashboard/last-seven-user', /* verifyToken, */ controller.lastSevenDaysActive)
router.get('/dashboard/most-active-discussion', /* verifyToken, */ controller.mostActiveDiscussion)


module.exports = router