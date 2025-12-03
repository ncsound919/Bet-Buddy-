/**
 * Validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters',
    }
  }

  return {
    isValid: true,
    message: 'Password is valid',
  }
}

/**
 * Validate bet entry data
 * @param {Object} betData - Bet data to validate
 * @returns {Object} - Validation result with isValid and error
 */
export const validateBetEntry = (betData) => {
  const { betType, teams, odds, stake } = betData

  // Validate bet type
  const validBetTypes = ['moneyline', 'spread', 'parlay']
  if (!betType || !validBetTypes.includes(betType.toLowerCase())) {
    return {
      isValid: false,
      error: `Bet type must be one of: ${validBetTypes.join(', ')}`,
    }
  }

  // Validate teams
  if (!teams || teams.length === 0) {
    return {
      isValid: false,
      error: 'At least one team is required',
    }
  }

  // Validate odds
  if (!odds || isNaN(odds) || odds <= 0) {
    return {
      isValid: false,
      error: 'Odds must be a positive number',
    }
  }

  // Validate stake
  if (!stake || isNaN(stake) || stake <= 0) {
    return {
      isValid: false,
      error: 'Stake must be a positive number',
    }
  }

  return {
    isValid: true,
    error: null,
  }
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether phone is valid
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input
  }

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}
