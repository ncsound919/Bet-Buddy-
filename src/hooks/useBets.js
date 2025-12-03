import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from 'src/services/firebase'

/**
 * Custom hook for managing bets
 * @param {string} userId - User ID
 * @returns {Object} - Bets state and methods
 */
export const useBets = (userId) => {
  const [bets, setBets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setBets([])
      setLoading(false)
      return
    }

    try {
      const betsQuery = query(
        collection(db, 'bets'),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      )

      const unsubscribe = onSnapshot(
        betsQuery,
        (snapshot) => {
          const betsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setBets(betsData)
          setLoading(false)
        },
        (error) => {
          setError(error.message)
          setLoading(false)
        }
      )

      return unsubscribe
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }, [userId])

  const addBet = async (betData) => {
    try {
      setError(null)
      const bet = {
        ...betData,
        userId,
        result: 'pending',
        date: serverTimestamp(),
        payout: betData.stake * betData.odds,
      }

      const docRef = await addDoc(collection(db, 'bets'), bet)
      return docRef.id
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const updateBet = async (betId, updates) => {
    try {
      setError(null)
      const betRef = doc(db, 'bets', betId)
      await updateDoc(betRef, updates)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const updateBetResult = async (betId, result) => {
    try {
      setError(null)
      const betRef = doc(db, 'bets', betId)
      await updateDoc(betRef, { result })
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const deleteBet = async (betId) => {
    try {
      setError(null)
      const betRef = doc(db, 'bets', betId)
      await deleteDoc(betRef)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  return {
    bets,
    loading,
    error,
    addBet,
    updateBet,
    updateBetResult,
    deleteBet,
  }
}
