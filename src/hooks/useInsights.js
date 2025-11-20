import { useState, useEffect } from 'react'
import { generateInsights, calculateStats } from 'src/services/insights'

/**
 * Custom hook for generating insights from bets
 * @param {Array} bets - Array of bet objects
 * @returns {Object} - Insights and statistics
 */
export const useInsights = (bets) => {
  const [insights, setInsights] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      setLoading(true)

      // Calculate statistics
      const calculatedStats = calculateStats(bets)
      setStats(calculatedStats)

      // Generate insights
      const generatedInsights = generateInsights(bets)
      setInsights(generatedInsights)

      setLoading(false)
    } catch (error) {
      console.error('Error generating insights:', error)
      setLoading(false)
    }
  }, [bets])

  return {
    insights,
    stats,
    loading,
  }
}
