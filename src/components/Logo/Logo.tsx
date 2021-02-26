import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/img/Daohaus__Castle--Dark.svg'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={logo} alt="FarmHaus" height="32" style={{ marginTop: -4 }} />
      <StyledText>
        FarmHaus
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: white;
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 600px) {
    display: none;
  }
`

export default Logo
