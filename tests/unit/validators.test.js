import {
  validateEmail,
  validatePassword,
  validateBetEntry,
  validatePhone,
  sanitizeInput,
} from '../../src/utils/validators'

describe('validators', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should accept passwords with 6 or more characters', () => {
      const result = validatePassword('password123')
      expect(result.isValid).toBe(true)
    })

    it('should reject passwords shorter than 6 characters', () => {
      const result = validatePassword('12345')
      expect(result.isValid).toBe(false)
      expect(result.message).toContain('at least 6 characters')
    })
  })

  describe('validateBetEntry', () => {
    it('should validate correct bet entry', () => {
      const betData = {
        betType: 'moneyline',
        teams: ['Team A', 'Team B'],
        odds: 2.5,
        stake: 50,
      }
      const result = validateBetEntry(betData)
      expect(result.isValid).toBe(true)
      expect(result.error).toBeNull()
    })

    it('should reject invalid bet type', () => {
      const betData = {
        betType: 'invalid',
        teams: ['Team A'],
        odds: 2.5,
        stake: 50,
      }
      const result = validateBetEntry(betData)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Bet type must be')
    })

    it('should reject missing teams', () => {
      const betData = {
        betType: 'moneyline',
        teams: [],
        odds: 2.5,
        stake: 50,
      }
      const result = validateBetEntry(betData)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('team is required')
    })

    it('should reject invalid odds', () => {
      const betData = {
        betType: 'moneyline',
        teams: ['Team A'],
        odds: -1,
        stake: 50,
      }
      const result = validateBetEntry(betData)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Odds')
    })

    it('should reject invalid stake', () => {
      const betData = {
        betType: 'moneyline',
        teams: ['Team A'],
        odds: 2.5,
        stake: 0,
      }
      const result = validateBetEntry(betData)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Stake')
    })
  })

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      expect(validatePhone('+1234567890')).toBe(true)
      expect(validatePhone('123-456-7890')).toBe(true)
      expect(validatePhone('(123) 456-7890')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('12345')).toBe(false)
      expect(validatePhone('abc')).toBe(false)
    })
  })

  describe('sanitizeInput', () => {
    it('should escape HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
      )
      expect(sanitizeInput("test'input")).toBe('test&#x27;input')
    })

    it('should handle non-string inputs', () => {
      expect(sanitizeInput(123)).toBe(123)
      expect(sanitizeInput(null)).toBeNull()
    })
  })
})
