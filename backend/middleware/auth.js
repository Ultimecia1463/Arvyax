const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
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
      return res.status(401).json({ error: 'Token has expired' })
    }

    console.error('Auth error:', err)
    res.status(500).json({ error: 'Authentication failed' })
  }
}

module.exports = auth
