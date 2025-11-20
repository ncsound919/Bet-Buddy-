/**
 * Global styles and styled-components utilities
 */

import styled from 'styled-components/native'

// Container components
export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`

export const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.background};
`

// Card components
export const Card = styled.View`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  padding: ${(props) => props.theme.spacing.md}px;
  margin: ${(props) => props.theme.spacing.sm}px;
  border-radius: ${(props) => props.theme.borderRadius.lg}px;
`

// Text components
export const Title = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
`

export const Heading = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
`

export const BodyText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.md}px;
  font-weight: ${(props) => props.theme.fontWeights.regular};
`

export const Caption = styled.Text`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.fontWeights.regular};
`

// Button components
export const Button = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.borderRadius.md}px;
  align-items: center;
  ${(props) => props.disabled && 'opacity: 0.5;'}
`

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.md}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
`

// Input components
export const Input = styled.TextInput`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.borderRadius.md}px;
  font-size: ${(props) => props.theme.fontSizes.md}px;
  border: 1px solid ${(props) => props.theme.colors.border};
`

// Layout components
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Column = styled.View`
  flex-direction: column;
`

export const Spacer = styled.View`
  height: ${(props) => props.size || props.theme.spacing.md}px;
`

// Divider
export const Divider = styled.View`
  height: 1px;
  background: ${(props) => props.theme.colors.border};
  margin: ${(props) => props.theme.spacing.md}px 0;
`
