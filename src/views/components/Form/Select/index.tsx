import React, { SelectHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import * as S from './style'

export interface SelectOptionsTypes {
  key: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  options: SelectOptionsTypes[]
  labelText?: string
}

const Select: React.FC<SelectProps> = ({ name, labelText, options, ...props }) => {
  const selectRef = useRef<HTMLSelectElement>(null)

  const { fieldName, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value'
    })
  }, [registerField, fieldName])

  return (
    <S.SelectContainer>
      {labelText && <label>{labelText}</label>}
      <select ref={selectRef} {...props} onChange={() => {}}>
        {options.map((optionItem, i) =>
          <option key={i} value={optionItem.value}>{optionItem.key}</option>)}
      </select>
      {error}
    </S.SelectContainer>
  )
}

export default Select
