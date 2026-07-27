import { collection, getDocs, query, where } from 'firebase/firestore';

import { firestore } from '../../../app/config/firebase';
import type { AnalyticsData, AnalyticsDay, AnalyticsPeriod } from '../types';

const toDateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const buildDateKeys = (days: number) => Array.from({ length: days }, (_, index) => { const date = new Date(); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - (days - index - 1)); return toDateKey(date); });

const getCollectionData = async (collectionName: string, userId: string, fromDate: string) => {
  const result = await getDocs(query(collection(firestore, collectionName), where('userId', '==', userId), where('dateKey', '>=', fromDate)));
  return result.docs.map((item) => item.data());
};

export const getAnalyticsData = async (userId: string, period: AnalyticsPeriod): Promise<AnalyticsData> => {
  const length = period === 'week' ? 7 : 30;
  const keys = buildDateKeys(length);
  const [steps, calories, workouts, water, sleep] = await Promise.all([
    getCollectionData('steps', userId, keys[0]!),
    getCollectionData('calories', userId, keys[0]!),
    getCollectionData('workouts', userId, keys[0]!),
    getCollectionData('water', userId, keys[0]!),
    getCollectionData('sleep', userId, keys[0]!),
  ]);
  const daily = new Map<string, AnalyticsDay>(keys.map((dateKey) => [dateKey, { dateKey, steps: 0, calories: 0, workoutMinutes: 0, waterMl: 0, sleepMinutes: 0 }]));
  const add = (dateKey: string, field: keyof Omit<AnalyticsDay, 'dateKey'>, value: number) => { const day = daily.get(dateKey); if (day) day[field] += value; };
  steps.forEach((item) => add(String(item.dateKey), 'steps', Number(item.count ?? 0)));
  calories.forEach((item) => add(String(item.dateKey), 'calories', Number(item.consumed ?? 0)));
  workouts.forEach((item) => add(String(item.dateKey), 'workoutMinutes', Number(item.durationMinutes ?? 0)));
  water.forEach((item) => add(String(item.dateKey), 'waterMl', Number(item.amountMl ?? 0)));
  sleep.forEach((item) => add(String(item.dateKey), 'sleepMinutes', Number(item.durationMinutes ?? 0)));
  return { period, days: keys.map((key) => daily.get(key)!) };
};
