const express = require('express')
const controller = require('../controllers/dashboard/dashboard.controller')
const { verifyToken } = require('../middlewares/verify.token')
const checkRole = require('../middlewares/check.role')

const router = express.Router()

router.get('/dashboard/result-precentage', verifyToken, checkRole('admin'), controller.precentageResultPredict)
router.get('/dashboard/total-user', verifyToken, checkRole('admin'), controller.totalUser)
router.get('/dashboard/total-predict', verifyToken, checkRole('admin'), controller.totalPredict)
router.get('/dashboard/last-seven-user', verifyToken, checkRole('admin'), controller.lastSevenDaysActive)
router.get('/dashboard/most-active-discussion', verifyToken, checkRole('user'), controller.mostActiveDiscussion)

module.exports = router