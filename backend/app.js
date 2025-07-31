const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const sessionRoutes = require('./routes/sessionRoutes')

const app = express()

app.use(cors())

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next()
  })
}

app.use('/api/auth', authRoutes)
app.use('/api', sessionRoutes)

app.get('/health', (req, res) => {
  res.json({
    message: 'Wellness Platform API is running',
    timestamp: new Date().toISOString()
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  })
})

module.exports = app
