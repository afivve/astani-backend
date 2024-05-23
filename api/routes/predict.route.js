const express = require('express')
const controller = require('../controllers/predict.controller')
const multer = require('multer')({ dest: '.temp/' })

const router = express.Router()

router.post('/predict', multer.single('file'), controller.predict)

module.exports = router