// Data formatting utilities for the server

const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

const formatOdds = (odds) => {
  const numOdds = Number(odds)
  if (isNaN(numOdds)) return odds
  
  // American odds format
  if (Math.abs(numOdds) >= 100) {
    return numOdds > 0 ? `+${numOdds}` : `${numOdds}`
  }
  
  // Decimal odds format
  return numOdds.toFixed(2)
}

const formatPercentage = (value, decimals = 1) => {
  return `${Number(value).toFixed(decimals)}%`
}

const formatDate = (date, includeTime = false) => {
  const dateObj = new Date(date)
  
  if (includeTime) {
    return dateObj.toISOString()
  }
  
  return dateObj.toISOString().split('T')[0]
}

const calculatePotentialWin = (stake, odds) => {
  const numStake = Number(stake)
  const numOdds = Number(odds)
  
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

const convertOdds = (odds, fromFormat, toFormat) => {
  const numOdds = Number(odds)
  
  if (fromFormat === 'american' && toFormat === 'decimal') {
    if (numOdds > 0) {
      return 1 + numOdds / 100
    } else {
      return 1 + 100 / Math.abs(numOdds)
    }
  }
  
  if (fromFormat === 'decimal' && toFormat === 'american') {
    if (numOdds >= 2) {
      return (numOdds - 1) * 100
    } else {
      return -100 / (numOdds - 1)
    }
  }
  
  return odds
}

const formatApiResponse = (success, data = null, error = null) => {
  const response = {
    success,
    timestamp: new Date().toISOString(),
  }
  
  if (data) {
    response.data = data
  }
  
  if (error) {
    response.error = error
  }
  
  return response
}

module.exports = {
  formatCurrency,
  formatOdds,
  formatPercentage,
  formatDate,
  calculatePotentialWin,
  convertOdds,
  formatApiResponse,
}
