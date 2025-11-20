import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { BetDashboard } from 'src/components/BetDashboard'
import { InsightCard } from 'src/components/InsightCard'

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

const Subtitle = styled.Text`
  color: #888;
  font-size: 14px;
  margin-top: 4px;
`

const Section = styled.View`
  margin-top: 16px;
`

const SectionTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 16px 16px 8px 16px;
`

const ScrollContainer = styled.ScrollView`
  flex: 1;
`

const AddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #4a90e2;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 5;
`

const AddButtonText = styled.Text`
  color: #fff;
  font-size: 32px;
  font-weight: 300;
`

export const Dashboard = ({ user, bets, insights, onBetPress, onAddBet }) => {
  return (
    <Container>
      <Header>
        <Title>Dashboard</Title>
        <Subtitle>Welcome back, {user?.email || 'User'}</Subtitle>
      </Header>

      <ScrollContainer>
        {insights && insights.length > 0 && (
          <Section>
            <SectionTitle>Insights</SectionTitle>
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </Section>
        )}

        <Section>
          <SectionTitle>Your Bets</SectionTitle>
          <BetDashboard bets={bets} onBetPress={onBetPress} />
        </Section>
      </ScrollContainer>

      <AddButton onPress={onAddBet}>
        <AddButtonText>+</AddButtonText>
      </AddButton>
    </Container>
  )
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  bets: PropTypes.array.isRequired,
  insights: PropTypes.array,
  onBetPress: PropTypes.func.isRequired,
  onAddBet: PropTypes.func.isRequired,
}
