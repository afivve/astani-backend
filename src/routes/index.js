const express = require('express')
// const predictRoute = require('./predict.route')
const authRoute = require('./auth.route')

const router = express.Router()

router.use(authRoute)
// router.use(predictRoute)

module.exports = router