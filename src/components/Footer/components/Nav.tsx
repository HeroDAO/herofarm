import React from 'react'
import { GU, Link as AragonLink, textStyle } from '@1hive/1hive-ui'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledDiv>
      <div>
        <StyledHeader>
          DAOhaus
        </StyledHeader>
        <Link href="https://daohaus.club" external>
          Website
        </Link>
        <Link href="https://app.daohaus.club" external>
          App
        </Link>
        <Link href="https://docs.daohaus.club" external>
          Docs
        </Link>
      </div>
      <StyledDivMargin>
        <StyledHeader>
          Community
        </StyledHeader>
        <Link href="https://discord.gg/qQzctSNppQ" external>
          Discord
        </Link>
        <Link href="https://github.com/1Hive" external>
          Github
        </Link>
        <Link href="https://twitter.com/1HiveOrg" external>
          Twitter
        </Link>
      </StyledDivMargin>
    </StyledDiv>
  )
}

const Link = styled(AragonLink)`
  display: block;
  margin-bottom: ${1.5 * GU}px;
  text-align: left;
  text-decoration: none;
  color: #808587;
`

const StyledHeader = styled.h5`
  ${textStyle('body1')};
  margin-bottom: ${1.5 * GU}px;
`

const StyledDiv = styled.div`
  display: flex;
`

const StyledDivMargin = styled.div`
  margin-left: 25px;
`

export default Nav
