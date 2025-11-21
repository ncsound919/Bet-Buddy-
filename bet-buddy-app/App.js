import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/contexts/AuthContext'
import { BetProvider } from './src/contexts/BetContext'
import AppRoutes from './routes'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <BetProvider>
          <AppRoutes />
        </BetProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
