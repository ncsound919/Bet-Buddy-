/**
 * Bet Buddy Types
 * Core type definitions for the application
 */

// Tool access settings for customizable tool visibility
export interface ToolSettings {
  oddsCalculator: boolean;
  statisticsEngine: boolean;
  dataValidator: boolean;
  dataExporter: boolean;
  screenshotOCR: boolean;
  sportsGames: boolean;
  apiIntegrations: boolean;
}

// API Integration configurations
export interface APIIntegration {
  id: string;
  name: string;
  type: 'gmail' | 'betting' | 'mcp' | 'custom';
  enabled: boolean;
  configured: boolean;
  apiKey?: string;
  endpoint?: string;
}

// Sim Currency (SimVC) system
export interface SimVCBalance {
  amount: number;
  lastUpdated: Date;
}

export interface SimVCTransaction {
  id: string;
  type: 'earn' | 'spend' | 'bet_win' | 'bet_loss';
  amount: number;
  description: string;
  timestamp: Date;
  gameId?: string;
}

// Sports Game Types
export type SportType = 'basketball' | 'football' | 'baseball';

export interface GameInfo {
  id: string;
  name: string;
  sport: SportType;
  description: string;
  thumbnail?: string;
  isFree: boolean;
  cost: number; // SimVC cost to unlock
  unlocked: boolean;
}

// Game state for sports simulations
export interface TeamStats {
  name: string;
  abbreviation: string;
  score: number;
  offense: number;
  defense: number;
  speed: number;
}

export interface BasketballGameState {
  homeTeam: TeamStats;
  awayTeam: TeamStats;
  quarter: number;
  timeRemaining: number; // seconds
  possession: 'home' | 'away';
  shotClock: number;
  isPlaying: boolean;
  gameOver: boolean;
}

export interface FootballGameState {
  homeTeam: TeamStats;
  awayTeam: TeamStats;
  quarter: number;
  timeRemaining: number;
  down: number;
  yardsToGo: number;
  ballPosition: number; // 0-100 yard line
  possession: 'home' | 'away';
  isPlaying: boolean;
  gameOver: boolean;
}

export interface BaseballGameState {
  homeTeam: TeamStats;
  awayTeam: TeamStats;
  inning: number;
  isTopInning: boolean;
  outs: number;
  balls: number;
  strikes: number;
  bases: [boolean, boolean, boolean]; // 1st, 2nd, 3rd
  isPlaying: boolean;
  gameOver: boolean;
}

// Sim Bet for playing virtual games
export interface SimBet {
  id: string;
  gameId: string;
  sport: SportType;
  betType: 'moneyline' | 'spread' | 'total';
  selection: string;
  amount: number;
  odds: number;
  status: 'pending' | 'won' | 'lost';
  potentialPayout: number;
  timestamp: Date;
}

// User settings and preferences
export interface UserSettings {
  toolSettings: ToolSettings;
  apiIntegrations: APIIntegration[];
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  notifications: boolean;
}

// App State
export interface AppState {
  simVC: SimVCBalance;
  transactions: SimVCTransaction[];
  games: GameInfo[];
  activeBets: SimBet[];
  settings: UserSettings;
}

// Default settings
export const defaultToolSettings: ToolSettings = {
  oddsCalculator: true,
  statisticsEngine: true,
  dataValidator: true,
  dataExporter: true,
  screenshotOCR: true,
  sportsGames: true,
  apiIntegrations: true,
};

export const defaultAPIIntegrations: APIIntegration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    type: 'gmail',
    enabled: false,
    configured: false,
  },
  {
    id: 'betting-api',
    name: 'Betting API',
    type: 'betting',
    enabled: false,
    configured: false,
  },
  {
    id: 'mcp',
    name: 'MCP Server',
    type: 'mcp',
    enabled: false,
    configured: false,
  },
];

export const defaultGames: GameInfo[] = [
  {
    id: 'basketball-classic',
    name: 'Hoops Classic',
    sport: 'basketball',
    description: 'Bulls vs Blazers / Double Dribble style basketball simulation',
    isFree: true,
    cost: 0,
    unlocked: true,
  },
  {
    id: 'football-showdown',
    name: 'Gridiron Showdown',
    sport: 'football',
    description: 'Tecmo Bowl style football simulation',
    isFree: false,
    cost: 500,
    unlocked: false,
  },
  {
    id: 'baseball-legends',
    name: 'Diamond Legends',
    sport: 'baseball',
    description: 'Classic baseball simulation with full gameplay',
    isFree: false,
    cost: 500,
    unlocked: false,
  },
];

export const defaultUserSettings: UserSettings = {
  toolSettings: defaultToolSettings,
  apiIntegrations: defaultAPIIntegrations,
  theme: 'dark',
  soundEnabled: true,
  notifications: true,
};

export const defaultAppState: AppState = {
  simVC: { amount: 1000, lastUpdated: new Date() }, // Start with 1000 SimVC
  transactions: [],
  games: defaultGames,
  activeBets: [],
  settings: defaultUserSettings,
};
