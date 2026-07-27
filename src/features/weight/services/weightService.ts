import { collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, type Unsubscribe } from 'firebase/firestore';

import { firestore } from '../../../app/config/firebase';
import type { WeightEntry, WeightEntryInput } from '../types';

const weightCollection = collection(firestore, 'weight');
const toWeightEntry = (id: string, data: Record<string, unknown>): WeightEntry => ({ id, userId: String(data.userId), dateKey: String(data.dateKey), weightKg: Number(data.weightKg), createdAt: data.createdAt as WeightEntry['createdAt'], updatedAt: data.updatedAt as WeightEntry['updatedAt'] });

export const subscribeToWeightHistory = (userId: string, onChange: (entries: WeightEntry[]) => void, onError: (error: Error) => void): Unsubscribe => {
  const weightQuery = query(weightCollection, where('userId', '==', userId), orderBy('dateKey', 'desc'), limit(31));
  return onSnapshot(weightQuery, (snapshot) => onChange(snapshot.docs.map((entry) => toWeightEntry(entry.id, entry.data()))), onError);
};

export const saveWeightEntry = async (userId: string, input: WeightEntryInput): Promise<void> => {
  await setDoc(doc(weightCollection, `${userId}_${input.dateKey}`), { ...input, userId, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
};
