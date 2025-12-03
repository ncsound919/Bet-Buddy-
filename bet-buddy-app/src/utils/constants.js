// Application constants

export const BET_TYPES = {
  MONEYLINE: 'ML',
  SPREAD: 'SPREAD',
  PARLAY: 'PARLAY',
  OVER_UNDER: 'OVER/UNDER',
  PROP: 'PROP',
}

export const BET_STATUS = {
  PENDING: 'pending',
  WON: 'won',
  LOST: 'lost',
  VOID: 'void',
  PUSHED: 'pushed',
}

export const SPORTS = {
  NFL: 'NFL',
  NBA: 'NBA',
  MLB: 'MLB',
  NHL: 'NHL',
  NCAAF: 'NCAAF',
  NCAAB: 'NCAAB',
  SOCCER: 'Soccer',
  UFC: 'UFC',
  BOXING: 'Boxing',
  TENNIS: 'Tennis',
  GOLF: 'Golf',
}

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium',
}

export const SUBSCRIPTION_FEATURES = {
  FREE: [
    'Track up to 10 bets',
    'Basic analytics',
    'Manual bet entry',
  ],
  PREMIUM: [
    'Unlimited bet tracking',
    'Advanced analytics',
    'Custom insights',
    'OCR bet entry',
    'Export data',
    'Priority support',
  ],
}

export const ODDS_FORMAT = {
  AMERICAN: 'american',
  DECIMAL: 'decimal',
  FRACTIONAL: 'fractional',
}

export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  AREA: 'area',
}

export const COLORS = {
  PRIMARY: '#007AFF',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  ERROR: '#FF3B30',
  GRAY: '#8E8E93',
}

export const API_TIMEOUT = 10000 // 10 seconds

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
