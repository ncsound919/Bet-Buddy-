const express = require('express')
const router = express.Router()
const Insight = require('../models/insight.model')
const Bet = require('../models/bet.model')

// Get insights for a user
router.get('/insights/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    
    // Get user's bets
    const bets = await Bet.find({ userId })
    
    // Generate insights
    const insights = Insight.generateInsights(bets)
    
    res.send(insights.map(insight => insight.toJSON()))
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get specific insight
router.get('/insight/:insightId', async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.insightId)
    if (!insight) {
      return res.status(404).send({ error: 'Insight not found' })
    }
    res.send(insight.toJSON())
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Refresh insights for a user
router.post('/insights/:userId/refresh', async (req, res) => {
  try {
    const userId = req.params.userId
    
    // Get user's bets
    const bets = await Bet.find({ userId })
    
    // Generate new insights
    const insights = Insight.generateInsights(bets)
    
    // Save insights to database
    // In a real implementation, you might want to clear old insights first
    // await Promise.all(insights.map(insight => insight.save()))
    
    res.send({
      message: 'Insights refreshed',
      insights: insights.map(insight => insight.toJSON()),
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = router
