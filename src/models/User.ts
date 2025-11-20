export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isPro: boolean;
  proExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
  stats: UserStats;
}

export interface UserSettings {
  notifications: {
    weekly: boolean;
    insights: boolean;
    trends: boolean;
  };
  privacy: {
    leaderboardOptIn: boolean;
  };
}

export interface UserStats {
  totalBets: number;
  totalWins: number;
  totalLosses: number;
  totalProfit: number;
  currentStreak: number;
  longestStreak: number;
  avgOdds: number;
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PRO = 'PRO'
}
