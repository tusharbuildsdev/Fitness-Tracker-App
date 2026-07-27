import type { Timestamp } from 'firebase/firestore';

export interface StepEntry {
  id: string;
  userId: string;
  dateKey: string;
  count: number;
  goal: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface StepEntryInput {
  dateKey: string;
  count: number;
  goal: number;
}

export type StepsStackParamList = {
  StepsTracker: undefined;
};
