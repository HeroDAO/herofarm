import React from 'react'
import styled from 'styled-components'

type Props = {
  fixedHeight?: boolean;
}

const Card = ({ children, fixedHeight }: React.PropsWithChildren<Props>) => <StyledCard fixedHeight={fixedHeight}>{children}</StyledCard>

const StyledCard = styled.div<{ fixedHeight: boolean }>`
  height: ${(props) => (props.fixedHeight ? '140px' : 'auto')};
  background-color: rgba(0,0,0,0.6);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px;
  /* box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.grey[100]}; */
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: stretch;
`

export default Card
