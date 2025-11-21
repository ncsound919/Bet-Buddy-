// Bet Model for Firestore/MongoDB

class Bet {
  constructor(data) {
    this.id = data.id || null
    this.userId = data.userId
    this.teams = data.teams
    this.odds = data.odds
    this.stake = data.stake
    this.type = data.type // ML, Spread, Parlay, etc.
    this.sport = data.sport || null
    this.status = data.status || 'pending' // pending, won, lost, void, pushed
    this.potentialWin = data.potentialWin || this.calculatePotentialWin()
    this.actualWin = data.actualWin || null
    this.notes = data.notes || ''
    this.betDate = data.betDate || new Date()
    this.settledDate = data.settledDate || null
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  calculatePotentialWin() {
    const numStake = Number(this.stake)
    const numOdds = Number(this.odds)
    
    if (isNaN(numStake) || isNaN(numOdds)) return 0
    
    // American odds
    if (Math.abs(numOdds) >= 100) {
      if (numOdds > 0) {
        return (numStake * numOdds) / 100
      } else {
        return (numStake * 100) / Math.abs(numOdds)
      }
    }
    
    // Decimal odds
    return numStake * (numOdds - 1)
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      teams: this.teams,
      odds: this.odds,
      stake: this.stake,
      type: this.type,
      sport: this.sport,
      status: this.status,
      potentialWin: this.potentialWin,
      actualWin: this.actualWin,
      notes: this.notes,
      betDate: this.betDate,
      settledDate: this.settledDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  async save() {
    // Save to database (Firestore/MongoDB)
    // Implementation depends on database choice
    this.updatedAt = new Date()
    return this
  }

  static async find(query) {
    // Find bets in database
    // Implementation depends on database choice
    return []
  }

  static async findById(id) {
    // Find bet by ID in database
    // Implementation depends on database choice
    return null
  }
}

module.exports = Bet
