const express = require('express')
const predictRoute = require('./predict.route')
const diseaseRoute = require('./disease.route')
const authRoute = require('./auth.route')
const profileRoute = require('./profile.route')

const router = express.Router()

router.use("/auth", authRoute)
router.use(profileRoute)
router.use(diseaseRoute)
router.use(predictRoute)

module.exports = router