import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  background: #1a1a1a;
  padding: 20px;
  margin: 16px;
  border-radius: 12px;
`

const Title = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`

const StatRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #2a2a2a;
`

const StatLabel = styled.Text`
  color: #aaa;
  font-size: 14px;
`

const StatValue = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`

const ChartPlaceholder = styled.View`
  height: 200px;
  background: #2a2a2a;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`

const PlaceholderText = styled.Text`
  color: #666;
  font-size: 14px;
`

export const ChartView = ({ data }) => {
  const { totalBets, wins, losses, winRate, totalProfit } = data

  return (
    <ScrollView>
      <Container>
        <Title>Betting Statistics</Title>
        <StatRow>
          <StatLabel>Total Bets</StatLabel>
          <StatValue>{totalBets}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Wins</StatLabel>
          <StatValue style={{ color: '#4caf50' }}>{wins}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Losses</StatLabel>
          <StatValue style={{ color: '#f44336' }}>{losses}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Win Rate</StatLabel>
          <StatValue>{winRate}%</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Total Profit/Loss</StatLabel>
          <StatValue style={{ color: totalProfit >= 0 ? '#4caf50' : '#f44336' }}>
            ${totalProfit.toFixed(2)}
          </StatValue>
        </StatRow>
        <ChartPlaceholder>
          <PlaceholderText>Chart visualization coming soon</PlaceholderText>
        </ChartPlaceholder>
      </Container>
    </ScrollView>
  )
}

ChartView.propTypes = {
  data: PropTypes.shape({
    totalBets: PropTypes.number.isRequired,
    wins: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    winRate: PropTypes.number.isRequired,
    totalProfit: PropTypes.number.isRequired,
  }).isRequired,
}
