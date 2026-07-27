import { useCallback, useEffect, useMemo, useState } from 'react';

import { getAnalyticsData } from '../services/analyticsService';
import type { AnalyticsData, AnalyticsPeriod, ProgressComparison } from '../types';

const emptyData = (period: AnalyticsPeriod): AnalyticsData => ({ period, days: [] });
const total = (data: AnalyticsData, key: 'steps' | 'calories' | 'workoutMinutes' | 'waterMl' | 'sleepMinutes') => data.days.reduce((sum, day) => sum + day[key], 0);

export const useAnalytics = (userId: string | undefined, period: AnalyticsPeriod) => {
  const [data, setData] = useState<AnalyticsData>(emptyData(period));
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    if (!userId) { setData(emptyData(period)); setIsLoading(false); return; }
    setIsLoading(true);
    try { setData(await getAnalyticsData(userId, period)); setError(null); } catch (loadError) { setError(loadError instanceof Error ? loadError.message : 'Unable to load analytics.'); } finally { setIsLoading(false); }
  }, [period, userId]);
  useEffect(() => { void load(); }, [load]);
  const comparisons = useMemo<ProgressComparison[]>(() => {
    const midpoint = Math.floor(data.days.length / 2);
    const current = { ...data, days: data.days.slice(midpoint) };
    const previous = { ...data, days: data.days.slice(0, midpoint) };
    return [
      { label: 'Steps', current: total(current, 'steps'), previous: total(previous, 'steps'), unit: 'steps', color: '#7357FF' },
      { label: 'Workout', current: total(current, 'workoutMinutes'), previous: total(previous, 'workoutMinutes'), unit: 'min', color: '#F26A4B' },
      { label: 'Water', current: total(current, 'waterMl'), previous: total(previous, 'waterMl'), unit: 'ml', color: '#2D9CDB' },
      { label: 'Sleep', current: total(current, 'sleepMinutes') / 60, previous: total(previous, 'sleepMinutes') / 60, unit: 'hrs', color: '#4D5BD5' },
    ];
  }, [data]);
  return { data, comparisons, isLoading, error, reload: load };
};
