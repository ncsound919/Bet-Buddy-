import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, KeyboardAvoidingView, Platform } from 'react-native'
import styled from 'styled-components/native'
import { validateEmail } from 'src/utils/validators'

const Container = styled.SafeAreaView`
  flex: 1;
  background: #000;
`

const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding: 24px;
`

const Logo = styled.Text`
  color: #4a90e2;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 48px;
`

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
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

export const Login = ({ onLogin, onNavigateToSignup }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await onLogin(email, password)
    } catch (error) {
      Alert.alert('Login Failed', error.message)
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
          <Logo>🎲</Logo>
          <Title>Welcome Back</Title>
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
          <Button onPress={handleLogin} disabled={loading}>
            <ButtonText>{loading ? 'Logging in...' : 'Login'}</ButtonText>
          </Button>
          <LinkButton onPress={onNavigateToSignup}>
            <LinkText>Don't have an account? Sign up</LinkText>
          </LinkButton>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onNavigateToSignup: PropTypes.func.isRequired,
}
