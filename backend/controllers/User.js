const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ error: 'Email is already in use' })
    }

    const user = new User({ email, password })
    await user.save()

    const token = generateToken(user._id)

    res.status(201).json({
      data: {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      }
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    const valid = user && await user.comparePassword(password)

    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = generateToken(user._id)

    res.json({
      data: {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      }
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
}

const getCurrentUser = async (req, res) => {
  try {
    res.json({
      data: {
        user: {
          id: req.user._id,
          email: req.user.email
        }
      }
    })
  } catch (err) {
    console.error('Get user error:', err)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
}
