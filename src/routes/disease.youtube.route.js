const express = require('express')
const controller = require('../controllers/disease/disease.youtube.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/disease.schema')
const { verifyToken } = require('../middlewares/verify.token')
const checkRole = require('../middlewares/check.role')

const router = express.Router()

router.post('/disease/:diseaseId/disease-youtube', validate(schema.diseaseYoutube), verifyToken, checkRole('admin'), controller.create)
router.get('/disease/:diseaseId/disease-youtube/', controller.readByIdDisease)
router.get('/disease/:diseaseId/disease-youtube/:youtubeId', controller.readByIdYoutube)
router.put('/disease/:diseaseId/disease-youtube/:youtubeId', verifyToken, checkRole('admin'), controller.update)
router.delete('/disease/:diseaseId/disease-youtube/:youtubeId', verifyToken, checkRole('admin'), controller.delete)

module.exports = router