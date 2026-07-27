import type { Timestamp } from 'firebase/firestore';

export const WORKOUT_TYPES = [
  'Strength Training',
  'Running',
  'Cycling',
  'Yoga',
  'Swimming',
  'HIIT',
  'Walking',
  'Other',
] as const;

export type WorkoutType = (typeof WORKOUT_TYPES)[number];

export interface Workout {
  id: string;
  userId: string;
  type: WorkoutType;
  durationMinutes: number;
  caloriesBurned: number;
  notes: string;
  dateKey: string;
  performedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface WorkoutInput {
  type: WorkoutType;
  durationMinutes: number;
  caloriesBurned: number;
  notes: string;
  dateKey: string;
}

export type WorkoutStackParamList = {
  WorkoutList: undefined;
  AddWorkout: undefined;
  EditWorkout: { workout: Workout };
  WorkoutDetails: { workoutId: string };
};
