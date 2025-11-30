const express = require('express')
const cors = require('cors')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import routes
const authRoutes = require('./auth')
const betsRoutes = require('./bets')
const insightsRoutes = require('./insights')
const ocrRoutes = require('./ocr')
const notificationsRoutes = require('./notifications')

// Use routes
app.use('/api', authRoutes)
app.use('/api', betsRoutes)
app.use('/api', insightsRoutes)
app.use('/api', ocrRoutes)
app.use('/api', notificationsRoutes)

// Health check
app.get('/health', (req, res) => {
  res.send({ status: 'ok', message: 'Bet Buddy API is running' })
})

// Root endpoint
app.get('/', (req, res) => {
  res.send({
    message: 'Bet Buddy API',
    version: '1.0.0',
    endpoints: [
      'POST /api/auth/signup',
      'POST /api/auth/login',
      'POST /api/auth/logout',
      'GET /api/auth/me',
      'POST /api/bet',
      'GET /api/bets/:userId',
      'GET /api/bet/:betId',
      'PUT /api/bet/:betId',
      'DELETE /api/bet/:betId',
      'GET /api/insights/:userId',
      'POST /api/insights/:userId/refresh',
      'POST /api/ocr/upload',
      'POST /api/ocr/create-bet',
      'POST /api/notifications/send',
      'POST /api/notifications/subscribe',
      'POST /api/notifications/unsubscribe',
    ],
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: 'Something went wrong!' })
})

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

// Export for Firebase Cloud Functions or other serverless platforms
module.exports = app
