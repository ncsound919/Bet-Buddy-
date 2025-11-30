import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Navbar } from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'

export const Profile = ({ navigation }) => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Navbar title="Profile" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.email}>{user?.email || 'Not logged in'}</Text>
        <View style={styles.section}>
          <Button
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        <View style={styles.section}>
          <Button
            title="Upgrade to Premium"
            onPress={() => navigation.navigate('Upgrade')}
          />
        </View>
        <View style={styles.section}>
          <Button title="Logout" onPress={handleLogout} color="#ff3b30" />
        </View>
      </View>
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
  email: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
})
