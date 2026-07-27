import { useCallback, useEffect, useState } from 'react';

import { saveProfile, subscribeToProfile } from '../services/profileService';
import type { ProfileInput, UserProfile } from '../types';

export const useProfile = (userId?: string, email?: string | null, displayName?: string | null) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!userId) { setProfile(null); setIsLoading(false); return; }
    setIsLoading(true);
    return subscribeToProfile(userId, email ?? null, displayName ?? null, (nextProfile) => { setProfile(nextProfile); setError(null); setIsLoading(false); }, (nextError) => { setError(nextError.message); setIsLoading(false); });
  }, [displayName, email, userId]);
  const save = useCallback(async (input: ProfileInput) => { if (!userId || !email) throw new Error('You must be signed in to save your profile.'); await saveProfile(userId, email, input); }, [email, userId]);
  return { profile, isLoading, error, save };
};
