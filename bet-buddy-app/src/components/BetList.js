import React from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const BetList = ({ bets, onBetPress }) => {
  const renderBet = ({ item }) => (
    <TouchableOpacity style={styles.betItem} onPress={() => onBetPress?.(item)}>
      <Text style={styles.teams}>{item.teams}</Text>
      <View style={styles.details}>
        <Text style={styles.odds}>Odds: {item.odds}</Text>
        <Text style={styles.stake}>Stake: ${item.stake}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={bets}
      renderItem={renderBet}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  betItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  teams: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  odds: {
    fontSize: 14,
    color: '#666',
  },
  stake: {
    fontSize: 14,
    color: '#007AFF',
  },
  type: {
    fontSize: 14,
    color: '#888',
  },
})
