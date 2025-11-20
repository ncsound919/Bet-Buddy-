import { useContext } from 'react'
import { BetContext } from '../contexts/BetContext'

export const useBets = () => {
  const context = useContext(BetContext)
  
  if (!context) {
    throw new Error('useBets must be used within a BetProvider')
  }
  
  return context
}
