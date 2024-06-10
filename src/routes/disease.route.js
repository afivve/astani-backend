const express = require('express')
const controller = require('../controllers/disease/disease.controller')
/* const { verifyToken } = require('../middlewares/verify.token') */

const router = express.Router()

router.post('/disease', controller.create)
router.get('/disease', controller.readAll)
router.get('/disease/:id', controller.readById)
router.put('/disease/:id', controller.update)
router.delete('/disease/:id', controller.delete)

module.exports = router