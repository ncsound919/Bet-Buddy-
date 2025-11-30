const {
  validateEmail,
  validatePassword,
  validateBet,
  sanitizeInput,
  validateObjectId,
} = require('../../utils/validators')

describe('Server Validators', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      const result = validatePassword('Password123')
      expect(result.valid).toBe(true)
    })

    it('should reject weak password', () => {
      const result = validatePassword('weak')
      expect(result.valid).toBe(false)
    })
  })

  describe('validateBet', () => {
    it('should validate correct bet data', () => {
      const betData = {
        userId: 'user123',
        teams: 'Team A vs Team B',
        odds: '-110',
        stake: '50',
        type: 'ML',
      }
      const result = validateBet(betData)
      expect(result.valid).toBe(true)
    })

    it('should reject incomplete bet data', () => {
      const betData = {
        teams: 'Team A vs Team B',
      }
      const result = validateBet(betData)
      expect(result.valid).toBe(false)
      expect(Object.keys(result.errors).length).toBeGreaterThan(0)
    })
  })

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
    })

    it('should trim whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test')
    })
  })

  describe('validateObjectId', () => {
    it('should validate valid object ID', () => {
      expect(validateObjectId('abc123def456')).toBe(true)
    })

    it('should reject invalid object ID', () => {
      expect(validateObjectId('invalid!')).toBe(false)
      expect(validateObjectId('short')).toBe(false)
    })
  })
})
