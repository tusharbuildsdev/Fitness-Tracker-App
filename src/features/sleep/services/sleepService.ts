import { Timestamp, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, type Unsubscribe } from 'firebase/firestore';

import { firestore } from '../../../app/config/firebase';
import type { SleepEntry, SleepEntryInput } from '../types';

const sleepCollection = collection(firestore, 'sleep');
const toLocalDateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const toSleepEntry = (id: string, data: Record<string, unknown>): SleepEntry => ({ id, userId: String(data.userId), dateKey: String(data.dateKey), startAt: data.startAt as Timestamp, endAt: data.endAt as Timestamp, durationMinutes: Number(data.durationMinutes), createdAt: data.createdAt as SleepEntry['createdAt'], updatedAt: data.updatedAt as SleepEntry['updatedAt'] });

export const subscribeToSleepHistory = (userId: string, onChange: (entries: SleepEntry[]) => void, onError: (error: Error) => void): Unsubscribe => {
  const sleepQuery = query(sleepCollection, where('userId', '==', userId), orderBy('dateKey', 'desc'), limit(14));
  return onSnapshot(sleepQuery, (snapshot) => onChange(snapshot.docs.map((entry) => toSleepEntry(entry.id, entry.data()))), onError);
};

export const saveSleepEntry = async (userId: string, input: SleepEntryInput): Promise<void> => {
  const dateKey = toLocalDateKey(input.startAt);
  const durationMinutes = Math.round((input.endAt.valueOf() - input.startAt.valueOf()) / 60_000);
  await setDoc(doc(sleepCollection, `${userId}_${dateKey}`), { userId, dateKey, startAt: Timestamp.fromDate(input.startAt), endAt: Timestamp.fromDate(input.endAt), durationMinutes, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
};
