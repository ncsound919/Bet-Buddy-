import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const Card = styled.View`
  background: #222;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  shadow-opacity: 0.1;
  min-height: 70px;
`

const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`

const Message = styled.Text`
  color: #bbb;
  font-size: 14px;
  margin-top: 4px;
`

export const InsightCard = ({ insight }) => (
  <Card>
    <Title>{insight.title}</Title>
    <Message>{insight.message}</Message>
  </Card>
)

InsightCard.propTypes = {
  insight: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
}
