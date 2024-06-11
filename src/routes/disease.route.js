const express = require('express')
const controller = require('../controllers/disease/disease.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/disease.schema')
/* const { verifyToken } = require('../middlewares/verify.token') */

const router = express.Router()

router.post('/disease', validate(schema.disease), controller.create)
router.get('/disease', controller.readAll)
router.get('/disease/:id', controller.readById)
router.put('/disease/:id', controller.update)
router.delete('/disease/:id', controller.delete)

module.exports = router