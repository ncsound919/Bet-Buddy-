import {
  calculateBetProfit,
  calculateWinRate,
  calculateTotalProfit,
  calculateROI,
  formatOdds,
  formatCurrency,
  oddsToImpliedProbability
} from '../../src/utils/calculations';
import { BetResult } from '../../src/models/Bet';

describe('Calculations Utils', () => {
  describe('calculateBetProfit', () => {
    it('should calculate profit for positive odds win', () => {
      const profit = calculateBetProfit(100, 150, BetResult.WIN);
      expect(profit).toBe(150);
    });

    it('should calculate profit for negative odds win', () => {
      const profit = calculateBetProfit(110, -110, BetResult.WIN);
      expect(profit).toBe(100);
    });

    it('should return negative stake for loss', () => {
      const profit = calculateBetProfit(100, 150, BetResult.LOSS);
      expect(profit).toBe(-100);
    });

    it('should return 0 for push', () => {
      const profit = calculateBetProfit(100, 150, BetResult.PUSH);
      expect(profit).toBe(0);
    });

    it('should return 0 for pending', () => {
      const profit = calculateBetProfit(100, 150, BetResult.PENDING);
      expect(profit).toBe(0);
    });
  });

  describe('formatOdds', () => {
    it('should format positive odds with plus sign', () => {
      expect(formatOdds(150)).toBe('+150');
    });

    it('should format negative odds without modification', () => {
      expect(formatOdds(-110)).toBe('-110');
    });
  });

  describe('formatCurrency', () => {
    it('should format positive amounts with plus sign', () => {
      expect(formatCurrency(150.50)).toBe('+$150.50');
    });

    it('should format negative amounts with minus sign', () => {
      expect(formatCurrency(-50.25)).toBe('-$50.25');
    });

    it('should format zero properly', () => {
      expect(formatCurrency(0)).toBe('+$0.00');
    });
  });

  describe('oddsToImpliedProbability', () => {
    it('should convert positive odds to probability', () => {
      const prob = oddsToImpliedProbability(150);
      expect(prob).toBeCloseTo(0.4, 2);
    });

    it('should convert negative odds to probability', () => {
      const prob = oddsToImpliedProbability(-110);
      expect(prob).toBeCloseTo(0.524, 2);
    });

    it('should handle even odds (-100)', () => {
      const prob = oddsToImpliedProbability(-100);
      expect(prob).toBe(0.5);
    });
  });
});
