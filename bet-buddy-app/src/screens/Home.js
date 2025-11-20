import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Navbar } from '../components/Navbar'
import { InsightCard } from '../components/InsightCard'

export const Home = ({ navigation }) => {
  const sampleInsights = [
    { id: '1', title: 'Win Rate', description: 'Your overall win rate', value: '65%' },
    { id: '2', title: 'ROI', description: 'Return on investment', value: '+12.5%' },
  ]

  return (
    <View style={styles.container}>
      <Navbar title="Bet Buddy" />
      <ScrollView style={styles.content}>
        <Text style={styles.welcome}>Welcome to Bet Buddy</Text>
        {sampleInsights.map(insight => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})
