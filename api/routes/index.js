const express = require('express')
const predictRoute = require('./predict.route')

const router = express.Router()

router.use(predictRoute)

module.exports = router