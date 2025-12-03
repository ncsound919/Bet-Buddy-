import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1976D2',
    secondary: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    success: '#4CAF50',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    profit: '#4CAF50',
    loss: '#F44336',
    pending: '#FF9800'
  }
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#64B5F6',
    secondary: '#81C784',
    error: '#EF5350',
    warning: '#FFB74D',
    success: '#81C784',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    profit: '#81C784',
    loss: '#EF5350',
    pending: '#FFB74D'
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 999
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20
  },
  label: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16
  }
};
