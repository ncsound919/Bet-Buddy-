import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Text, useTheme, ActivityIndicator, Button } from 'react-native-paper';
import { AuthService } from '../../services/authService';
import { BetService } from '../../services/betService';
import { Bet } from '../../models/Bet';
import { calculateWinRate, calculateTotalProfit, calculateStreak, formatCurrency } from '../../utils/calculations';
import { spacing } from '../../theme/theme';

const DashboardScreen: React.FC = () => {
  const theme = useTheme();
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);

  const loadDashboardData = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) return;

      const userData = await AuthService.getUserDocument(currentUser.uid);
      setUser(userData);

      // Load last 10 bets for free users, all bets for pro users
      const userBets = await BetService.getUserBets(currentUser.uid, userData?.isPro ? undefined : 10);
      setBets(userBets);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const winRate = calculateWinRate(bets);
  const totalProfit = calculateTotalProfit(bets);
  const streak = calculateStreak(bets);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text variant="headlineMedium">Welcome back{user?.displayName ? `, ${user.displayName}` : ''}! 👋</Text>
        {bets.length > 0 && (
          <Text variant="bodyMedium" style={styles.motivationalText}>
            {totalProfit >= 0 
              ? `You're up ${formatCurrency(totalProfit)} - keep it going!`
              : `Learn and improve - every bet teaches you something!`
            }
          </Text>
        )}
      </View>

      {!user?.isPro && (
        <Card style={styles.proCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.proTitle}>
              ⭐ Upgrade to Pro
            </Text>
            <Text variant="bodyMedium" style={styles.proDescription}>
              Unlock unlimited bets, advanced insights, and trend analysis for just $5/month
            </Text>
            <Button mode="contained" style={styles.proButton}>
              Upgrade Now
            </Button>
          </Card.Content>
        </Card>
      )}

      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.statLabel}>
              Total Bets
            </Text>
            <Text variant="headlineMedium" style={styles.statValue}>
              {bets.length}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.statLabel}>
              Win Rate
            </Text>
            <Text variant="headlineMedium" style={styles.statValue}>
              {(winRate * 100).toFixed(1)}%
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.statLabel}>
              Total Profit
            </Text>
            <Text
              variant="headlineMedium"
              style={[
                styles.statValue,
                { color: totalProfit >= 0 ? theme.colors.success : theme.colors.error }
              ]}
            >
              {formatCurrency(totalProfit)}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.statLabel}>
              Current Streak
            </Text>
            <Text variant="headlineMedium" style={styles.statValue}>
              {streak.current} {streak.type === 'win' ? '🔥' : '❄️'}
            </Text>
          </Card.Content>
        </Card>
      </View>

      {bets.length === 0 && (
        <Card style={styles.emptyCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              No bets yet! 🎯
            </Text>
            <Text variant="bodyMedium" style={styles.emptyDescription}>
              Add your first bet to start learning from your betting patterns
            </Text>
          </Card.Content>
        </Card>
      )}

      {bets.length > 0 && (
        <Card style={styles.recentCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.recentTitle}>
              Recent Bets
            </Text>
            {bets.slice(0, 5).map((bet) => (
              <View key={bet.id} style={styles.betItem}>
                <View style={styles.betInfo}>
                  <Text variant="bodyLarge" style={styles.betDescription}>
                    {bet.description}
                  </Text>
                  <Text variant="bodySmall" style={styles.betMeta}>
                    {bet.sport} • {bet.betType}
                  </Text>
                </View>
                <Text
                  variant="titleMedium"
                  style={[
                    styles.betProfit,
                    { color: (bet.profit || 0) >= 0 ? theme.colors.success : theme.colors.error }
                  ]}
                >
                  {formatCurrency(bet.profit || 0)}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md
  },
  motivationalText: {
    marginTop: spacing.sm,
    color: '#757575'
  },
  proCard: {
    margin: spacing.lg,
    marginTop: 0,
    backgroundColor: '#E3F2FD',
    elevation: 4
  },
  proTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.sm
  },
  proDescription: {
    marginBottom: spacing.md,
    color: '#424242'
  },
  proButton: {
    marginTop: spacing.sm
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md
  },
  statCard: {
    width: '48%',
    margin: '1%',
    elevation: 2
  },
  statLabel: {
    color: '#757575',
    marginBottom: spacing.xs
  },
  statValue: {
    fontWeight: 'bold'
  },
  emptyCard: {
    margin: spacing.lg,
    marginTop: spacing.xl,
    elevation: 4
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: 'bold'
  },
  emptyDescription: {
    textAlign: 'center',
    color: '#757575'
  },
  recentCard: {
    margin: spacing.lg,
    elevation: 4
  },
  recentTitle: {
    marginBottom: spacing.md,
    fontWeight: 'bold'
  },
  betItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  betInfo: {
    flex: 1
  },
  betDescription: {
    fontWeight: '500'
  },
  betMeta: {
    color: '#757575',
    marginTop: spacing.xs
  },
  betProfit: {
    fontWeight: 'bold',
    marginLeft: spacing.md
  }
});

export default DashboardScreen;
