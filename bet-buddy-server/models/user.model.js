// User Model for Firestore/MongoDB

class User {
  constructor(data) {
    this.id = data.id || null
    this.email = data.email
    this.passwordHash = data.passwordHash || null
    this.displayName = data.displayName || null
    this.profilePicture = data.profilePicture || null
    this.subscription = data.subscription || 'free' // free, premium
    this.subscriptionExpiry = data.subscriptionExpiry || null
    this.preferences = data.preferences || {
      oddsFormat: 'american', // american, decimal, fractional
      notifications: true,
      darkMode: false,
    }
    this.stats = data.stats || {
      totalBets: 0,
      wonBets: 0,
      lostBets: 0,
      totalStaked: 0,
      totalReturns: 0,
      winRate: 0,
      roi: 0,
    }
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
    this.lastLogin = data.lastLogin || null
  }

  updateStats(bets) {
    const totalBets = bets.length
    const wonBets = bets.filter(bet => bet.status === 'won').length
    const lostBets = bets.filter(bet => bet.status === 'lost').length
    const totalStaked = bets.reduce((sum, bet) => sum + Number(bet.stake || 0), 0)
    const totalReturns = bets
      .filter(bet => bet.status === 'won')
      .reduce((sum, bet) => sum + (Number(bet.actualWin || 0)), 0)
    const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0
    const roi = totalStaked > 0 ? ((totalReturns - totalStaked) / totalStaked) * 100 : 0

    this.stats = {
      totalBets,
      wonBets,
      lostBets,
      totalStaked,
      totalReturns,
      winRate: winRate.toFixed(2),
      roi: roi.toFixed(2),
    }
    
    this.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      profilePicture: this.profilePicture,
      subscription: this.subscription,
      subscriptionExpiry: this.subscriptionExpiry,
      preferences: this.preferences,
      stats: this.stats,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLogin: this.lastLogin,
    }
  }

  async save() {
    // Save to database (Firestore/MongoDB)
    // Implementation depends on database choice
    this.updatedAt = new Date()
    return this
  }

  static async findByEmail(email) {
    // Find user by email in database
    // Implementation depends on database choice
    return null
  }

  static async findById(id) {
    // Find user by ID in database
    // Implementation depends on database choice
    return null
  }
}

module.exports = User
