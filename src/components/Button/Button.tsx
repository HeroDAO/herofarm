import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'

interface ButtonProps {
  children?: React.ReactNode,
  color?: string,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  shadow?: string,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  to?: string,
  variant?: 'default' | 'secondary' | 'tertiary'
  background?: string,
}

const DEFAULT_COLOR =  '#ffffff'

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  disabled,
  href,
  onClick,
  shadow,
  size,
  text,
  to,
  variant,
}) => {
  const { spacing } = useContext(ThemeContext)

  let buttonColor = color || DEFAULT_COLOR
  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      // boxShadow = `0px 1px 2px rgba(0, 0, 0, 0.08)`
      buttonPadding = spacing[4]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      // boxShadow = `0px 1px 2px rgba(0, 0, 0, 0.08)`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      // boxShadow = `0px 1px 2px rgba(0, 0, 0, 0.08)`
      buttonPadding = spacing[4]
      buttonSize = 40
      fontSize = 14
  }

  let background
  if (disabled) {
    background = '#E9E9E9'
  } else {
    switch (variant) {
      case 'secondary':
        background = 'transparent'
        break
      default:
        background = 'rgb(235, 138, 35)'
    }
  }


  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return <StyledExternalLink href={href} target="__blank">{text}</StyledExternalLink>
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      background={background}
      boxShadow={shadow || boxShadow}
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  boxShadow: string,
  color: string,
  disabled?: boolean,
  fontSize: number,
  hoverColor?:string,
  padding: number,
  size: number
  background?: string,
}

const StyledButton = styled.button<StyledButtonProps>`
  background: ${props => props.background || ""};
  color: ${props => props.color};
  align-items: center;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  font-size: ${props => props.fontSize}px;
  font-weight: 500;
  height: ${props => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${props => props.padding}px;
  padding-right: ${props => props.padding}px;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  width: 100%;
  &:hover {
    background-color: ${props => props.hoverColor};
  }
  box-shadow: ${props => props.boxShadow};
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 40px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[3]}px;
  padding: 0 ${props => props.theme.spacing[3]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 40px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[3]}px;
  padding: 0 ${props => props.theme.spacing[3]}px;
  text-decoration: none;
`

export default Button