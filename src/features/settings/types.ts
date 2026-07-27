export type ThemePreference = 'system' | 'light' | 'dark';
export type UnitPreference = 'metric' | 'imperial';

export interface AppSettings {
  theme: ThemePreference;
  notificationsEnabled: boolean;
  units: UnitPreference;
}

export type SettingsStackParamList = {
  Settings: undefined;
  Privacy: undefined;
  About: undefined;
};
