import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import type { PropsWithChildren } from 'react';

import { darkTheme, lightTheme } from '../../../theme/appTheme';
import { useSettings } from './SettingsContext';

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark' || (settings.theme === 'system' && systemScheme === 'dark');
  return <PaperProvider theme={isDark ? darkTheme : lightTheme}>{children}</PaperProvider>;
}
