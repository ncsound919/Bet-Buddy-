import React, { createContext, useState, useEffect } from 'react'
import ApiService from '../services/api'
import { useAuth } from '../hooks/useAuth'

export const BetContext = createContext(null)

export const BetProvider = ({ children }) => {
  const [bets, setBets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadBets()
    }
  }, [user])

  const loadBets = async () => {
    try {
      setLoading(true)
      setError(null)
      const userBets = await ApiService.getBets(user.id)
      setBets(userBets)
    } catch (error) {
      setError(error.message)
      console.error('Failed to load bets:', error)
    } finally {
      setLoading(false)
    }
  }

  const addBet = async (betData) => {
    try {
      setLoading(true)
      setError(null)
      const newBet = await ApiService.createBet({
        ...betData,
        userId: user.id,
      })
      setBets([...bets, newBet])
      return newBet
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateBet = async (betId, betData) => {
    try {
      setLoading(true)
      setError(null)
      const updatedBet = await ApiService.updateBet(betId, betData)
      setBets(bets.map(bet => (bet.id === betId ? updatedBet : bet)))
      return updatedBet
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteBet = async (betId) => {
    try {
      setLoading(true)
      setError(null)
      await ApiService.deleteBet(betId)
      setBets(bets.filter(bet => bet.id !== betId))
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getBetById = (betId) => {
    return bets.find(bet => bet.id === betId)
  }

  const value = {
    bets,
    loading,
    error,
    loadBets,
    addBet,
    updateBet,
    deleteBet,
    getBetById,
  }

  return <BetContext.Provider value={value}>{children}</BetContext.Provider>
}
