import { validateEmail, validatePassword, validateBetFields } from '../../utils/validators'

describe('Validators', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      const result = validatePassword('Password123')
      expect(result.valid).toBe(true)
    })

    it('should reject short password', () => {
      const result = validatePassword('Pass1')
      expect(result.valid).toBe(false)
      expect(result.message).toContain('8 characters')
    })

    it('should reject password without uppercase', () => {
      const result = validatePassword('password123')
      expect(result.valid).toBe(false)
      expect(result.message).toContain('uppercase')
    })
  })

  describe('validateBetFields', () => {
    it('should validate correct bet fields', () => {
      const bet = {
        teams: 'Team A vs Team B',
        odds: '-110',
        stake: '50',
        type: 'ML',
      }
      const result = validateBetFields(bet)
      expect(result.valid).toBe(true)
    })

    it('should reject invalid bet fields', () => {
      const bet = {
        teams: '',
        odds: 'invalid',
        stake: '-10',
        type: '',
      }
      const result = validateBetFields(bet)
      expect(result.valid).toBe(false)
      expect(Object.keys(result.errors).length).toBeGreaterThan(0)
    })
  })
})
