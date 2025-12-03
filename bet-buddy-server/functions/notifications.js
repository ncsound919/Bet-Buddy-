const express = require('express')
const router = express.Router()

// Send notification
router.post('/notifications/send', async (req, res) => {
  try {
    const { userId, title, message, type } = req.body
    
    // This is where you would integrate with a notification service
    // Examples: Firebase Cloud Messaging, OneSignal, Push.js
    
    console.log(`Sending notification to user ${userId}:`, { title, message, type })
    
    res.send({
      success: true,
      message: 'Notification sent successfully',
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Subscribe to notifications
router.post('/notifications/subscribe', async (req, res) => {
  try {
    const { userId, deviceToken, platform } = req.body
    
    // Store device token for future notifications
    console.log(`Subscribing device for user ${userId}:`, { deviceToken, platform })
    
    res.send({
      success: true,
      message: 'Subscribed to notifications',
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Unsubscribe from notifications
router.post('/notifications/unsubscribe', async (req, res) => {
  try {
    const { userId, deviceToken } = req.body
    
    // Remove device token
    console.log(`Unsubscribing device for user ${userId}:`, { deviceToken })
    
    res.send({
      success: true,
      message: 'Unsubscribed from notifications',
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Notification types
const NOTIFICATION_TYPES = {
  BET_SETTLED: 'bet_settled',
  WIN_STREAK: 'win_streak',
  NEW_INSIGHT: 'new_insight',
  REMINDER: 'reminder',
  SUBSCRIPTION: 'subscription',
}

// Helper function to send bet settled notification
async function sendBetSettledNotification(userId, bet) {
  const title = bet.status === 'won' ? 'Bet Won! 🎉' : 'Bet Settled'
  const message = `Your bet on ${bet.teams} has been settled`
  
  // Send notification
  console.log(`Sending bet settled notification to ${userId}`)
}

// Helper function to send win streak notification
async function sendWinStreakNotification(userId, streakCount) {
  const title = 'Hot Streak! 🔥'
  const message = `You're on a ${streakCount} win streak!`
  
  // Send notification
  console.log(`Sending win streak notification to ${userId}`)
}

module.exports = router
module.exports.NOTIFICATION_TYPES = NOTIFICATION_TYPES
module.exports.sendBetSettledNotification = sendBetSettledNotification
module.exports.sendWinStreakNotification = sendWinStreakNotification
