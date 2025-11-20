/**
 * Application theme configuration
 */

export const theme = {
  colors: {
    primary: '#4a90e2',
    primaryDark: '#357abd',
    primaryLight: '#6ba3e8',

    background: '#000',
    backgroundSecondary: '#1a1a1a',
    backgroundTertiary: '#2a2a2a',

    text: '#fff',
    textSecondary: '#aaa',
    textTertiary: '#666',

    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',

    border: '#333',
    borderLight: '#444',

    transparent: 'transparent',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999,
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
  },

  breakpoints: {
    sm: 320,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
}

export default theme
