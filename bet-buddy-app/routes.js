import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from './src/hooks/useAuth'

// Import screens
import { Home } from './src/screens/Home'
import { Login } from './src/screens/Login'
import { Signup } from './src/screens/Signup'
import { Dashboard } from './src/screens/Dashboard'
import { BetDetail } from './src/screens/BetDetail'
import { Profile } from './src/screens/Profile'
import { Settings } from './src/screens/Settings'
import { Upgrade } from './src/screens/Upgrade'

const Stack = createStackNavigator()

const AppRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    // You can show a loading screen here
    return null
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        // Authenticated routes
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="BetDetail" component={BetDetail} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Upgrade" component={Upgrade} />
        </>
      ) : (
        // Unauthenticated routes
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppRoutes
