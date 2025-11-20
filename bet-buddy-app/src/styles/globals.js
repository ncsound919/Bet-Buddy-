import { StyleSheet } from 'react-native'
import theme from './theme'

// Global stylesheet for common styles across the application

export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  contentContainer: {
    padding: theme.spacing.md,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  
  // Card styles
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  
  // Text styles
  title: {
    fontSize: theme.typography.fontSizes.xxxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  
  subtitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  
  heading: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  
  body: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.fontSizes.md * theme.typography.lineHeights.normal,
  },
  
  caption: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  
  // Input styles
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSizes.md,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  
  inputFocused: {
    borderColor: theme.colors.primary,
  },
  
  inputError: {
    borderColor: theme.colors.error,
  },
  
  // Button styles
  button: {
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold,
  },
  
  buttonDisabled: {
    opacity: 0.5,
  },
  
  // Utility styles
  row: {
    flexDirection: 'row',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  alignCenter: {
    alignItems: 'center',
  },
  
  textCenter: {
    textAlign: 'center',
  },
  
  mt: {
    marginTop: theme.spacing.md,
  },
  
  mb: {
    marginBottom: theme.spacing.md,
  },
  
  mx: {
    marginHorizontal: theme.spacing.md,
  },
  
  my: {
    marginVertical: theme.spacing.md,
  },
  
  pt: {
    paddingTop: theme.spacing.md,
  },
  
  pb: {
    paddingBottom: theme.spacing.md,
  },
  
  px: {
    paddingHorizontal: theme.spacing.md,
  },
  
  py: {
    paddingVertical: theme.spacing.md,
  },
})

export default globalStyles
