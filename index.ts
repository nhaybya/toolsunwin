export type Strategy = 'normal' | 'aggressive' | 'conservative';
export type Algorithm = 'v2' | 'ai';
export type PredictionType = 'TÀI' | 'XỈU';
export type SessionResult = 'win' | 'loss';

export interface SessionHistory {
  prediction: number;
  type: PredictionType;
  result: SessionResult;
  timestamp: number;
}

export interface Stats {
  totalGames: number;
  winGames: number;
  winningStreak: number;
  losingStreak: number;
  history: SessionHistory[];
}

export interface Prediction {
  type: PredictionType;
  confidence: number;
  primaryNumber: number;
  secondaryNumbers: number[];
  avoid: number[];
  pattern: PatternType;
  patternDescription: string;
}

export type PatternType = 'TRIANGLE' | 'CHANNEL' | 'WAVE';

export interface TrendAnalysis {
  direction: 'up' | 'down';
  strength: number;
}

export interface PatternAnalysis {
  mainPattern: PatternType;
  description: string;
  confidence: number;
}
