import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const ChartView = ({ data, type = 'line' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chart View</Text>
      <Text style={styles.subtitle}>Type: {type}</Text>
      {/* Chart implementation would go here using a library like react-native-chart-kit */}
      <View style={styles.placeholder}>
        <Text>Chart visualization</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  placeholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
})
