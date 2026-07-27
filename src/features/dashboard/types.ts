export type DashboardMetricKey =
  | 'steps'
  | 'calories'
  | 'workout'
  | 'water'
  | 'sleep';

export interface DashboardMetric {
  key: DashboardMetricKey;
  label: string;
  value: number;
  goal: number;
  unit: string;
  icon: string;
  color: string;
}

export interface BmiSummary {
  value: number;
  category: 'Underweight' | 'Healthy' | 'Overweight' | 'Obese';
  heightCm: number;
  weightKg: number;
}

export interface WeeklyActivityPoint {
  label: string;
  dateKey: string;
  steps: number;
  caloriesBurned: number;
  workoutMinutes: number;
}

export interface DashboardData {
  dateKey: string;
  metrics: DashboardMetric[];
  bmi: BmiSummary | null;
  weeklyActivity: WeeklyActivityPoint[];
}
