import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AppSettings } from '../types';

const storageKey = '@fittrack-pro/settings';
export const defaultSettings: AppSettings = { theme: 'system', notificationsEnabled: false, units: 'metric' };

export const loadSettings = async (): Promise<AppSettings> => {
  const value = await AsyncStorage.getItem(storageKey);
  if (!value) return defaultSettings;
  return { ...defaultSettings, ...(JSON.parse(value) as Partial<AppSettings>) };
};

export const persistSettings = async (settings: AppSettings): Promise<void> => {
  await AsyncStorage.setItem(storageKey, JSON.stringify(settings));
};
