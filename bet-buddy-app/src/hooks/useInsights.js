import { useState, useEffect } from 'react'
import { useBets } from './useBets'

export const useInsights = () => {
  const { bets } = useBets()
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    calculateInsights()
  }, [bets])

  const calculateInsights = () => {
    setLoading(true)
    
    // Calculate win rate
    const totalBets = bets.length
    const wonBets = bets.filter(bet => bet.status === 'won').length
    const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0

    // Calculate ROI
    const totalStake = bets.reduce((sum, bet) => sum + Number(bet.stake || 0), 0)
    const totalReturn = bets
      .filter(bet => bet.status === 'won')
      .reduce((sum, bet) => sum + (Number(bet.stake || 0) * Number(bet.odds || 0)), 0)
    const roi = totalStake > 0 ? ((totalReturn - totalStake) / totalStake) * 100 : 0

    setInsights([
      {
        id: 'winRate',
        title: 'Win Rate',
        description: 'Your overall win rate',
        value: `${winRate.toFixed(1)}%`,
      },
      {
        id: 'roi',
        title: 'ROI',
        description: 'Return on investment',
        value: `${roi > 0 ? '+' : ''}${roi.toFixed(1)}%`,
      },
      {
        id: 'totalBets',
        title: 'Total Bets',
        description: 'Number of bets placed',
        value: totalBets,
      },
    ])
    
    setLoading(false)
  }

  return { insights, loading, refreshInsights: calculateInsights }
}
