import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Alert, Switch } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.SafeAreaView`
  flex: 1;
  background: #000;
`

const Header = styled.View`
  padding: 20px;
  background: #1a1a1a;
`

const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
`

const Section = styled.View`
  margin-top: 16px;
  background: #1a1a1a;
  margin: 16px;
  border-radius: 12px;
  overflow: hidden;
`

const SectionTitle = styled.Text`
  color: #888;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 16px 16px 8px 16px;
`

const SettingRow = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: ${(props) => (props.last ? 0 : 1)}px;
  border-bottom-color: #2a2a2a;
`

const SettingLabel = styled.Text`
  color: #fff;
  font-size: 16px;
`

const SettingValue = styled.Text`
  color: #888;
  font-size: 14px;
`

const DangerButton = styled.TouchableOpacity`
  background: #d32f2f;
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  align-items: center;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`

export const Settings = ({ user, settings, onUpdateSettings, onLogout, onDeleteAccount }) => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: onLogout },
    ])
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDeleteAccount },
      ]
    )
  }

  const toggleDarkMode = () => {
    onUpdateSettings({ ...settings, darkMode: !settings.darkMode })
  }

  const toggleNotifications = () => {
    onUpdateSettings({ ...settings, notifications: !settings.notifications })
  }

  return (
    <Container>
      <Header>
        <Title>Settings</Title>
      </Header>

      <ScrollView>
        <Section>
          <SectionTitle>Account</SectionTitle>
          <SettingRow>
            <SettingLabel>Email</SettingLabel>
            <SettingValue>{user?.email || 'Not logged in'}</SettingValue>
          </SettingRow>
        </Section>

        <Section>
          <SectionTitle>Preferences</SectionTitle>
          <SettingRow>
            <SettingLabel>Dark Mode</SettingLabel>
            <Switch
              value={settings?.darkMode ?? true}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#767577', true: '#4a90e2' }}
            />
          </SettingRow>
          <SettingRow last>
            <SettingLabel>Notifications</SettingLabel>
            <Switch
              value={settings?.notifications ?? true}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#767577', true: '#4a90e2' }}
            />
          </SettingRow>
        </Section>

        <Section>
          <SectionTitle>About</SectionTitle>
          <SettingRow>
            <SettingLabel>Version</SettingLabel>
            <SettingValue>1.0.0</SettingValue>
          </SettingRow>
          <SettingRow last onPress={() => Alert.alert('Privacy Policy', 'Coming soon')}>
            <SettingLabel>Privacy Policy</SettingLabel>
            <SettingValue>›</SettingValue>
          </SettingRow>
        </Section>

        <DangerButton onPress={handleLogout}>
          <ButtonText>Logout</ButtonText>
        </DangerButton>

        <DangerButton onPress={handleDeleteAccount}>
          <ButtonText>Delete Account</ButtonText>
        </DangerButton>
      </ScrollView>
    </Container>
  )
}

Settings.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  settings: PropTypes.shape({
    darkMode: PropTypes.bool,
    notifications: PropTypes.bool,
  }),
  onUpdateSettings: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
}
