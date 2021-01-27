import React, { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './style'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <ButtonContainer>
    <button {...props}>
      {children}
    </button>
  </ButtonContainer>
)

export default Button
