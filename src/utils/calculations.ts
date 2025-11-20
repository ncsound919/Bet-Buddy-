import { Bet, BetResult } from '../models/Bet';

/**
 * Calculate profit/loss from a bet
 */
export const calculateBetProfit = (stake: number, odds: number, result: BetResult): number => {
  if (result === BetResult.PUSH) return 0;
  if (result === BetResult.PENDING) return 0;
  
  if (result === BetResult.WIN) {
    if (odds > 0) {
      // American odds - positive (underdog)
      return (stake * odds) / 100;
    } else {
      // American odds - negative (favorite)
      return (stake * 100) / Math.abs(odds);
    }
  } else {
    // Loss
    return -stake;
  }
};

/**
 * Calculate win rate from bets
 */
export const calculateWinRate = (bets: Bet[]): number => {
  const settledBets = bets.filter(bet => 
    bet.result === BetResult.WIN || bet.result === BetResult.LOSS
  );
  
  if (settledBets.length === 0) return 0;
  
  const wins = settledBets.filter(bet => bet.result === BetResult.WIN).length;
  return wins / settledBets.length;
};

/**
 * Calculate total profit from bets
 */
export const calculateTotalProfit = (bets: Bet[]): number => {
  return bets.reduce((total, bet) => total + (bet.profit || 0), 0);
};

/**
 * Calculate ROI (Return on Investment)
 */
export const calculateROI = (bets: Bet[]): number => {
  const totalStaked = bets.reduce((total, bet) => total + bet.stake, 0);
  if (totalStaked === 0) return 0;
  
  const totalProfit = calculateTotalProfit(bets);
  return (totalProfit / totalStaked) * 100;
};

/**
 * Calculate current win/loss streak
 */
export const calculateStreak = (bets: Bet[]): { current: number; type: 'win' | 'loss' | 'none' } => {
  if (bets.length === 0) return { current: 0, type: 'none' };
  
  const settledBets = bets
    .filter(bet => bet.result === BetResult.WIN || bet.result === BetResult.LOSS)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  if (settledBets.length === 0) return { current: 0, type: 'none' };
  
  const streakType = settledBets[0].result === BetResult.WIN ? 'win' : 'loss';
  let streak = 0;
  
  for (const bet of settledBets) {
    if (bet.result === (streakType === 'win' ? BetResult.WIN : BetResult.LOSS)) {
      streak++;
    } else {
      break;
    }
  }
  
  return { current: streak, type: streakType };
};

/**
 * Format odds for display
 */
export const formatOdds = (odds: number): string => {
  if (odds > 0) return `+${odds}`;
  return odds.toString();
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number): string => {
  const sign = amount >= 0 ? '+' : '';
  return `${sign}$${amount.toFixed(2)}`;
};

/**
 * Convert American odds to implied probability
 */
export const oddsToImpliedProbability = (odds: number): number => {
  if (odds > 0) {
    return 100 / (odds + 100);
  } else {
    return Math.abs(odds) / (Math.abs(odds) + 100);
  }
};

/**
 * Group bets by time period
 */
export const groupBetsByPeriod = (
  bets: Bet[],
  period: 'day' | 'week' | 'month'
): Record<string, Bet[]> => {
  const grouped: Record<string, Bet[]> = {};
  
  bets.forEach(bet => {
    const date = new Date(bet.date);
    let key: string;
    
    switch (period) {
      case 'day':
        key = date.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
    }
    
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(bet);
  });
  
  return grouped;
};
