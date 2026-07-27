import { useCallback, useEffect, useMemo, useState } from 'react';

import { saveWaterEntry, subscribeToWaterHistory } from '../services/waterService';
import type { WaterEntry, WaterEntryInput } from '../types';
import { getLocalDateKey } from '../../../utils/date';

const todayKey = getLocalDateKey();

export const useWater = (userId?: string) => {
  const [history, setHistory] = useState<WaterEntry[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!userId) { setHistory([]); setIsLoading(false); return; }
    setIsLoading(true);
    return subscribeToWaterHistory(userId, (entries) => { setHistory(entries); setError(null); setIsLoading(false); }, (nextError) => { setError(nextError.message); setIsLoading(false); });
  }, [userId]);
  const save = useCallback(async (input: WaterEntryInput) => { if (!userId) throw new Error('You must be signed in to save water intake.'); await saveWaterEntry(userId, input); }, [userId]);
  const today = useMemo(() => history.find((entry) => entry.dateKey === todayKey), [history]);
  return { history, today, isLoading, error, save };
};
