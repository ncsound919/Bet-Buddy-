import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { useBets } from '../hooks/useBets'

export const BetEntryForm = () => {
  const [fields, setFields] = useState({ teams: '', odds: '', stake: '', type: '' })
  const { addBet } = useBets()

  return (
    <View>
      {/* Simplified Inputs */}
      <TextInput placeholder="Teams" onChangeText={teams => setFields({...fields, teams})} />
      <TextInput placeholder="Odds" keyboardType="numeric" onChangeText={odds => setFields({...fields, odds})} />
      <TextInput placeholder="Stake" keyboardType="numeric" onChangeText={stake => setFields({...fields, stake})} />
      <TextInput placeholder="Type (ML, Spread, Parlay)" onChangeText={type => setFields({...fields, type})} />
      <Button title="Add Bet" onPress={() => addBet(fields)} />
    </View>
  )
}
