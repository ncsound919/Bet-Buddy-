import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatPercentage,
  formatOdds,
  truncateText,
} from '../../src/utils/formatters'

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format positive amounts', () => {
      expect(formatCurrency(100)).toBe('$100.00')
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })

    it('should format negative amounts', () => {
      expect(formatCurrency(-50)).toBe('-$50.00')
    })

    it('should handle invalid inputs', () => {
      expect(formatCurrency(NaN)).toBe('$0.00')
      expect(formatCurrency('invalid')).toBe('$0.00')
    })
  })

  describe('formatDate', () => {
    it('should format Date objects', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('Jan')
      expect(formatted).toContain('15')
      expect(formatted).toContain('2024')
    })

    it('should handle null/undefined', () => {
      expect(formatDate(null)).toBe('N/A')
      expect(formatDate(undefined)).toBe('N/A')
    })

    it('should handle invalid dates', () => {
      expect(formatDate('invalid')).toBe('Invalid Date')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentages', () => {
      expect(formatPercentage(50)).toBe('50.0%')
      expect(formatPercentage(33.333)).toBe('33.3%')
      expect(formatPercentage(100, 0)).toBe('100%')
    })

    it('should handle invalid inputs', () => {
      expect(formatPercentage(NaN)).toBe('0%')
    })
  })

  describe('formatOdds', () => {
    it('should format positive odds', () => {
      expect(formatOdds(150)).toBe('+150')
    })

    it('should format negative odds', () => {
      expect(formatOdds(-110)).toBe('-110')
    })

    it('should handle invalid inputs', () => {
      expect(formatOdds(NaN)).toBe('N/A')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that needs to be truncated'
      expect(truncateText(longText, 20)).toBe('This is a very long ...')
    })

    it('should not truncate short text', () => {
      expect(truncateText('Short text', 50)).toBe('Short text')
    })

    it('should handle empty strings', () => {
      expect(truncateText('', 10)).toBe('')
      expect(truncateText(null, 10)).toBe('')
    })
  })
})
