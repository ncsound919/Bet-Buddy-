import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import { validateBetEntry } from 'src/utils/validators'

const FormContainer = styled.View`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  margin: 16px;
`

const Label = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  margin-top: 12px;
`

const Input = styled.TextInput`
  background: #2a2a2a;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid #333;
`

const Button = styled.TouchableOpacity`
  background: #4a90e2;
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
  align-items: center;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`

export const BetEntryForm = ({ onSubmit }) => {
  const [betType, setBetType] = useState('')
  const [teams, setTeams] = useState('')
  const [odds, setOdds] = useState('')
  const [stake, setStake] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    const betData = {
      betType,
      teams: teams.split(',').map((t) => t.trim()),
      odds: parseFloat(odds),
      stake: parseFloat(stake),
      notes,
    }

    const validation = validateBetEntry(betData)
    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.error)
      return
    }

    onSubmit(betData)
  }

  return (
    <FormContainer>
      <Label>Bet Type</Label>
      <Input
        placeholder="moneyline, spread, parlay"
        placeholderTextColor="#666"
        value={betType}
        onChangeText={setBetType}
      />

      <Label>Teams (comma-separated)</Label>
      <Input
        placeholder="Team A, Team B"
        placeholderTextColor="#666"
        value={teams}
        onChangeText={setTeams}
      />

      <Label>Odds</Label>
      <Input
        placeholder="e.g., 1.5, 2.0"
        placeholderTextColor="#666"
        value={odds}
        onChangeText={setOdds}
        keyboardType="decimal-pad"
      />

      <Label>Stake ($)</Label>
      <Input
        placeholder="e.g., 10, 50"
        placeholderTextColor="#666"
        value={stake}
        onChangeText={setStake}
        keyboardType="decimal-pad"
      />

      <Label>Notes (optional)</Label>
      <Input
        placeholder="Any additional notes..."
        placeholderTextColor="#666"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Button onPress={handleSubmit}>
        <ButtonText>Submit Bet</ButtonText>
      </Button>
    </FormContainer>
  )
}

BetEntryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
