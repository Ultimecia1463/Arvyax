const express = require('express')
const auth = require('../middleware/auth')
const {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession,
  deleteSession
} = require('../controllers/sessionController')

const router = express.Router()

router.get('/sessions/public', getPublicSessions)
router.get('/sessions/my', auth, getMySessions)
router.get('/sessions/my/:id', auth, getSessionById)
router.post('/sessions/draft', auth, saveDraft)
router.post('/sessions/publish', auth, publishSession)
router.delete('/sessions/:id', auth, deleteSession)

module.exports = router