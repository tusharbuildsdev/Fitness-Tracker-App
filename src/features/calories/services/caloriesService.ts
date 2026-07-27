import { collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, type Unsubscribe } from 'firebase/firestore';

import { firestore } from '../../../app/config/firebase';
import type { CalorieEntry, CalorieEntryInput } from '../types';

const caloriesCollection = collection(firestore, 'calories');

const toCalorieEntry = (id: string, data: Record<string, unknown>): CalorieEntry => ({
  id,
  userId: String(data.userId),
  dateKey: String(data.dateKey),
  consumed: Number(data.consumed ?? 0),
  goal: Number(data.goal ?? 2_000),
  createdAt: data.createdAt as CalorieEntry['createdAt'],
  updatedAt: data.updatedAt as CalorieEntry['updatedAt'],
});

export const subscribeToCaloriesHistory = (userId: string, onChange: (entries: CalorieEntry[]) => void, onError: (error: Error) => void): Unsubscribe => {
  const historyQuery = query(caloriesCollection, where('userId', '==', userId), orderBy('dateKey', 'desc'), limit(14));
  return onSnapshot(historyQuery, (snapshot) => onChange(snapshot.docs.map((entry) => toCalorieEntry(entry.id, entry.data()))), onError);
};

export const saveCalorieEntry = async (userId: string, input: CalorieEntryInput): Promise<void> => {
  await setDoc(doc(caloriesCollection, `${userId}_${input.dateKey}`), { ...input, userId, updatedAt: serverTimestamp(), createdAt: serverTimestamp() }, { merge: true });
};
