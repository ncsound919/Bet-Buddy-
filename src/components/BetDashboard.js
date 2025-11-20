import React from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { formatCurrency, formatDate } from 'src/utils/formatters'

const Container = styled.View`
  flex: 1;
  background: #000;
`

const BetCard = styled.TouchableOpacity`
  background: #1a1a1a;
  padding: 16px;
  margin: 8px 16px;
  border-radius: 12px;
  border-left-width: 4px;
  border-left-color: ${(props) => props.resultColor};
`

const BetHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const BetType = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: capitalize;
`

const BetDate = styled.Text`
  color: #888;
  font-size: 12px;
`

const Teams = styled.Text`
  color: #ccc;
  font-size: 14px;
  margin-bottom: 8px;
`

const BetStats = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const StatText = styled.Text`
  color: #aaa;
  font-size: 13px;
`

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`

const EmptyText = styled.Text`
  color: #666;
  font-size: 16px;
  text-align: center;
`

const getResultColor = (result) => {
  switch (result) {
    case 'win':
      return '#4caf50'
    case 'loss':
      return '#f44336'
    case 'pending':
      return '#ff9800'
    default:
      return '#666'
  }
}

export const BetDashboard = ({ bets, onBetPress }) => {
  const renderBetItem = ({ item }) => (
    <BetCard resultColor={getResultColor(item.result)} onPress={() => onBetPress(item)}>
      <BetHeader>
        <BetType>{item.betType}</BetType>
        <BetDate>{formatDate(item.date)}</BetDate>
      </BetHeader>
      <Teams>{item.teams.join(' vs ')}</Teams>
      <BetStats>
        <StatText>Stake: {formatCurrency(item.stake)}</StatText>
        <StatText>Odds: {item.odds}</StatText>
        <StatText>Status: {item.result}</StatText>
      </BetStats>
    </BetCard>
  )

  if (!bets || bets.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyText>No bets yet. Start tracking your bets to see insights!</EmptyText>
        </EmptyState>
      </Container>
    )
  }

  return (
    <Container>
      <FlatList
        data={bets}
        renderItem={renderBetItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </Container>
  )
}

BetDashboard.propTypes = {
  bets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      betType: PropTypes.string.isRequired,
      teams: PropTypes.arrayOf(PropTypes.string).isRequired,
      odds: PropTypes.number.isRequired,
      stake: PropTypes.number.isRequired,
      result: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    })
  ).isRequired,
  onBetPress: PropTypes.func.isRequired,
}
