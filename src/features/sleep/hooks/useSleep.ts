import { useCallback, useEffect, useMemo, useState } from 'react';

import { saveSleepEntry, subscribeToSleepHistory } from '../services/sleepService';
import type { SleepEntry, SleepEntryInput } from '../types';
import { getLocalDateKey } from '../../../utils/date';

const todayKey = getLocalDateKey();

export const useSleep = (userId?: string) => {
  const [history, setHistory] = useState<SleepEntry[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!userId) { setHistory([]); setIsLoading(false); return; }
    setIsLoading(true);
    return subscribeToSleepHistory(userId, (entries) => { setHistory(entries); setError(null); setIsLoading(false); }, (nextError) => { setError(nextError.message); setIsLoading(false); });
  }, [userId]);
  const save = useCallback(async (input: SleepEntryInput) => { if (!userId) throw new Error('You must be signed in to save sleep.'); await saveSleepEntry(userId, input); }, [userId]);
  const today = useMemo(() => history.find((entry) => entry.dateKey === todayKey), [history]);
  return { history, today, isLoading, error, save };
};
