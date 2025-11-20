/**
 * Application constants
 */

// Bet Types
export const BET_TYPES = {
  MONEYLINE: 'moneyline',
  SPREAD: 'spread',
  PARLAY: 'parlay',
  OVER_UNDER: 'over_under',
}

// Bet Results
export const BET_RESULTS = {
  WIN: 'win',
  LOSS: 'loss',
  PENDING: 'pending',
  PUSH: 'push',
}

// Betting Strategies
export const BETTING_STRATEGIES = {
  CONSERVATIVE: 'conservative',
  MODERATE: 'moderate',
  AGGRESSIVE: 'aggressive',
}

// Sports
export const SPORTS = {
  NFL: 'nfl',
  NBA: 'nba',
  MLB: 'mlb',
  NHL: 'nhl',
  SOCCER: 'soccer',
  UFC: 'ufc',
  OTHER: 'other',
}

// Theme Colors
export const COLORS = {
  PRIMARY: '#4a90e2',
  BACKGROUND: '#000',
  CARD_BACKGROUND: '#1a1a1a',
  SECONDARY_BACKGROUND: '#2a2a2a',
  TEXT_PRIMARY: '#fff',
  TEXT_SECONDARY: '#aaa',
  TEXT_TERTIARY: '#666',
  SUCCESS: '#4caf50',
  ERROR: '#f44336',
  WARNING: '#ff9800',
  INFO: '#2196f3',
  BORDER: '#333',
}

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SMALL: 320,
  MEDIUM: 768,
  LARGE: 1024,
  XLARGE: 1280,
}

// API Endpoints (if using external services)
export const API_ENDPOINTS = {
  ODDS_API: 'https://api.the-odds-api.com',
  // Add other API endpoints as needed
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  AUTH_ERROR: 'Authentication failed. Please try again.',
  PERMISSION_DENIED: 'Permission denied. Please check your account settings.',
  NOT_FOUND: 'Resource not found.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  BET_ADDED: 'Bet added successfully!',
  BET_UPDATED: 'Bet updated successfully!',
  BET_DELETED: 'Bet deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
}

// Validation Constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_STAKE_AMOUNT: 100000,
  MIN_STAKE_AMOUNT: 0.01,
  MAX_ODDS: 1000,
  MIN_ODDS: 1.01,
}

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM d, yyyy',
  LONG: 'MMMM d, yyyy',
  WITH_TIME: 'MMM d, yyyy h:mm a',
}
