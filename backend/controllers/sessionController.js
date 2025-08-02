const Session = require('../models/session.js')

const safeArray = (value) => (Array.isArray(value) ? value : [])

const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' })
      .populate('user_id', 'email')
      .sort({ createdAt: -1 })

    res.json({ data: { sessions } })
  } catch (err) {
    console.error('Error loading public sessions:', err)
    res.status(500).json({ error: 'Failed to retrieve sessions' })
  }
}

const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user._id })
      .populate('user_id', 'email')
      .sort({ updatedAt: -1 })

    res.json({ data: { sessions } })
  } catch (err) {
    console.error('Error loading user sessions:', err)
    res.status(500).json({ error: 'Failed to fetch sessions' })
  }
}

const getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user._id
    }).populate('user_id', 'email')

    if (!session) {
      return res.status(404).json({ error: 'Session not found' })
    }

    res.json({ data: { session } })
  } catch (err) {
    console.error('Error loading session:', err)
    res.status(500).json({ error: 'Failed to retrieve session' })
  }
}

const saveDraft = async (req, res) => {
  try {
    const { id, title, tags, video_url, description, difficulty } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const draftData = {
      title: title.trim(),
      tags: safeArray(tags),
      video_url: video_url || '',
      description: description || '',
      difficulty: difficulty || 'Beginner',
      status: 'draft'
    }

    let session

    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user._id },
        draftData,
        { new: true, runValidators: true }
      ).populate('user_id', 'email')

      if (!session) {
        return res.status(404).json({ error: 'Session not found' })
      }
    } else {
      session = new Session({ ...draftData, user_id: req.user._id })
      await session.save()
      await session.populate('user_id', 'email')
    }

    res.json({ data: { session } })
  } catch (err) {
    console.error('Error saving draft:', err)
    res.status(500).json({ error: 'Failed to save draft' })
  }
}

const publishSession = async (req, res) => {
  try {
    const { id, title, tags, video_url, description, difficulty } = req.body

    if (!title?.trim()) {
      return res.status(400).json({ error: 'Title is required' })
    }

    if (!video_url?.trim()) {
      return res.status(400).json({ error: 'Video URL is required' })
    }

    if (!description?.trim()) {
      return res.status(400).json({ error: 'Description is required' })
    }

    const publishData = {
      title: title.trim(),
      tags: safeArray(tags),
      video_url: video_url.trim(),
      description: description.trim(),
      difficulty: difficulty || 'Beginner',
      status: 'published'
    }

    let session

    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user._id },
        publishData,
        { new: true, runValidators: true }
      ).populate('user_id', 'email')

      if (!session) {
        return res.status(404).json({ error: 'Session not found' })
      }
    } else {
      session = new Session({ ...publishData, user_id: req.user._id })
      await session.save()
      await session.populate('user_id', 'email')
    }

    res.json({ data: { session } })
  } catch (err) {
    console.error('Error publishing session:', err)
    res.status(500).json({ error: 'Failed to publish session' })
  }
}

const deleteSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id
    })

    if (!session) {
      return res.status(404).json({ error: 'Session not found' })
    }

    res.json({ data: { success: true, message: 'Session removed' } })
  } catch (err) {
    console.error('Error deleting session:', err)
    res.status(500).json({ error: 'Failed to delete session' })
  }
}

module.exports = {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession,
  deleteSession
}