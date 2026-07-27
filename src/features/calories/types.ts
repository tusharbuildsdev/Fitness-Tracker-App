import type { Timestamp } from 'firebase/firestore';

export interface CalorieEntry {
  id: string;
  userId: string;
  dateKey: string;
  consumed: number;
  goal: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CalorieEntryInput {
  dateKey: string;
  consumed: number;
  goal: number;
}

export type CaloriesStackParamList = {
  CaloriesTracker: undefined;
};
