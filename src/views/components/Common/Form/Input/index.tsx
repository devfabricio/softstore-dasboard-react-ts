import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { InputContainer } from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  infoText?: string
}

const Input: React.FC<InputProps> = ({ name, label, infoText, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [registerField, fieldName])

  return (
  <InputContainer className={'form-group'}>
    {label && <label>{label}</label>}
    <input defaultValue={defaultValue} ref={inputRef} {...props} />
    {infoText && <small>{infoText}</small>}
    {error}
  </InputContainer>
  )
}

export default Input
