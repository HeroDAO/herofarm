import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Farm
      </StyledLink>
      {/* <StyledLink exact activeClassName="active" to="/farms/create">
        Create Farm
      </StyledLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  /* color: #ffffff; */
  font-weight: 500;
  padding-left: ${(props) => props.theme.spacing[4]}px;
  padding-right: ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
  &:hover {
    color: #fad19c;
  }
  &.active {
    font-weight: 700;
    color: #ffffff;
  }

  &:not(.active) {
  color: #ffffff;

  }

  @media (max-width: 500px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
