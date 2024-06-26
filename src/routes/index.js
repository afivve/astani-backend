const express = require('express')
const predictRoute = require('./predict.route')
const predictHistoriesRoute = require('./predict.history.route')
const diseaseRoute = require('./disease.route')
const diseaseSolutionRoute = require('./disease.solution.route')
const diseaseLiteraturRoute = require('./disease.literatur.route')
const diseaseYoutubeRoute = require('./disease.youtube.route')
const authRoute = require('./auth.route')
const profileRoute = require('./profile.route')
const discussionRoute = require('./discussion.route')
const notificationRoute = require('./notification.route')
const dashboardRoute = require('./dashboard.route')

const router = express.Router()

router.use("/auth", authRoute)
router.use(dashboardRoute)
router.use(notificationRoute)
router.use(discussionRoute)
router.use(profileRoute)
router.use(diseaseYoutubeRoute)
router.use(diseaseLiteraturRoute)
router.use(diseaseSolutionRoute)
router.use(diseaseRoute)
router.use(predictHistoriesRoute)
router.use(predictRoute)

module.exports = router