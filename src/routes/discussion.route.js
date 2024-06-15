const express = require('express')
const controllerDiscussion = require('../controllers/discussion/discussion.controller')
const controllerCommentar = require('../controllers/discussion/discussion.commentar.controller')
/* const validate = require('../middlewares/validation') */
/* const schema = require('../validations/auth.schema') */
const { verifyToken } = require('../middlewares/verify.token')
const multer = require('multer')()

const router = express.Router()

router.post('/discussions', verifyToken, multer.single("photoDiscussion"), controllerDiscussion.create)
router.put('/discussions/:id', verifyToken, multer.single("photoDiscussion"), controllerDiscussion.update)
router.get('/discussions/:id', controllerDiscussion.readById)
router.get('/discussions/', controllerDiscussion.readAll)
router.delete('/discussions/:id', verifyToken, controllerDiscussion.delete)


/* Commentar Route */
router.post('/discussions/:discussionId/commentar', verifyToken, multer.single("photoCommentar"), controllerCommentar.create)
router.put('/discussions/:discussionId/commentar/:id', verifyToken, multer.single("photoCommentar"), controllerCommentar.update)
router.delete('/discussions/:discussionId/commentar/:id', verifyToken, controllerCommentar.delete)

module.exports = router

