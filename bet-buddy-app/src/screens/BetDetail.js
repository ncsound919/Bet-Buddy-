import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Navbar } from '../components/Navbar'
import { useBets } from '../hooks/useBets'

export const BetDetail = ({ route, navigation }) => {
  const { betId } = route.params
  const { getBetById } = useBets()
  const bet = getBetById(betId)

  if (!bet) {
    return (
      <View style={styles.container}>
        <Navbar title="Bet Detail" onBack={() => navigation.goBack()} />
        <View style={styles.content}>
          <Text>Bet not found</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Navbar title="Bet Detail" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{bet.teams}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Odds:</Text>
          <Text style={styles.value}>{bet.odds}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Stake:</Text>
          <Text style={styles.value}>${bet.stake}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{bet.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{bet.status || 'Pending'}</Text>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
})
