import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import { InputContainer } from './style'
// @ts-ignore
import IntlCurrencyInput from 'react-intl-currency-input'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  labelText?: string
}

const InputCurrencyMask: React.FC<InputProps> = ({ name, labelText, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, error, registerField } = useField(name)
  const [inputValue, setInputValue] = useState(props.defaultValue)

  const currencyConfig = {
    locale: 'pt-BR',
    formats: {
      number: {
        BRL: {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      }
    }
  }

  const handleChange = (event: any, value: any, maskedValue: any) => {
    setInputValue(value)
    console.log(value)
    console.log(maskedValue)
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [registerField, fieldName])

  return (
    <InputContainer>
      {labelText && <label>{labelText}</label>}
      <IntlCurrencyInput currency="BRL" config={currencyConfig}
                         onChange={handleChange} value={inputValue} />
      <input ref={inputRef} value={inputValue} onChange={() => null} name={name} type={'number'} style={{ display: 'none' }} />
  {error}
  </InputContainer>
  )
}

export default InputCurrencyMask
