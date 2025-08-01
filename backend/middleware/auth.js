const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const auth = async (req, res, next) => {
  try {
    const authHeader = req.get('authorization') || req.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token missing' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    req.user = user
    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' })
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Expired token' })
    }

    console.error('Auth error:', err)
    res.status(500).json({ error: 'Authentication error' })
  }
}

module.exports = auth
