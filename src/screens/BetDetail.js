import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Alert } from 'react-native'
import styled from 'styled-components/native'
import { formatCurrency, formatDate } from 'src/utils/formatters'

const Container = styled.SafeAreaView`
  flex: 1;
  background: #000;
`

const Header = styled.View`
  padding: 20px;
  background: #1a1a1a;
  border-bottom-width: 3px;
  border-bottom-color: ${(props) => props.statusColor};
`

const BetType = styled.Text`
  color: #888;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const Teams = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 8px;
`

const DateText = styled.Text`
  color: #888;
  font-size: 14px;
`

const Content = styled.View`
  padding: 20px;
`

const InfoCard = styled.View`
  background: #1a1a1a;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
`

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom-width: ${(props) => (props.last ? 0 : 1)}px;
  border-bottom-color: #2a2a2a;
`

const Label = styled.Text`
  color: #888;
  font-size: 14px;
`

const Value = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`

const NotesCard = styled.View`
  background: #1a1a1a;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
`

const NotesTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`

const NotesText = styled.Text`
  color: #aaa;
  font-size: 14px;
  line-height: 20px;
`

const ActionButton = styled.TouchableOpacity`
  background: ${(props) => props.color || '#4a90e2'};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 12px;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`

const getStatusColor = (result) => {
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

export const BetDetail = ({ bet, onUpdateResult, onDelete }) => {
  const handleMarkWin = () => {
    Alert.alert('Mark as Win', 'Are you sure this bet won?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => onUpdateResult(bet.id, 'win') },
    ])
  }

  const handleMarkLoss = () => {
    Alert.alert('Mark as Loss', 'Are you sure this bet lost?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => onUpdateResult(bet.id, 'loss') },
    ])
  }

  const handleDelete = () => {
    Alert.alert('Delete Bet', 'Are you sure you want to delete this bet?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(bet.id) },
    ])
  }

  return (
    <Container>
      <Header statusColor={getStatusColor(bet.result)}>
        <BetType>{bet.betType}</BetType>
        <Teams>{bet.teams.join(' vs ')}</Teams>
        <DateText>{formatDate(bet.date)}</DateText>
      </Header>

      <ScrollView>
        <Content>
          <InfoCard>
            <InfoRow>
              <Label>Odds</Label>
              <Value>{bet.odds}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Stake</Label>
              <Value>{formatCurrency(bet.stake)}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Potential Payout</Label>
              <Value>{formatCurrency(bet.stake * bet.odds)}</Value>
            </InfoRow>
            <InfoRow last>
              <Label>Status</Label>
              <Value style={{ color: getStatusColor(bet.result), textTransform: 'capitalize' }}>
                {bet.result}
              </Value>
            </InfoRow>
          </InfoCard>

          {bet.notes && (
            <NotesCard>
              <NotesTitle>Notes</NotesTitle>
              <NotesText>{bet.notes}</NotesText>
            </NotesCard>
          )}

          {bet.result === 'pending' && (
            <>
              <ActionButton color="#4caf50" onPress={handleMarkWin}>
                <ButtonText>Mark as Win</ButtonText>
              </ActionButton>
              <ActionButton color="#f44336" onPress={handleMarkLoss}>
                <ButtonText>Mark as Loss</ButtonText>
              </ActionButton>
            </>
          )}

          <ActionButton color="#d32f2f" onPress={handleDelete}>
            <ButtonText>Delete Bet</ButtonText>
          </ActionButton>
        </Content>
      </ScrollView>
    </Container>
  )
}

BetDetail.propTypes = {
  bet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    betType: PropTypes.string.isRequired,
    teams: PropTypes.arrayOf(PropTypes.string).isRequired,
    odds: PropTypes.number.isRequired,
    stake: PropTypes.number.isRequired,
    result: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    notes: PropTypes.string,
  }).isRequired,
  onUpdateResult: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
