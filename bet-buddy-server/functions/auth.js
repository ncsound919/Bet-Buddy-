const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// Signup
router.post('/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Check if user already exists
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).send({ error: 'User already exists' })
    }
    
    // Hash password
    // const passwordHash = await bcrypt.hash(password, 10)
    
    // Create new user
    const user = new User({
      email,
      // passwordHash,
    })
    
    await user.save()
    
    // Generate JWT token
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: '7d',
    // })
    
    res.status(201).send({
      user: user.toJSON(),
      // token,
    })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

// Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Find user
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }
    
    // Verify password
    // const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    // if (!isValidPassword) {
    //   return res.status(401).send({ error: 'Invalid credentials' })
    // }
    
    // Update last login
    user.lastLogin = new Date()
    await user.save()
    
    // Generate JWT token
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: '7d',
    // })
    
    res.send({
      user: user.toJSON(),
      // token,
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Logout
router.post('/auth/logout', async (req, res) => {
  try {
    // Invalidate token (if using token blacklist)
    res.send({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get current user
router.get('/auth/me', async (req, res) => {
  try {
    // Get user from token
    // const userId = req.userId // Set by auth middleware
    // const user = await User.findById(userId)
    
    // if (!user) {
    //   return res.status(404).send({ error: 'User not found' })
    // }
    
    // res.send(user.toJSON())
    res.send({ message: 'Auth middleware not implemented' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = router
