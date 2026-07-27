import { useCallback, useEffect, useMemo, useState } from 'react';

import { saveCalorieEntry, subscribeToCaloriesHistory } from '../services/caloriesService';
import type { CalorieEntry, CalorieEntryInput } from '../types';
import { getLocalDateKey } from '../../../utils/date';

const todayKey = getLocalDateKey();

export const useCalories = (userId?: string) => {
  const [history, setHistory] = useState<CalorieEntry[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) { setHistory([]); setIsLoading(false); return; }
    setIsLoading(true);
    return subscribeToCaloriesHistory(userId, (entries) => { setHistory(entries); setError(null); setIsLoading(false); }, (nextError) => { setError(nextError.message); setIsLoading(false); });
  }, [userId]);

  const save = useCallback(async (input: CalorieEntryInput) => {
    if (!userId) throw new Error('You must be signed in to save calories.');
    await saveCalorieEntry(userId, input);
  }, [userId]);

  const today = useMemo(() => history.find((entry) => entry.dateKey === todayKey), [history]);
  return { history, today, isLoading, error, save };
};
