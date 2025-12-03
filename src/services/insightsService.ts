import { Bet, BetResult } from '../models/Bet';
import { Insight, InsightType, InsightData, TrendData } from '../models/Insight';

export class InsightsService {
  /**
   * Generate insights from user's betting history
   * This is a rule-based MVP version - can be enhanced with ML later
   */
  static generateInsights(bets: Bet[]): Insight[] {
    const insights: Insight[] = [];
    
    if (bets.length < 3) {
      return insights; // Need at least 3 bets to generate meaningful insights
    }

    const settledBets = bets.filter(bet => bet.result !== BetResult.PENDING);
    
    if (settledBets.length === 0) {
      return insights;
    }

    // Insight 1: Best performing bet type
    const bestBetType = this.analyzeBestBetType(settledBets);
    if (bestBetType) {
      insights.push(bestBetType);
    }

    // Insight 2: Sport performance
    const sportPerformance = this.analyzeSportPerformance(settledBets);
    if (sportPerformance) {
      insights.push(sportPerformance);
    }

    // Insight 3: Odds analysis
    const oddsAnalysis = this.analyzeOddsPatterns(settledBets);
    if (oddsAnalysis) {
      insights.push(oddsAnalysis);
    }

    // Insight 4: Profit trend
    const profitTrend = this.analyzeProfitTrend(settledBets);
    if (profitTrend) {
      insights.push(profitTrend);
    }

    return insights;
  }

  private static analyzeBestBetType(bets: Bet[]): Insight | null {
    const betTypeStats = this.calculateBetTypeStats(bets);
    
    let bestType = '';
    let bestWinRate = 0;

    for (const [betType, stats] of Object.entries(betTypeStats)) {
      if (stats.totalBets >= 3 && stats.winRate > bestWinRate) {
        bestWinRate = stats.winRate;
        bestType = betType;
      }
    }

    if (!bestType) return null;

    const stats = betTypeStats[bestType];

    return {
      id: `best-bet-type-${Date.now()}`,
      userId: bets[0].userId,
      type: InsightType.BEST_BET_TYPE,
      title: `${bestType} bets are your strength!`,
      description: `You have a ${(bestWinRate * 100).toFixed(1)}% win rate on ${bestType} bets`,
      actionable: `Keep focusing on ${bestType} bets. You're ${((bestWinRate - 0.5) * 100).toFixed(1)}% above break-even!`,
      data: {
        metric: 'Win Rate',
        value: bestWinRate,
        comparison: {
          label: 'Total Bets',
          value: stats.totalBets
        }
      },
      createdAt: new Date(),
      isRead: false
    };
  }

  private static analyzeSportPerformance(bets: Bet[]): Insight | null {
    const sportStats = this.calculateSportStats(bets);
    
    let bestSport = '';
    let bestProfit = -Infinity;

    for (const [sport, stats] of Object.entries(sportStats)) {
      if (stats.totalBets >= 3 && stats.profit > bestProfit) {
        bestProfit = stats.profit;
        bestSport = sport;
      }
    }

    if (!bestSport) return null;

    const stats = sportStats[bestSport];

    return {
      id: `sport-performance-${Date.now()}`,
      userId: bets[0].userId,
      type: InsightType.SPORT_PERFORMANCE,
      title: `${bestSport} is your most profitable sport`,
      description: `You've earned $${bestProfit.toFixed(2)} from ${stats.totalBets} ${bestSport} bets`,
      actionable: `${bestSport} is working well for you - consider increasing your stake on these bets.`,
      data: {
        metric: 'Profit',
        value: bestProfit,
        comparison: {
          label: 'Win Rate',
          value: stats.winRate
        }
      },
      createdAt: new Date(),
      isRead: false
    };
  }

