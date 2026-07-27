import { doc, onSnapshot, serverTimestamp, setDoc, type Unsubscribe } from 'firebase/firestore';

import { firestore } from '../../../app/config/firebase';
import type { ProfileInput, UserProfile } from '../types';

const defaultGoals = { steps: 10_000, calories: 2_000, waterMl: 2_500, sleepHours: 8, workoutMinutesWeekly: 150 };
const profileReference = (userId: string) => doc(firestore, 'users', userId);

export const subscribeToProfile = (userId: string, email: string | null, displayName: string | null, onChange: (profile: UserProfile) => void, onError: (error: Error) => void): Unsubscribe => onSnapshot(profileReference(userId), (snapshot) => {
  const data = snapshot.data();
  onChange({ id: userId, email: String(data?.email ?? email ?? ''), displayName: String(data?.displayName ?? displayName ?? 'FitTrack member'), avatarUrl: data?.avatarUrl as string | undefined, heightCm: data?.heightCm as number | undefined, goals: { ...defaultGoals, ...(data?.goals as Partial<UserProfile['goals']> | undefined) }, createdAt: data?.createdAt as UserProfile['createdAt'], updatedAt: data?.updatedAt as UserProfile['updatedAt'] });
}, onError);

export const saveProfile = async (userId: string, email: string, input: ProfileInput): Promise<void> => {
  await setDoc(profileReference(userId), { ...input, email, updatedAt: serverTimestamp(), createdAt: serverTimestamp() }, { merge: true });
};
