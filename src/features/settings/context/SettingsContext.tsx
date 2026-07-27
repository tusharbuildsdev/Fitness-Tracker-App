import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { defaultSettings, loadSettings, persistSettings } from '../services/settingsStorage';
import type { AppSettings } from '../types';

interface SettingsContextValue {
  settings: AppSettings;
  isLoading: boolean;
  updateSettings: (changes: Partial<AppSettings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { loadSettings().then(setSettings).finally(() => setIsLoading(false)); }, []);
  const updateSettings = useCallback(async (changes: Partial<AppSettings>) => {
    const nextSettings = { ...settings, ...changes };
    setSettings(nextSettings);
    await persistSettings(nextSettings);
  }, [settings]);
  const value = useMemo(() => ({ settings, isLoading, updateSettings }), [isLoading, settings, updateSettings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider.');
  return context;
};
