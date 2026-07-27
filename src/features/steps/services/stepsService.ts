import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';

import { firestore } from '../../../app/config/firebase';
import type { StepEntry, StepEntryInput } from '../types';

const stepsCollection = collection(firestore, 'steps');

const toStepEntry = (id: string, data: Record<string, unknown>): StepEntry => ({
  id,
  userId: String(data.userId),
  dateKey: String(data.dateKey),
  count: Number(data.count ?? 0),
  goal: Number(data.goal ?? 10_000),
  createdAt: data.createdAt as StepEntry['createdAt'],
  updatedAt: data.updatedAt as StepEntry['updatedAt'],
});

export const subscribeToStepHistory = (
  userId: string,
  onChange: (entries: StepEntry[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const historyQuery = query(
    stepsCollection,
    where('userId', '==', userId),
    orderBy('dateKey', 'desc'),
    limit(14),
  );

  return onSnapshot(
    historyQuery,
    (snapshot) => onChange(snapshot.docs.map((item) => toStepEntry(item.id, item.data()))),
    onError,
  );
};

export const saveStepEntry = async (userId: string, input: StepEntryInput): Promise<void> => {
  const documentId = `${userId}_${input.dateKey}`;
  await setDoc(
    doc(stepsCollection, documentId),
    {
      ...input,
      userId,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
};
