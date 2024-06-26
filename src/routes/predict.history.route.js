const express = require('express')
const controller = require('../controllers/predict/predict.history.controller')
const { verifyToken } = require('../middlewares/verify.token')
const checkRole = require('../middlewares/check.role')

const router = express.Router()

router.get('/predict-history', verifyToken, controller.readByIdUser)
router.get('/predict-history/:historyId', verifyToken, controller.readDetailHistoryByIdUser)
router.get('/predict-histories', verifyToken, checkRole('admin'), controller.readAll)

module.exports = router