export interface Bet {
  id: string;
  userId: string;
  sport: string;
  betType: BetType;
  description: string;
  odds: number;
  stake: number;
  result?: BetResult;
  profit?: number;
  date: Date;
  settledAt?: Date;
  notes?: string;
  teams?: {
    home: string;
    away: string;
  };
  slipImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BetType {
  SPREAD = 'SPREAD',
  MONEYLINE = 'MONEYLINE',
  OVER_UNDER = 'OVER_UNDER',
  PROP = 'PROP',
  PARLAY = 'PARLAY',
  TEASER = 'TEASER'
}

export enum BetResult {
  WIN = 'WIN',
  LOSS = 'LOSS',
  PUSH = 'PUSH',
  PENDING = 'PENDING'
}

export interface BetFormData {
  sport: string;
  betType: BetType;
  description: string;
  odds: number;
  stake: number;
  teams?: {
    home: string;
    away: string;
  };
  date?: Date;
  notes?: string;
}
