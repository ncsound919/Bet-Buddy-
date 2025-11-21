import React, { createContext, useState, useEffect } from 'react'
import ApiService from '../services/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check for existing session
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Check if user is already logged in (e.g., from stored token)
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const response = await ApiService.login(email, password)
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('token', response.token)
      return response
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const response = await ApiService.signup(email, password)
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('token', response.token)
      return response
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await ApiService.logout()
      setUser(null)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const updateUser = (userData) => {
    setUser({ ...user, ...userData })
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }))
  }

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
