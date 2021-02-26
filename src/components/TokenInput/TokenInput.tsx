import React from 'react'
import styled from 'styled-components'
import { palette } from '../../theme/colors'

import Button from '../Button'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
  max: number | string,
  symbol: string,
  onSelectMax?: () => void,
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
}) => {
  return (
    <StyledTokenInput>
      <StyledMaxText>{max.toLocaleString()} {symbol} Available</StyledMaxText>
      <Input
        endAdornment={(
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
              <Button text="MAX" onClick={onSelectMax} className='max-button'  />
          </StyledTokenAdornmentWrapper>
        )}
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  )
}

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div`

`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 12px;
  padding-left: 12px;
  border-left: 1px solid ${palette['orange']};
  height: 48px;

  .max-button {
    height: 100%;
    width: 48px;
    transform: translateX(3px);
    border-radius: 0 6px 6px 0;
    font-weight: 700;
  }
`

const StyledMaxText = styled.div`
  align-items: center;
  color: #ffffff;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: #ffffff;
  font-weight: 700;
`

export default TokenInput