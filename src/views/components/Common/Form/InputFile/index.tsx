import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { InputContainer } from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

const InputFile: React.FC<InputProps> = ({ name, label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, error, registerField } = useField(name)
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
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
        />
        <label className="custom-file-label" htmlFor="customFile" style={{ fontWeight: 400, cursor: 'pointer' }}>
          Escolher Arquivo
        </label>
      </div>
      {error}
    </InputContainer>
  )
}

export default InputFile
