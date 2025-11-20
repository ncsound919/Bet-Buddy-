import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, useTheme, Card } from 'react-native-paper';
import { spacing } from '../../theme/theme';

const OnboardingScreen: React.FC = () => {
  const theme = useTheme();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Bet Buddy! 🎯',
      description: 'Track your bets and learn from your patterns. We help you become a smarter bettor.',
      icon: '🎯'
    },
    {
      title: 'Add Your Bets 📝',
      description: 'Quickly log bets manually or upload a slip photo. We\'ll extract the details for you.',
      icon: '📝'
    },
    {
      title: 'Get Instant Insights 💡',
      description: 'After just 3 bets, we analyze your patterns and give you actionable tips to improve.',
      icon: '💡'
    },
    {
      title: 'Track Your Progress 📈',
      description: 'See your bankroll, win rate, and profit trends in one simple dashboard.',
      icon: '📈'
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    // Complete onboarding - user will see the main app
    setStep(steps.length - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.stepIndicator}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index <= step ? theme.colors.primary : '#E0E0E0'
                }
              ]}
            />
          ))}
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="displaySmall" style={styles.icon}>
              {currentStep.icon}
            </Text>
            <Text variant="headlineMedium" style={styles.title}>
              {currentStep.title}
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              {currentStep.description}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          {step < steps.length - 1 ? (
            <>
              <Button
                mode="contained"
                onPress={handleNext}
                style={styles.button}
              >
                Next
              </Button>
              <Button
                mode="text"
                onPress={handleSkip}
                style={styles.button}
              >
                Skip
              </Button>
            </>
          ) : (
            <Button
              mode="contained"
              onPress={handleSkip}
              style={styles.button}
            >
              Get Started
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center'
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5
  },
  card: {
    marginBottom: spacing.xl,
    elevation: 4
  },
  icon: {
    textAlign: 'center',
    fontSize: 80,
    marginBottom: spacing.lg
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    color: '#757575',
    lineHeight: 24
  },
  buttonContainer: {
    marginTop: spacing.lg
  },
  button: {
    marginBottom: spacing.md
  }
});

export default OnboardingScreen;
