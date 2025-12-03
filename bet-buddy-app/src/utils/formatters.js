// Data formatting utilities

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatOdds = (odds) => {
  const numOdds = Number(odds)
  if (isNaN(numOdds)) return odds
  
  // American odds format
  if (Math.abs(numOdds) >= 100) {
    return numOdds > 0 ? `+${numOdds}` : `${numOdds}`
  }
  
  // Decimal odds format
  return numOdds.toFixed(2)
}

export const formatPercentage = (value, decimals = 1) => {
  return `${Number(value).toFixed(decimals)}%`
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const calculatePotentialWin = (stake, odds) => {
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

export const formatBetType = (type) => {
  const typeMap = {
    ML: 'Moneyline',
    SPREAD: 'Spread',
    PARLAY: 'Parlay',
    OVER: 'Over',
    UNDER: 'Under',
    PROP: 'Prop Bet',
  }
  
  return typeMap[type.toUpperCase()] || type
}
