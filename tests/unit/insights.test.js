import { calculateStats, generateInsights, suggestBetAmount } from '../../src/services/insights'

describe('insights service', () => {
  describe('calculateStats', () => {
    it('should calculate correct statistics', () => {
      const bets = [
        { result: 'win', stake: 100, odds: 2 },
        { result: 'win', stake: 50, odds: 1.5 },
        { result: 'loss', stake: 75, odds: 2 },
        { result: 'pending', stake: 100, odds: 1.8 },
      ]

      const stats = calculateStats(bets)

      expect(stats.totalBets).toBe(4)
      expect(stats.wins).toBe(2)
      expect(stats.losses).toBe(1)
      expect(stats.pending).toBe(1)
      expect(stats.totalStaked).toBe(325)
      expect(parseFloat(stats.winRate)).toBeCloseTo(66.7, 1)
    })

    it('should handle empty bet array', () => {
      const stats = calculateStats([])

      expect(stats.totalBets).toBe(0)
      expect(stats.wins).toBe(0)
      expect(stats.losses).toBe(0)
      expect(stats.winRate).toBe(0)
      expect(stats.totalProfit).toBe(0)
    })

    it('should calculate profit correctly', () => {
      const bets = [
        { result: 'win', stake: 100, odds: 2 }, // profit: +100
        { result: 'loss', stake: 50, odds: 2 }, // profit: -50
      ]

      const stats = calculateStats(bets)
      expect(stats.totalProfit).toBe(50)
    })
  })

  describe('generateInsights', () => {
    it('should generate insights for good performance', () => {
      const bets = [
        { result: 'win', stake: 100, odds: 2, betType: 'moneyline' },
        { result: 'win', stake: 100, odds: 2, betType: 'moneyline' },
        { result: 'win', stake: 100, odds: 2, betType: 'moneyline' },
        { result: 'loss', stake: 100, odds: 2, betType: 'moneyline' },
      ]

      const insights = generateInsights(bets)
      expect(insights.length).toBeGreaterThan(0)
      expect(insights.some((i) => i.title.includes('Strong Performance'))).toBe(true)
    })

    it('should generate insights for poor performance', () => {
      const bets = [
        { result: 'loss', stake: 100, odds: 2, betType: 'moneyline' },
        { result: 'loss', stake: 100, odds: 2, betType: 'moneyline' },
        { result: 'loss', stake: 100, odds: 2, betType: 'moneyline' },
        { result: 'win', stake: 100, odds: 2, betType: 'moneyline' },
        { result: 'loss', stake: 100, odds: 2, betType: 'moneyline' },
      ]

      const insights = generateInsights(bets)
      expect(insights.length).toBeGreaterThan(0)
    })

    it('should handle empty bet array', () => {
      const insights = generateInsights([])
      expect(insights).toEqual([])
    })
  })

  describe('suggestBetAmount', () => {
    it('should suggest conservative bet amount', () => {
      const amount = suggestBetAmount(1000, 'conservative')
      expect(amount).toBe(10) // 1% of 1000
    })

    it('should suggest moderate bet amount', () => {
      const amount = suggestBetAmount(1000, 'moderate')
      expect(amount).toBe(20) // 2% of 1000
    })

    it('should suggest aggressive bet amount', () => {
      const amount = suggestBetAmount(1000, 'aggressive')
      expect(amount).toBe(50) // 5% of 1000
    })

    it('should default to moderate strategy', () => {
      const amount = suggestBetAmount(1000)
      expect(amount).toBe(20)
    })
  })
})
