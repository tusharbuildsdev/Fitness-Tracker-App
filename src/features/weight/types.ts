import type { Timestamp } from 'firebase/firestore';

export interface WeightEntry {
  id: string;
  userId: string;
  dateKey: string;
  weightKg: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface WeightEntryInput { dateKey: string; weightKg: number; }
export type WeightStackParamList = { WeightTracker: undefined; };
