/**
 * Insights Service
 * Analyzes betting patterns and generates actionable insights
 */

/**
 * Calculate betting statistics from bet history
 * @param {Array} bets - Array of bet objects
 * @returns {Object} - Statistics object
 */
export const calculateStats = (bets) => {
  if (!bets || bets.length === 0) {
    return {
      totalBets: 0,
      wins: 0,
      losses: 0,
      pending: 0,
      winRate: 0,
      totalStaked: 0,
      totalProfit: 0,
    }
  }

  const wins = bets.filter((bet) => bet.result === 'win').length
  const losses = bets.filter((bet) => bet.result === 'loss').length
  const pending = bets.filter((bet) => bet.result === 'pending').length
  const totalStaked = bets.reduce((sum, bet) => sum + bet.stake, 0)
  const totalProfit = bets.reduce((sum, bet) => {
    if (bet.result === 'win') {
      return sum + bet.stake * (bet.odds - 1)
    } else if (bet.result === 'loss') {
      return sum - bet.stake
    }
    return sum
  }, 0)

  return {
    totalBets: bets.length,
    wins,
    losses,
    pending,
    winRate: wins + losses > 0 ? ((wins / (wins + losses)) * 100).toFixed(1) : 0,
    totalStaked,
    totalProfit,
  }
}

/**
 * Generate insights based on betting patterns
 * @param {Array} bets - Array of bet objects
 * @returns {Array} - Array of insight objects
 */
export const generateInsights = (bets) => {
  const insights = []

  if (!bets || bets.length === 0) {
    return insights
  }

  const stats = calculateStats(bets)

  // Win rate insight
  if (stats.winRate > 60) {
    insights.push({
      title: '🎯 Strong Performance',
      message: `Your win rate is ${stats.winRate}%! Keep up the great work.`,
    })
  } else if (stats.winRate < 40 && stats.totalBets >= 5) {
    insights.push({
      title: '⚠️ Performance Alert',
      message: `Your win rate is ${stats.winRate}%. Consider reviewing your betting strategy.`,
    })
  }

  // Profit insight
  if (stats.totalProfit > 0) {
    insights.push({
      title: '💰 In Profit',
      message: `You're up $${stats.totalProfit.toFixed(2)} overall. Great job!`,
    })
  } else if (stats.totalProfit < 0) {
    insights.push({
      title: '📉 Losses Alert',
      message: `You're down $${Math.abs(stats.totalProfit).toFixed(2)}. Consider reviewing your bets.`,
    })
  }

  // Bet type analysis
  const betTypeStats = analyzeBetTypes(bets)
  const bestBetType = getBestPerformingBetType(betTypeStats)
  if (bestBetType) {
    insights.push({
      title: '🏆 Best Bet Type',
      message: `${bestBetType.type} bets have your highest win rate at ${bestBetType.winRate}%.`,
    })
  }

  return insights
}

/**
 * Analyze performance by bet type
 * @param {Array} bets - Array of bet objects
 * @returns {Object} - Bet type statistics
 */
const analyzeBetTypes = (bets) => {
  const typeStats = {}

  bets.forEach((bet) => {
    if (!typeStats[bet.betType]) {
      typeStats[bet.betType] = {
        total: 0,
        wins: 0,
        losses: 0,
      }
    }

    typeStats[bet.betType].total++
    if (bet.result === 'win') {
      typeStats[bet.betType].wins++
    } else if (bet.result === 'loss') {
      typeStats[bet.betType].losses++
    }
  })

  return typeStats
}

/**
 * Get the best performing bet type
 * @param {Object} betTypeStats - Bet type statistics
 * @returns {Object|null} - Best performing bet type
 */
const getBestPerformingBetType = (betTypeStats) => {
  let bestType = null
  let bestWinRate = 0

  Object.entries(betTypeStats).forEach(([type, stats]) => {
    const completed = stats.wins + stats.losses
    if (completed >= 3) {
      const winRate = (stats.wins / completed) * 100
      if (winRate > bestWinRate) {
        bestWinRate = winRate
        bestType = { type, winRate: winRate.toFixed(1) }
      }
    }
  })

  return bestType
}

/**
 * Suggest bet amount based on bankroll and strategy
 * @param {number} bankroll - Total available bankroll
 * @param {string} strategy - Betting strategy (conservative, moderate, aggressive)
 * @returns {number} - Suggested bet amount
 */
export const suggestBetAmount = (bankroll, strategy = 'moderate') => {
  const strategies = {
    conservative: 0.01, // 1% of bankroll
    moderate: 0.02, // 2% of bankroll
    aggressive: 0.05, // 5% of bankroll
  }

  const percentage = strategies[strategy] || strategies.moderate
  return bankroll * percentage
}
