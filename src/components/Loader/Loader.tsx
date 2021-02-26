import React from 'react'
import styled, { keyframes } from 'styled-components'

import CardIcon from '../CardIcon'
import HoneyIcon from '../../assets/img/honey.svg'

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>
      <CardIcon>
        <StyledHoney><img src={HoneyIcon} alt="Loading..." /></StyledHoney>
      </CardIcon>
      {!!text && <StyledText>{text}</StyledText>}
    </StyledLoader>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledHoney = styled.div`
  font-size: 32px;
  position: relative;
  animation: 1s ${spin} infinite;
`

const StyledText = styled.div`
  color: ${(props) => props.color || '#ffffff'};
`

export default Loader
