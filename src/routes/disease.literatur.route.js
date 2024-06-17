const express = require('express')
const controller = require('../controllers/disease/disease.literatur.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/disease.schema')
const { verifyToken } = require('../middlewares/verify.token')
const checkRole = require('../middlewares/check.role')

const router = express.Router()

router.post('/disease/:diseaseId/disease-literatur', verifyToken, checkRole('admin'), validate(schema.diseaseLiteratur), controller.create)
router.get('/disease/:diseaseId/disease-literatur/', controller.readByIdDisease)
router.get('/disease-literatur/:literaturId', controller.readByIdLiteratur)
router.put('/disease-literatur/:literaturId', verifyToken, checkRole('admin'), validate(schema.diseaseLiteratur), controller.update)
router.delete('/disease-literatur/:literaturId', verifyToken, checkRole('admin'), controller.delete)

module.exports = router