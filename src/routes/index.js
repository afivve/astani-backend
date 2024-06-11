const express = require('express')
const predictRoute = require('./predict.route')
const predictHistoriesRoute = require('./predict.history.route')
const diseaseRoute = require('./disease.route')
const diseaseSolutionRoute = require('./disease.solution.route')
const authRoute = require('./auth.route')
const profileRoute = require('./profile.route')

const router = express.Router()

router.use("/auth", authRoute)
router.use(profileRoute)
router.use(diseaseSolutionRoute)
router.use(diseaseRoute)
router.use(predictHistoriesRoute)
router.use(predictRoute)

module.exports = router