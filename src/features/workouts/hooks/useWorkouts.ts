import { useCallback, useEffect, useState } from 'react';

import { deleteWorkout, subscribeToWorkouts } from '../services/workoutService';
import type { Workout } from '../types';

export const useWorkouts = (userId?: string) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setWorkouts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = subscribeToWorkouts(
      userId,
      (nextWorkouts) => {
        setWorkouts(nextWorkouts);
        setError(null);
        setIsLoading(false);
      },
      (nextError) => {
        setError(nextError.message);
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, [userId]);

  const removeWorkout = useCallback(async (workoutId: string) => {
    await deleteWorkout(workoutId);
  }, []);

  return { workouts, isLoading, error, removeWorkout };
};