  private static analyzeOddsPatterns(bets: Bet[]): Insight | null {
    // Group bets by odds ranges
    const underdog = bets.filter(b => b.odds > 0 && b.result !== BetResult.PENDING);
    const favorite = bets.filter(b => b.odds < 0 && b.result !== BetResult.PENDING);

    if (underdog.length < 2 || favorite.length < 2) return null;

    const underdogWins = underdog.filter(b => b.result === BetResult.WIN).length;
    const favoriteWins = favorite.filter(b => b.result === BetResult.WIN).length;

    const underdogWinRate = underdogWins / underdog.length;
    const favoriteWinRate = favoriteWins / favorite.length;

    const betterOddsType = underdogWinRate > favoriteWinRate ? 'underdogs' : 'favorites';
    const betterRate = Math.max(underdogWinRate, favoriteWinRate);

    return {
      id: `odds-analysis-${Date.now()}`,
      userId: bets[0].userId,
      type: InsightType.ODDS_ANALYSIS,
      title: `You perform better betting on ${betterOddsType}`,
      description: `Your win rate is ${(betterRate * 100).toFixed(1)}% when betting ${betterOddsType}`,
      actionable: `Focus more on ${betterOddsType} - they align with your betting style.`,
      data: {
        metric: 'Win Rate',
        value: betterRate,
        comparison: {
          label: `${betterOddsType} bets`,
          value: betterOddsType === 'underdogs' ? underdog.length : favorite.length
        }
      },
      createdAt: new Date(),
      isRead: false
    };
  }

  private static analyzeProfitTrend(bets: Bet[]): Insight | null {
    if (bets.length < 5) return null;

    const totalProfit = bets.reduce((sum, bet) => sum + (bet.profit || 0), 0);
    const recentBets = bets.slice(0, 5);
    const recentProfit = recentBets.reduce((sum, bet) => sum + (bet.profit || 0), 0);

    const trend = recentProfit > 0 ? 'positive' : 'negative';
    const emoji = trend === 'positive' ? '📈' : '📉';

    return {
      id: `profit-trend-${Date.now()}`,
      userId: bets[0].userId,
      type: InsightType.PROFIT_TREND,
      title: `${emoji} Your recent trend is ${trend}`,
      description: `Last 5 bets: ${recentProfit >= 0 ? '+' : ''}$${recentProfit.toFixed(2)}`,
      actionable: trend === 'positive' 
        ? 'Great work! Keep up your current strategy.' 
        : 'Time to reassess - what changed from your winning streak?',
      data: {
        metric: 'Recent Profit',
        value: recentProfit,
        change: totalProfit > 0 ? (recentProfit / totalProfit) * 100 : 0,
        comparison: {
          label: 'Total Profit',
          value: totalProfit
        }
      },
      createdAt: new Date(),
      isRead: false
    };
  }

  private static calculateBetTypeStats(bets: Bet[]): Record<string, TrendData> {
    const stats: Record<string, TrendData> = {};

    bets.forEach(bet => {
      if (!stats[bet.betType]) {
        stats[bet.betType] = {
          betType: bet.betType,
          winRate: 0,
          totalBets: 0,
          profit: 0,
          avgOdds: 0
        };
      }

      const betStats = stats[bet.betType];
      betStats.totalBets++;
      if (bet.result === BetResult.WIN) {
        betStats.winRate = (betStats.winRate * (betStats.totalBets - 1) + 1) / betStats.totalBets;
      } else {
        betStats.winRate = (betStats.winRate * (betStats.totalBets - 1)) / betStats.totalBets;
      }
      betStats.profit += bet.profit || 0;
      betStats.avgOdds = (betStats.avgOdds * (betStats.totalBets - 1) + bet.odds) / betStats.totalBets;
    });

    return stats;
  }

  private static calculateSportStats(bets: Bet[]): Record<string, TrendData> {
    const stats: Record<string, TrendData> = {};

    bets.forEach(bet => {
      if (!stats[bet.sport]) {
        stats[bet.sport] = {
          sport: bet.sport,
          winRate: 0,
          totalBets: 0,
          profit: 0,
          avgOdds: 0
        };
      }

      const sportStats = stats[bet.sport];
      sportStats.totalBets++;
      if (bet.result === BetResult.WIN) {
        sportStats.winRate = (sportStats.winRate * (sportStats.totalBets - 1) + 1) / sportStats.totalBets;
      } else {
        sportStats.winRate = (sportStats.winRate * (sportStats.totalBets - 1)) / sportStats.totalBets;
      }
      sportStats.profit += bet.profit || 0;
      sportStats.avgOdds = (sportStats.avgOdds * (sportStats.totalBets - 1) + bet.odds) / sportStats.totalBets;
    });

    return stats;
  }
}
