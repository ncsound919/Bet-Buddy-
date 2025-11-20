import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, KeyboardAvoidingView, Platform } from 'react-native'
import styled from 'styled-components/native'
import { validateEmail } from 'src/utils/validators'

const Container = styled.SafeAreaView`
  flex: 1;
  background: #000;
`

const Content = styled.ScrollView`
  flex: 1;
  padding: 24px;
`

const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 32px;
  text-align: center;
`

const Input = styled.TextInput`
  background: #1a1a1a;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  border: 1px solid #333;
`

const Button = styled.TouchableOpacity`
  background: #4a90e2;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`

const LinkButton = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
`

const LinkText = styled.Text`
  color: #4a90e2;
  font-size: 14px;
`

export const Signup = ({ onSignup, onNavigateToLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await onSignup(email, password)
    } catch (error) {
      Alert.alert('Signup Failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Content>
          <Title>Create Account</Title>
          <Input
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button onPress={handleSignup} disabled={loading}>
            <ButtonText>{loading ? 'Creating Account...' : 'Sign Up'}</ButtonText>
          </Button>
          <LinkButton onPress={onNavigateToLogin}>
            <LinkText>Already have an account? Login</LinkText>
          </LinkButton>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}

Signup.propTypes = {
  onSignup: PropTypes.func.isRequired,
  onNavigateToLogin: PropTypes.func.isRequired,
}
