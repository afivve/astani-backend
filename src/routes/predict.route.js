const express = require('express')
const controller = require('../controllers/predict/predict.controller')
const multer = require('multer')
const { verifyToken } = require('../middlewares/verify.token')

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

router.post('/predict', upload.single('file'), verifyToken, controller.predict)

module.exports = router