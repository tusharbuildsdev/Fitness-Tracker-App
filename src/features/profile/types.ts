import type { Timestamp } from 'firebase/firestore';

export interface UserGoals {
  steps: number;
  calories: number;
  waterMl: number;
  sleepHours: number;
  workoutMinutesWeekly: number;
  targetWeightKg?: number;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  heightCm?: number;
  goals: UserGoals;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ProfileInput {
  displayName: string;
  avatarUrl: string;
  heightCm?: number;
  goals: UserGoals;
}

export type ProfileStackParamList = { Profile: undefined };
