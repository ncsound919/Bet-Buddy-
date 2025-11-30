// Insight Model for Firestore/MongoDB

class Insight {
  constructor(data) {
    this.id = data.id || null
    this.userId = data.userId
    this.type = data.type // win_rate, roi, hot_streak, etc.
    this.title = data.title
    this.description = data.description
    this.value = data.value
    this.metadata = data.metadata || {}
    this.priority = data.priority || 'medium' // low, medium, high
    this.category = data.category || 'general' // general, performance, trend, recommendation
    this.createdAt = data.createdAt || new Date()
    this.expiresAt = data.expiresAt || null
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      title: this.title,
      description: this.description,
      value: this.value,
      metadata: this.metadata,
      priority: this.priority,
      category: this.category,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
    }
  }

  async save() {
    // Save to database (Firestore/MongoDB)
    // Implementation depends on database choice
    return this
  }

  static async findByUserId(userId) {
    // Find insights for a user
    // Implementation depends on database choice
    return []
  }

  static generateInsights(bets) {
    const insights = []

    // Calculate win rate
    const totalBets = bets.length
    const wonBets = bets.filter(bet => bet.status === 'won').length
    const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0

    insights.push(new Insight({
      type: 'win_rate',
      title: 'Win Rate',
      description: 'Your overall win rate across all bets',
      value: `${winRate.toFixed(1)}%`,
      category: 'performance',
      priority: 'high',
    }))

    // Calculate ROI
    const totalStaked = bets.reduce((sum, bet) => sum + Number(bet.stake || 0), 0)
    const totalReturns = bets
      .filter(bet => bet.status === 'won')
      .reduce((sum, bet) => sum + Number(bet.actualWin || 0), 0)
    const roi = totalStaked > 0 ? ((totalReturns - totalStaked) / totalStaked) * 100 : 0

    insights.push(new Insight({
      type: 'roi',
      title: 'Return on Investment',
      description: 'Your overall ROI',
      value: `${roi > 0 ? '+' : ''}${roi.toFixed(1)}%`,
      category: 'performance',
      priority: 'high',
    }))

    // Check for hot streak
    let currentStreak = 0
    let maxStreak = 0
    for (let i = bets.length - 1; i >= 0; i--) {
      if (bets[i].status === 'won') {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else if (bets[i].status === 'lost') {
        break
      }
    }

    if (currentStreak >= 3) {
      insights.push(new Insight({
        type: 'hot_streak',
        title: 'Hot Streak! 🔥',
        description: `You're on a ${currentStreak} win streak`,
        value: currentStreak,
        category: 'trend',
        priority: 'high',
      }))
    }

    // Most successful bet type
    const betTypeStats = {}
    bets.forEach(bet => {
      if (!betTypeStats[bet.type]) {
        betTypeStats[bet.type] = { wins: 0, total: 0 }
      }
      betTypeStats[bet.type].total++
      if (bet.status === 'won') {
        betTypeStats[bet.type].wins++
      }
    })

    const bestType = Object.entries(betTypeStats)
      .map(([type, stats]) => ({
        type,
        winRate: stats.total > 0 ? (stats.wins / stats.total) * 100 : 0,
      }))
      .sort((a, b) => b.winRate - a.winRate)[0]

    if (bestType && bestType.winRate > 50) {
      insights.push(new Insight({
        type: 'best_bet_type',
        title: 'Your Best Bet Type',
        description: `${bestType.type} bets have your highest win rate`,
        value: `${bestType.winRate.toFixed(1)}%`,
        category: 'recommendation',
        priority: 'medium',
      }))
    }

    return insights
  }
}

module.exports = Insight
