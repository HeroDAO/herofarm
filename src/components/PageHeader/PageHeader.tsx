import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
  circle?: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title, circle }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        {/* {circle && <CircleIconWrapper>
          <CircleIcon>{icon}</CircleIcon>
        </CircleIconWrapper>} */}
        {!circle && <StyledIcon>{icon}</StyledIcon>}
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
`

// const CircleIconWrapper = styled.div`
//   display: flex;
//   background: white;
//   border-radius: 50%;
//   overflow: hidden;
//   height: 90px;
//   width: 90px;
//   margin-bottom: 20px;
//   justify-content: center;
//   align-items: center;
// `

// const CircleIcon = styled.div`
//   display: flex;
//   border-radius: 50%;
//   overflow: hidden;
//   text-align: center;
// `

const StyledIcon = styled.div`
  height: 110px;
  margin-bottom: 24px;
  line-height: 120px;
  text-align: center;
`
const StyledTitle = styled.h1`
  font-family: 'mulish', sans-serif;
  color: #ffffff;
  font-size: 36px;
  font-weight: 400;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: #ffffff;
  font-family: 'mulish', sans-serif;
  font-size: 18px;
  font-weight: 300;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
