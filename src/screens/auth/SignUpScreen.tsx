import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { AuthService } from '../../services/authService';
import { spacing } from '../../theme/theme';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await AuthService.signUpWithEmail(email, password, displayName || undefined);
      // Navigation will be handled by auth state change in App.tsx
      navigation.navigate('Onboarding');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="displayMedium" style={[styles.title, { color: theme.colors.primary }]}>
          Create Account
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Start tracking your bets today
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Display Name (Optional)"
            value={displayName}
            onChangeText={setDisplayName}
            mode="outlined"
            style={styles.input}
          />
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
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Sign Up
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
            style={styles.button}
          >
            Already have an account? Login
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

export default SignUpScreen;
