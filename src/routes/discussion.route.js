const express = require('express')
const controllerDiscussion = require('../controllers/discussion/discussion.controller')
const controllerCommentar = require('../controllers/discussion/discussion.commentar.controller')
const validate = require('../middlewares/validation')
const schema = require('../validations/discussion.schema')
const { verifyToken } = require('../middlewares/verify.token')
const multer = require('multer')()

const router = express.Router()

router.post('/discussions', multer.single("photoDiscussion"), verifyToken, validate(schema.discussion), controllerDiscussion.create)
router.put('/discussions/:id', multer.single("photoDiscussion"), verifyToken, validate(schema.discussion), controllerDiscussion.update)
router.get('/discussions/:id', controllerDiscussion.readById)
router.get('/discussions/', controllerDiscussion.readAll)
router.delete('/discussions/:id', verifyToken, controllerDiscussion.delete)


/* Commentar Route */
router.post('/discussions/:discussionId/commentar', verifyToken, multer.single("photoCommentar"), validate(schema.commentar), controllerCommentar.create)
router.put('/discussions/:discussionId/commentar/:id', verifyToken, multer.single("photoCommentar"), validate(schema.commentar), controllerCommentar.update)
router.delete('/discussions/:discussionId/commentar/:id', verifyToken, controllerCommentar.delete)

module.exports = router

