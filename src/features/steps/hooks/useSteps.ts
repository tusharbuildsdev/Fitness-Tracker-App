import { useCallback, useEffect, useMemo, useState } from 'react';

import { saveStepEntry, subscribeToStepHistory } from '../services/stepsService';
import type { StepEntry, StepEntryInput } from '../types';
import { getLocalDateKey } from '../../../utils/date';

export const useSteps = (userId?: string) => {
  const [history, setHistory] = useState<StepEntry[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setHistory([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    return subscribeToStepHistory(
      userId,
      (entries) => {
        setHistory(entries);
        setError(null);
        setIsLoading(false);
      },
      (nextError) => {
        setError(nextError.message);
        setIsLoading(false);
      },
    );
  }, [userId]);

  const save = useCallback(async (input: StepEntryInput) => {
    if (!userId) throw new Error('You must be signed in to save steps.');
    await saveStepEntry(userId, input);
  }, [userId]);

  const todayKey = getLocalDateKey();
  const today = useMemo(() => history.find((entry) => entry.dateKey === todayKey), [history, todayKey]);

  return { history, today, isLoading, error, save };
};
