import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { AuthProvider } from '../../contexts/AuthContext'
import { Login } from '../../screens/Login'

// Mock navigation
const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}))

describe('Authentication Integration', () => {
  it('should render login screen', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <Login navigation={{ navigate: mockNavigate }} />
      </AuthProvider>
    )

    expect(getByPlaceholderText('Email')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
    expect(getByText('Login')).toBeTruthy()
  })

  it('should allow user to type credentials', () => {
    const { getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={{ navigate: mockNavigate }} />
      </AuthProvider>
    )

    const emailInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')

    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')

    expect(emailInput.props.value).toBe('test@example.com')
    expect(passwordInput.props.value).toBe('password123')
  })
})
