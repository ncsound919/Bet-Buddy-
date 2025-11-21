// Input validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
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

export const validateBetFields = (bet) => {
  const errors = {}

  if (!bet.teams || bet.teams.trim() === '') {
    errors.teams = 'Teams are required'
  }

  if (!bet.odds || isNaN(bet.odds)) {
    errors.odds = 'Valid odds are required'
  }

  if (!bet.stake || isNaN(bet.stake) || Number(bet.stake) <= 0) {
    errors.stake = 'Valid stake amount is required'
  }

  if (!bet.type || bet.type.trim() === '') {
    errors.type = 'Bet type is required'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateOdds = (odds) => {
  // Accept American odds (e.g., -110, +150) or decimal odds (e.g., 1.91, 2.50)
  const americanOddsRegex = /^[+-]?\d+$/
  const decimalOddsRegex = /^\d+(\.\d+)?$/
  
  return americanOddsRegex.test(odds) || decimalOddsRegex.test(odds)
}
