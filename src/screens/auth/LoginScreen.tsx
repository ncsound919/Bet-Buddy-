import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { AuthService } from '../../services/authService';
import { spacing } from '../../theme/theme';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await AuthService.signInWithEmail(email, password);
      // Navigation will be handled by auth state change in App.tsx
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    Alert.alert(
      'Google Sign-In',
      'Google Sign-In requires additional setup with Google OAuth. Please use email login for now.'
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="displayMedium" style={[styles.title, { color: theme.colors.primary }]}>
          Bet Buddy
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Learn from your own bets
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Login
          </Button>

          <Button
            mode="outlined"
            onPress={handleGoogleSignIn}
            disabled={loading}
            style={styles.button}
            icon="google"
          >
            Sign in with Google
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('SignUp')}
            disabled={loading}
            style={styles.button}
          >
            Don't have an account? Sign Up
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxl * 2
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: 'bold'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: '#757575'
  },
  form: {
    marginTop: spacing.lg
  },
  input: {
    marginBottom: spacing.md
  },
  button: {
    marginBottom: spacing.md
  }
});

export default LoginScreen;
