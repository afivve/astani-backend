const express = require('express')
const predictRoute = require('./predict.route')
const predictHistoriesRoute = require('./predict.history.route')
const diseaseRoute = require('./disease.route')
const diseaseSolutionRoute = require('./disease.solution.route')
const diseaseLiteraturRoute = require('./disease.literatur.route')
const authRoute = require('./auth.route')
const profileRoute = require('./profile.route')
const discussionRoute = require('./discussion.route')
const notificationRoute = require('./notification.route')

const router = express.Router()

router.use("/auth", authRoute)
router.use(notificationRoute)
router.use(discussionRoute)
router.use(profileRoute)
router.use(diseaseLiteraturRoute)
router.use(diseaseSolutionRoute)
router.use(diseaseRoute)
router.use(predictHistoriesRoute)
router.use(predictRoute)

module.exports = router