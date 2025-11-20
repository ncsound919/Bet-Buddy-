import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Text, useTheme, ActivityIndicator, Chip } from 'react-native-paper';
import { AuthService } from '../../services/authService';
import { BetService } from '../../services/betService';
import { InsightsService } from '../../services/insightsService';
import { Insight } from '../../models/Insight';
import { spacing } from '../../theme/theme';

const InsightsScreen: React.FC = () => {
  const theme = useTheme();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadInsights = async () => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) return;

      const bets = await BetService.getUserBets(user.uid);
      const generatedInsights = InsightsService.generateInsights(bets);
      setInsights(generatedInsights);
    } catch (error) {
      console.error('Error loading insights:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadInsights();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const getInsightIcon = (type: string): string => {
    switch (type) {
      case 'WIN_RATE':
        return '📊';
      case 'PROFIT_TREND':
        return '📈';
      case 'BEST_BET_TYPE':
        return '⭐';
      case 'WORST_BET_TYPE':
        return '⚠️';
      case 'SPORT_PERFORMANCE':
        return '🏆';
      case 'ODDS_ANALYSIS':
        return '🎯';
      case 'STREAK':
        return '🔥';
      case 'BANKROLL':
        return '💰';
      default:
        return '💡';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text variant="headlineMedium">Your Insights 💡</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Personalized learning from your betting patterns
        </Text>
      </View>

      {insights.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              No insights yet 🎯
            </Text>
            <Text variant="bodyMedium" style={styles.emptyDescription}>
              Add at least 3 bets to unlock personalized insights and learn from your patterns
            </Text>
          </Card.Content>
        </Card>
      ) : (
        insights.map((insight) => (
          <Card key={insight.id} style={styles.insightCard}>
            <Card.Content>
              <View style={styles.insightHeader}>
                <Text variant="displaySmall" style={styles.insightIcon}>
                  {getInsightIcon(insight.type)}
                </Text>
                <Chip mode="outlined" style={styles.insightType}>
                  {insight.type.replace('_', ' ')}
                </Chip>
              </View>

              <Text variant="titleLarge" style={styles.insightTitle}>
                {insight.title}
              </Text>

              <Text variant="bodyMedium" style={styles.insightDescription}>
                {insight.description}
              </Text>

              <View style={styles.actionableContainer}>
                <Text variant="labelLarge" style={styles.actionableLabel}>
                  💡 What to do:
                </Text>
                <Text variant="bodyMedium" style={styles.actionableText}>
                  {insight.actionable}
                </Text>
              </View>

              {insight.data && (
                <View style={styles.dataContainer}>
                  <View style={styles.dataItem}>
                    <Text variant="labelSmall" style={styles.dataLabel}>
                      {insight.data.metric}
                    </Text>
                    <Text variant="titleLarge" style={styles.dataValue}>
                      {typeof insight.data.value === 'number' && insight.data.value < 1
                        ? `${(insight.data.value * 100).toFixed(1)}%`
                        : insight.data.value
                      }
                    </Text>
                  </View>
                  {insight.data.comparison && (
                    <View style={styles.dataItem}>
                      <Text variant="labelSmall" style={styles.dataLabel}>
                        {insight.data.comparison.label}
                      </Text>
                      <Text variant="titleLarge" style={styles.dataValue}>
                        {insight.data.comparison.value}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </Card.Content>
          </Card>
        ))
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
    padding: spacing.lg
  },
  subtitle: {
    marginTop: spacing.sm,
    color: '#757575'
  },
  emptyCard: {
    margin: spacing.lg,
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
  insightCard: {
    margin: spacing.lg,
    marginTop: 0,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2'
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  insightIcon: {
    fontSize: 40
  },
  insightType: {
    height: 28
  },
  insightTitle: {
    marginBottom: spacing.md,
    fontWeight: 'bold'
  },
  insightDescription: {
    marginBottom: spacing.md,
    color: '#424242'
  },
  actionableContainer: {
    backgroundColor: '#E3F2FD',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md
  },
  actionableLabel: {
    marginBottom: spacing.xs,
    fontWeight: 'bold',
    color: '#1976D2'
  },
  actionableText: {
    color: '#424242'
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0'
  },
  dataItem: {
    alignItems: 'center'
  },
  dataLabel: {
    color: '#757575',
    marginBottom: spacing.xs
  },
  dataValue: {
    fontWeight: 'bold',
    color: '#1976D2'
  }
});

export default InsightsScreen;
