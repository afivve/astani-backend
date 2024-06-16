const express = require('express')
const controller = require('../controllers/disease/disease.literatur.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/disease.schema')
const { verifyToken } = require('../middlewares/verify.token')
const checkRole = require('../middlewares/check.role')

const router = express.Router()

router.post('/disease/:diseaseId/disease-literatur', validate(schema.diseaseLiteratur), verifyToken, checkRole('admin'), controller.create)
router.get('/disease/:diseaseId/disease-literatur/', controller.readByIdDisease)
router.get('/disease/:diseaseId/disease-literatur/:literaturId', controller.readByIdLiteratur)
router.put('/disease/:diseaseId/disease-literatur/:literaturId', verifyToken, checkRole('admin'), controller.update)
router.delete('/disease/:diseaseId/disease-literatur/:literaturId', verifyToken, checkRole('admin'), controller.delete)

module.exports = router