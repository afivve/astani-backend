const express = require('express')
const controller = require('../controllers/disease/disease.solution.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/disease.schema')
const { verifyToken } = require('../middlewares/verify.token')
const checkRole = require('../middlewares/check.role')

const router = express.Router()

router.post('/disease/:diseaseId/disease-solution', verifyToken, checkRole('admin'), validate(schema.diseaseSolution), controller.create)
router.get('/disease/:diseaseId/disease-solution/', controller.readByIdDisease)
router.get('/disease-solution/:solutionId', controller.readByIdSolution)
router.put('/disease-solution/:solutionId', verifyToken, checkRole('admin'), validate(schema.diseaseSolution), controller.update)
router.delete('/disease-solution/:solutionId', verifyToken, checkRole('admin'), controller.delete)


module.exports = router