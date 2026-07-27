import type { Timestamp } from 'firebase/firestore';

export interface SleepEntry {
  id: string;
  userId: string;
  dateKey: string;
  startAt: Timestamp;
  endAt: Timestamp;
  durationMinutes: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface SleepEntryInput {
  startAt: Date;
  endAt: Date;
}

export type SleepStackParamList = {
  SleepTracker: undefined;
};
