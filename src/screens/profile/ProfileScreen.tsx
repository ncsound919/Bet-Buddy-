import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, List, Divider, Switch, useTheme } from 'react-native-paper';
import { AuthService } from '../../services/authService';
import { User } from '../../models/User';
import { spacing } from '../../theme/theme';

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [weeklyNotifs, setWeeklyNotifs] = useState(true);
  const [insightNotifs, setInsightNotifs] = useState(true);
  const [leaderboardOptIn, setLeaderboardOptIn] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      const userData = await AuthService.getUserDocument(currentUser.uid);
      if (userData) {
        setUser(userData);
        setWeeklyNotifs(userData.settings.notifications.weekly);
        setInsightNotifs(userData.settings.notifications.insights);
        setLeaderboardOptIn(userData.settings.privacy.leaderboardOptIn);
      }
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await AuthService.signOut();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to sign out');
            }
          }
        }
      ]
    );
  };

  const handleUpgradeToPro = () => {
    Alert.alert(
      'Upgrade to Pro',
      'Unlock unlimited bets, advanced insights, and more for just $5/month!',
      [
        { text: 'Maybe Later', style: 'cancel' },
        {
          text: 'Upgrade Now',
          onPress: () => {
            Alert.alert('Coming Soon', 'Payment integration is being configured.');
          }
        }
      ]
    );
  };

  const handleReferral = () => {
    Alert.alert(
      'Share & Earn',
      'Refer a friend and both get a free Pro month! Share your referral code: ' + (user?.id.substring(0, 8).toUpperCase() || 'N/A')
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text variant="displayMedium">
                {user?.displayName?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text variant="titleLarge" style={styles.displayName}>
                {user?.displayName || 'Bet Buddy User'}
              </Text>
              <Text variant="bodyMedium" style={styles.email}>
                {user?.email}
              </Text>
              {user?.isPro && (
                <View style={styles.proBadge}>
                  <Text variant="labelLarge" style={styles.proText}>
                    ⭐ PRO MEMBER
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card.Content>
      </Card>

      {!user?.isPro && (
        <Card style={styles.upgradeCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.upgradeTitle}>
              ⭐ Upgrade to Pro
            </Text>
            <Text variant="bodyMedium" style={styles.upgradeDescription}>
              • Unlimited bets and OCR uploads{'\n'}
              • Advanced trend explorer{'\n'}
              • Custom filters and exports{'\n'}
              • Leaderboard access{'\n'}
              • Detailed weekly breakdowns
            </Text>
            <Button mode="contained" onPress={handleUpgradeToPro} style={styles.upgradeButton}>
              Upgrade for $5/month
            </Button>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Statistics
          </Text>
          <List.Item
            title="Total Bets"
            description={user?.stats.totalBets.toString() || '0'}
            left={(props) => <List.Icon {...props} icon="chart-line" />}
          />
          <Divider />
          <List.Item
            title="Total Wins"
            description={user?.stats.totalWins.toString() || '0'}
            left={(props) => <List.Icon {...props} icon="trophy" />}
          />
          <Divider />
          <List.Item
            title="Total Profit"
            description={`$${user?.stats.totalProfit.toFixed(2) || '0.00'}`}
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Notifications
          </Text>
          <List.Item
            title="Weekly Summary"
            description="Receive weekly betting recap emails"
            left={(props) => <List.Icon {...props} icon="email" />}
            right={() => (
              <Switch value={weeklyNotifs} onValueChange={setWeeklyNotifs} />
            )}
          />
          <Divider />
          <List.Item
            title="Insight Alerts"
            description="Get notified about new insights"
            left={(props) => <List.Icon {...props} icon="lightbulb" />}
            right={() => (
              <Switch value={insightNotifs} onValueChange={setInsightNotifs} />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Privacy
          </Text>
          <List.Item
            title="Leaderboard"
            description="Show my stats on anonymous leaderboard (Pro only)"
            left={(props) => <List.Icon {...props} icon="trophy-variant" />}
            right={() => (
              <Switch
                value={leaderboardOptIn}
                onValueChange={setLeaderboardOptIn}
                disabled={!user?.isPro}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Share & Earn
          </Text>
          <Button
            mode="outlined"
            icon="gift"
            onPress={handleReferral}
            style={styles.actionButton}
          >
            Refer a Friend - Get Free Pro Month
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Button
            mode="contained"
            onPress={handleSignOut}
            style={styles.signOutButton}
            buttonColor={theme.colors.error}
          >
            Sign Out
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.footerText}>
          Bet Buddy v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  profileCard: {
    margin: spacing.lg,
    elevation: 4
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg
  },
  profileInfo: {
    flex: 1
  },
  displayName: {
    fontWeight: 'bold',
    marginBottom: spacing.xs
  },
  email: {
    color: '#757575'
  },
  proBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: spacing.sm
  },
  proText: {
    fontWeight: 'bold',
    color: '#000'
  },
  upgradeCard: {
    margin: spacing.lg,
    marginTop: 0,
    backgroundColor: '#E3F2FD',
    elevation: 4
  },
  upgradeTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.md
  },
  upgradeDescription: {
    marginBottom: spacing.md,
    color: '#424242',
    lineHeight: 24
  },
  upgradeButton: {
    marginTop: spacing.sm
  },
  card: {
    margin: spacing.lg,
    marginTop: 0,
    elevation: 2
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.md
  },
  actionButton: {
    marginTop: spacing.sm
  },
  signOutButton: {
    marginTop: spacing.sm
  },
  footer: {
    padding: spacing.lg,
    alignItems: 'center'
  },
  footerText: {
    color: '#757575'
  }
});

export default ProfileScreen;
