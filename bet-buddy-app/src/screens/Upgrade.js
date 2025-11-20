import React from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import { Navbar } from '../components/Navbar'

export const Upgrade = ({ navigation }) => {
  const features = [
    'Unlimited bet tracking',
    'Advanced analytics',
    'Custom insights',
    'OCR bet entry',
    'Export data',
    'Priority support',
  ]

  return (
    <View style={styles.container}>
      <Navbar title="Upgrade to Premium" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Premium Features</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.feature}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
        <View style={styles.pricing}>
          <Text style={styles.price}>$9.99/month</Text>
          <Text style={styles.priceSubtext}>or $99.99/year (save 17%)</Text>
        </View>
        <Button title="Subscribe Now" onPress={() => console.log('Subscribe')} />
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
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkmark: {
    fontSize: 20,
    color: '#34c759',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
  },
  pricing: {
    marginTop: 32,
    marginBottom: 16,
    alignItems: 'center',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  priceSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
})
