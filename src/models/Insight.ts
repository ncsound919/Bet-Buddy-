export interface Insight {
  id: string;
  userId: string;
  type: InsightType;
  title: string;
  description: string;
  actionable: string;
  data: InsightData;
  createdAt: Date;
  isRead: boolean;
  isPinned?: boolean;
}

export enum InsightType {
  WIN_RATE = 'WIN_RATE',
  PROFIT_TREND = 'PROFIT_TREND',
  BEST_BET_TYPE = 'BEST_BET_TYPE',
  WORST_BET_TYPE = 'WORST_BET_TYPE',
  SPORT_PERFORMANCE = 'SPORT_PERFORMANCE',
  ODDS_ANALYSIS = 'ODDS_ANALYSIS',
  STREAK = 'STREAK',
  BANKROLL = 'BANKROLL',
  CUSTOM = 'CUSTOM'
}

export interface InsightData {
  metric: string;
  value: number;
  change?: number;
  comparison?: {
    label: string;
    value: number;
  };
  chartData?: ChartDataPoint[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface TrendData {
  sport?: string;
  betType?: string;
  winRate: number;
  totalBets: number;
  profit: number;
  avgOdds: number;
}
