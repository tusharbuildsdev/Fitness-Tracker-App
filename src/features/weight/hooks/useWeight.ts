import { useCallback, useEffect, useMemo, useState } from 'react';

import { saveWeightEntry, subscribeToWeightHistory } from '../services/weightService';
import type { WeightEntry, WeightEntryInput } from '../types';

export const useWeight = (userId?: string) => {
  const [history, setHistory] = useState<WeightEntry[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!userId) { setHistory([]); setIsLoading(false); return; }
    setIsLoading(true);
    return subscribeToWeightHistory(userId, (entries) => { setHistory(entries); setError(null); setIsLoading(false); }, (nextError) => { setError(nextError.message); setIsLoading(false); });
  }, [userId]);
  const save = useCallback(async (input: WeightEntryInput) => { if (!userId) throw new Error('You must be signed in to save weight.'); await saveWeightEntry(userId, input); }, [userId]);
  const latest = history[0];
  const weeklyChange = useMemo(() => {
    if (!latest || history.length < 2) return 0;
    return latest.weightKg - history[Math.min(6, history.length - 1)]!.weightKg;
  }, [history, latest]);
  return { history, latest, weeklyChange, isLoading, error, save };
};
