export type AnalyticsPeriod = 'week' | 'month';

export interface AnalyticsDay {
  dateKey: string;
  steps: number;
  calories: number;
  workoutMinutes: number;
  waterMl: number;
  sleepMinutes: number;
}

export interface AnalyticsData {
  period: AnalyticsPeriod;
  days: AnalyticsDay[];
}

export interface ProgressComparison {
  label: string;
  current: number;
  previous: number;
  unit: string;
  color: string;
}

export type AnalyticsStackParamList = { Analytics: undefined };
