import { collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, type Unsubscribe } from 'firebase/firestore';

import { firestore } from '../../../app/config/firebase';
import type { WaterEntry, WaterEntryInput } from '../types';

const waterCollection = collection(firestore, 'water');
const toWaterEntry = (id: string, data: Record<string, unknown>): WaterEntry => ({ id, userId: String(data.userId), dateKey: String(data.dateKey), amountMl: Number(data.amountMl ?? 0), goalMl: Number(data.goalMl ?? 2_500), createdAt: data.createdAt as WaterEntry['createdAt'], updatedAt: data.updatedAt as WaterEntry['updatedAt'] });

export const subscribeToWaterHistory = (userId: string, onChange: (entries: WaterEntry[]) => void, onError: (error: Error) => void): Unsubscribe => {
  const waterQuery = query(waterCollection, where('userId', '==', userId), orderBy('dateKey', 'desc'), limit(14));
  return onSnapshot(waterQuery, (snapshot) => onChange(snapshot.docs.map((entry) => toWaterEntry(entry.id, entry.data()))), onError);
};

export const saveWaterEntry = async (userId: string, input: WaterEntryInput): Promise<void> => {
  await setDoc(doc(waterCollection, `${userId}_${input.dateKey}`), { ...input, userId, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
};
