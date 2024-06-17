const express = require('express')
const controller = require('../controllers/profile/profile.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/profile.schema')
const { verifyToken } = require('../middlewares/verify.token')
const checkRole = require('../middlewares/check.role')
const multer = require('multer')()

const router = express.Router()

router.get('/profile', verifyToken, controller.me)
router.put('/profile', verifyToken, validate(schema.updateProfile), controller.updateProfile)
router.put('/profile/change-password', verifyToken, validate(schema.changePassword), controller.changePassword)
router.put('/profile/images', verifyToken, checkRole('user'), validate(schema.updateProfilePhoto), multer.single('photoProfile'), controller.updateProfilePhoto)

module.exports = router