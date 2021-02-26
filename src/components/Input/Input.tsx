import React from 'react'
import styled from 'styled-components'
import { palette } from '../../theme/colors'

export interface InputProps {
  endAdornment?: React.ReactNode,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void,
  placeholder?: string,
  startAdornment?: React.ReactNode,
  value: string,
}

const Input: React.FC<InputProps> = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
}) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${palette['bg']};
  border: 2px solid ${palette['orange']};
  color: white;
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
  font-weight: 500;
  padding: 0px 0px 0px 20px;
`

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Space Mono';
  font-weight: 700;
  flex: 1;
  height: 48px;
  margin: 0;
  padding: 0;
  outline: none;
`

export default Input