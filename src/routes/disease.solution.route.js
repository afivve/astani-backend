const express = require('express')
const controller = require('../controllers/disease/disease.solution.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/disease.schema')
const { verifyToken } = require('../middlewares/verify.token')
const checkRole = require('../middlewares/check.role')

const router = express.Router()

router.post('/disease/:diseaseId/disease-solution', validate(schema.diseaseSolution), verifyToken, checkRole('admin'), controller.create)
router.get('/disease/:diseaseId/disease-solution/', controller.readByIdDisease)
router.get('/disease/:diseaseId/disease-solution/:solutionId', controller.readByIdSolution)
router.put('/disease/:diseaseId/disease-solution/:solutionId', verifyToken, checkRole('admin'), controller.update)
router.delete('/disease/:diseaseId/disease-solution/:solutionId', verifyToken, checkRole('admin'), controller.delete)


module.exports = router