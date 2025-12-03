import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text, useTheme, Card, SegmentedButtons } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { AuthService } from '../../services/authService';
import { BetService } from '../../services/betService';
import { BetType, BetFormData } from '../../models/Bet';
import { SPORTS } from '../../constants/limits';
import { spacing } from '../../theme/theme';

const BetEntryScreen: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [entryMethod, setEntryMethod] = useState('manual');
  
  // Form fields
  const [sport, setSport] = useState(SPORTS[0]);
  const [betType, setBetType] = useState<BetType>(BetType.MONEYLINE);
  const [description, setDescription] = useState('');
  const [odds, setOdds] = useState('');
  const [stake, setStake] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (!sport || !description || !odds || !stake) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const oddsNum = parseFloat(odds);
    const stakeNum = parseFloat(stake);

    if (isNaN(oddsNum) || isNaN(stakeNum)) {
      Alert.alert('Error', 'Odds and stake must be valid numbers');
      return;
    }

    setLoading(true);
    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        Alert.alert('Error', 'You must be logged in to add bets');
        return;
      }

      const betData: BetFormData = {
        sport,
        betType,
        description,
        odds: oddsNum,
        stake: stakeNum,
        notes: notes || undefined
      };

      await BetService.createBet(user.uid, betData);
      
      Alert.alert('Success', 'Bet added successfully!');
      
      // Clear form
      setDescription('');
      setOdds('');
      setStake('');
      setNotes('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add bet');
    } finally {
      setLoading(false);
    }
  };

  const handleOCRUpload = () => {
    Alert.alert(
      'OCR Upload',
      'OCR functionality requires Google Vision API setup. This feature will extract bet details from slip photos.'
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <SegmentedButtons
          value={entryMethod}
          onValueChange={setEntryMethod}
          buttons={[
            { value: 'manual', label: 'Manual Entry', icon: 'pencil' },
            { value: 'ocr', label: 'Upload Slip', icon: 'camera' }
          ]}
          style={styles.segmentedButtons}
        />

        {entryMethod === 'manual' ? (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Add Bet Manually
              </Text>

              <Text variant="labelLarge" style={styles.label}>
                Sport *
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={sport}
                  onValueChange={(itemValue) => setSport(itemValue)}
                >
                  {SPORTS.map((s) => (
                    <Picker.Item key={s} label={s} value={s} />
                  ))}
                </Picker>
              </View>

              <Text variant="labelLarge" style={styles.label}>
                Bet Type *
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={betType}
                  onValueChange={(itemValue) => setBetType(itemValue as BetType)}
                >
                  {Object.values(BetType).map((type) => (
                    <Picker.Item key={type} label={type.replace('_', ' ')} value={type} />
                  ))}
                </Picker>
              </View>

              <TextInput
                label="Description *"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                placeholder="e.g., Lakers -5.5 vs Warriors"
                style={styles.input}
              />

              <TextInput
                label="Odds (American) *"
                value={odds}
                onChangeText={setOdds}
                mode="outlined"
                keyboardType="numeric"
                placeholder="e.g., -110 or +150"
                style={styles.input}
              />

              <TextInput
                label="Stake Amount ($) *"
                value={stake}
                onChangeText={setStake}
                mode="outlined"
                keyboardType="decimal-pad"
                placeholder="e.g., 50"
                style={styles.input}
              />

              <TextInput
                label="Notes (Optional)"
                value={notes}
                onChangeText={setNotes}
                mode="outlined"
                multiline
                numberOfLines={3}
                placeholder="Add any additional notes..."
                style={styles.input}
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
                style={styles.submitButton}
              >
                Add Bet
              </Button>
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Upload Bet Slip
              </Text>
              <Text variant="bodyMedium" style={styles.ocrDescription}>
                Take a photo of your bet slip and we'll automatically extract the details
              </Text>
              <Button
                mode="contained"
                icon="camera"
                onPress={handleOCRUpload}
                style={styles.submitButton}
              >
                Take Photo
              </Button>
              <Button
                mode="outlined"
                icon="image"
                onPress={handleOCRUpload}
                style={styles.submitButton}
              >
                Choose from Gallery
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  content: {
    padding: spacing.lg
  },
  segmentedButtons: {
    marginBottom: spacing.lg
  },
  card: {
    elevation: 4
  },
  cardTitle: {
    marginBottom: spacing.lg,
    fontWeight: 'bold'
  },
  label: {
    marginBottom: spacing.sm,
    marginTop: spacing.md
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 4,
    marginBottom: spacing.md
  },
  input: {
    marginBottom: spacing.md
  },
  submitButton: {
    marginTop: spacing.md
  },
  ocrDescription: {
    marginBottom: spacing.lg,
    color: '#757575',
    textAlign: 'center'
  }
});

export default BetEntryScreen;
