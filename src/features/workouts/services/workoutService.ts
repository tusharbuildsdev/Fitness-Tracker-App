import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';

import { firestore } from '../../../app/config/firebase';
import type { Workout, WorkoutInput } from '../types';

const workoutsCollection = collection(firestore, 'workouts');

const toWorkout = (id: string, data: Record<string, unknown>): Workout => ({
  id,
  userId: String(data.userId),
  type: data.type as Workout['type'],
  durationMinutes: Number(data.durationMinutes),
  caloriesBurned: Number(data.caloriesBurned),
  notes: String(data.notes ?? ''),
  dateKey: String(data.dateKey),
  performedAt: data.performedAt as Timestamp,
  createdAt: data.createdAt as Timestamp,
  updatedAt: data.updatedAt as Timestamp,
});

export const subscribeToWorkouts = (
  userId: string,
  onChange: (workouts: Workout[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const workoutsQuery = query(
    workoutsCollection,
    where('userId', '==', userId),
    orderBy('dateKey', 'desc'),
  );

  return onSnapshot(
    workoutsQuery,
    (snapshot) => onChange(snapshot.docs.map((entry) => toWorkout(entry.id, entry.data()))),
    (error) => onError(error),
  );
};

export const getWorkoutById = async (workoutId: string): Promise<Workout | null> => {
  const snapshot = await getDoc(doc(workoutsCollection, workoutId));
  return snapshot.exists() ? toWorkout(snapshot.id, snapshot.data()) : null;
};

export const addWorkout = async (userId: string, input: WorkoutInput): Promise<string> => {
  const performedAt = Timestamp.fromDate(new Date(`${input.dateKey}T12:00:00`));
  const reference = await addDoc(workoutsCollection, {
    ...input,
    userId,
    performedAt,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return reference.id;
};

export const updateWorkout = async (workoutId: string, input: WorkoutInput): Promise<void> => {
  await updateDoc(doc(workoutsCollection, workoutId), {
    ...input,
    performedAt: Timestamp.fromDate(new Date(`${input.dateKey}T12:00:00`)),
    updatedAt: serverTimestamp(),
  });
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  await deleteDoc(doc(workoutsCollection, workoutId));
};
