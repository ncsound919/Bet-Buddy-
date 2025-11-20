// Server-side validation utilities

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  if (typeof password !== 'string') {
    return { valid: false, message: 'Password must be a string' }
  }
  
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' }
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' }
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' }
  }
  
  return { valid: true, message: '' }
}

const validateBet = (betData) => {
  const errors = {}

  if (!betData.userId) {
    errors.userId = 'User ID is required'
  }

  if (!betData.teams || betData.teams.trim() === '') {
    errors.teams = 'Teams are required'
  }

  if (!betData.odds || isNaN(betData.odds)) {
    errors.odds = 'Valid odds are required'
  }

  if (!betData.stake || isNaN(betData.stake) || Number(betData.stake) <= 0) {
    errors.stake = 'Valid stake amount is required'
  }

  if (!betData.type || betData.type.trim() === '') {
    errors.type = 'Bet type is required'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input
  }
  
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim()
}

const validateObjectId = (id) => {
  // For MongoDB ObjectId or Firestore document ID
  const objectIdRegex = /^[a-zA-Z0-9_-]+$/
  return objectIdRegex.test(id) && id.length >= 10
}

module.exports = {
  validateEmail,
  validatePassword,
  validateBet,
  sanitizeInput,
  validateObjectId,
}
