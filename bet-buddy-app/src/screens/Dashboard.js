import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Navbar } from '../components/Navbar'
import { BetList } from '../components/BetList'
import { ChartView } from '../components/ChartView'
import { useBets } from '../hooks/useBets'

export const Dashboard = ({ navigation }) => {
  const { bets } = useBets()

  const handleBetPress = (bet) => {
    navigation.navigate('BetDetail', { betId: bet.id })
  }

  return (
    <View style={styles.container}>
      <Navbar
        title="Dashboard"
        rightAction={{
          label: 'Profile',
          onPress: () => navigation.navigate('Profile'),
        }}
      />
      <ScrollView style={styles.content}>
        <ChartView data={bets} type="line" />
        <BetList bets={bets} onBetPress={handleBetPress} />
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
  },
})
