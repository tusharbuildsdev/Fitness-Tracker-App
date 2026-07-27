import type { Timestamp } from 'firebase/firestore';

export interface WaterEntry {
  id: string;
  userId: string;
  dateKey: string;
  amountMl: number;
  goalMl: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface WaterEntryInput {
  dateKey: string;
  amountMl: number;
  goalMl: number;
}

export type WaterStackParamList = {
  WaterTracker: undefined;
};
