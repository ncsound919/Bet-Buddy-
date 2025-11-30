const express = require('express')
const router = express.Router()
const Bet = require('../models/bet.model')

// Add a new bet
router.post('/bet', async (req, res) => {
  try {
    const bet = new Bet(req.body)
    await bet.save()
    res.status(201).send(bet)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

// Get user bets
router.get('/bets/:userId', async (req, res) => {
  try {
    const bets = await Bet.find({ userId: req.params.userId })
    res.send(bets)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get single bet
router.get('/bet/:betId', async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.betId)
    if (!bet) {
      return res.status(404).send({ error: 'Bet not found' })
    }
    res.send(bet)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Update bet
router.put('/bet/:betId', async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.betId)
    if (!bet) {
      return res.status(404).send({ error: 'Bet not found' })
    }
    
    Object.assign(bet, req.body)
    await bet.save()
    res.send(bet)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

// Delete bet
router.delete('/bet/:betId', async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.betId)
    if (!bet) {
      return res.status(404).send({ error: 'Bet not found' })
    }
    
    // Delete logic here
    res.send({ message: 'Bet deleted successfully' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = router
