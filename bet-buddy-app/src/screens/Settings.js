import React, { useState } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import { Navbar } from '../components/Navbar'

export const Settings = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSync, setAutoSync] = useState(true)

  return (
    <View style={styles.container}>
      <Navbar title="Settings" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.setting}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.label}>Auto Sync</Text>
          <Switch value={autoSync} onValueChange={setAutoSync} />
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
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
  },
})
