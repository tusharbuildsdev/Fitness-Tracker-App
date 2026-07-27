import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#7357FF',
    secondary: '#4D5BD5',
    background: '#FAF9FF',
    surface: '#FFFFFF',
    surfaceVariant: '#F0EDFF',
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#C3B5FF',
    secondary: '#BEC4FF',
    background: '#141217',
    surface: '#201E23',
    surfaceVariant: '#302D35',
  },
};
