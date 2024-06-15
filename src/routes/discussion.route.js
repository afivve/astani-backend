const express = require('express')
const controllerDiscussion = require('../controllers/discussion/discussion.controller')
const controllerCommentar = require('../controllers/discussion/discussion.commentar.controller')
/* const validate = require('../middlewares/validation') */
/* const schema = require('../validations/auth.schema') */
const { verifyToken } = require('../middlewares/verify.token')
const multer = require('multer')()

const router = express.Router()

router.post('/discussions', verifyToken, multer.single("photoDiscussion"), controllerDiscussion.create)
router.get('/discussions/:id', controllerDiscussion.readById)
router.get('/discussions/', controllerDiscussion.readAll)


/* Commentar Route */
router.post('/discussions/:discussionId/commentar', verifyToken, multer.single("photoCommentar"), controllerCommentar.create)

module.exports = router

