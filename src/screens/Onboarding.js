import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const Container = styled.SafeAreaView`
  flex: 1;
  background: #000;
`

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`

const Emoji = styled.Text`
  font-size: 80px;
  margin-bottom: 24px;
`

const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`

const Description = styled.Text`
  color: #aaa;
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  margin-bottom: 40px;
`

const DotsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 40px;
`

const Dot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: ${(props) => (props.active ? '#4a90e2' : '#333')};
  margin: 0 4px;
`

const Button = styled.TouchableOpacity`
  background: #4a90e2;
  padding: 16px 48px;
  border-radius: 8px;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`

const SkipButton = styled.TouchableOpacity`
  padding: 16px;
  margin-top: 16px;
`

const SkipText = styled.Text`
  color: #666;
  font-size: 14px;
`

const slides = [
  {
    emoji: '🎲',
    title: 'Track Your Bets',
    description: 'Keep a detailed record of all your sports bets in one place',
  },
  {
    emoji: '📊',
    title: 'Analyze Performance',
    description: 'Get insights into your betting patterns and success rates',
  },
  {
    emoji: '🎯',
    title: 'Make Better Decisions',
    description: 'Learn from your betting history to improve your strategy',
  },
]

export const Onboarding = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const slide = slides[currentSlide]

  return (
    <Container>
      <Content>
        <Emoji>{slide.emoji}</Emoji>
        <Title>{slide.title}</Title>
        <Description>{slide.description}</Description>
        <DotsContainer>
          {slides.map((_, index) => (
            <Dot key={index} active={index === currentSlide} />
          ))}
        </DotsContainer>
        <Button onPress={handleNext}>
          <ButtonText>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</ButtonText>
        </Button>
        {currentSlide < slides.length - 1 && (
          <SkipButton onPress={onComplete}>
            <SkipText>Skip</SkipText>
          </SkipButton>
        )}
      </Content>
    </Container>
  )
}

Onboarding.propTypes = {
  onComplete: PropTypes.func.isRequired,
}
