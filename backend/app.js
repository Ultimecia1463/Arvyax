const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const sessionRoutes = require('./routes/sessionRoutes')

const app = express()

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use(express.static('dist'))

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use('/api/auth', authRoutes)
app.use('/api', sessionRoutes)

app.get('/health', (req, res) => {
  res.json({
    message: 'Arvyax API is running',
    timestamp: new Date().toISOString()
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res ,next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  })
})

module.exports = app
