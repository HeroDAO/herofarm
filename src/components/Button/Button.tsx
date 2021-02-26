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
  className?: string
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
  className
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
      buttonSize = 42
      fontSize = 14
  }

  let background
  if (disabled) {
    background = 'rgb(235, 138, 35, 0.9)'
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
      className={className}
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
  background: rgb(235, 138, 35);
  color: white;
  align-items: center;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-family: 'mullish';
  font-weight: 600;
  height: 2.5rem;
  justify-content: center;
  outline: none;
  padding-left: 1rem;
  padding-right: 1rem;
  pointer-events: 'none';
  width: 100%;
  transition: 0.2s all;
  :hover {
    background-color: rgba(235, 138, 35, 0.9);
  }
  :active {
    background-color: transparent;
  }
  &.outline {
    background: transparent;
    color: rgb(235, 138, 35);
    border: 1px solid rgb(237, 150, 58);
  }
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