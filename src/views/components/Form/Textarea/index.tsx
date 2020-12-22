import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { TextAreaContainer } from './style'

interface TextAereaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  labelText?: string
}

const TextAerea: React.FC<TextAereaProps> = ({ name, labelText, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value'
    })
  }, [registerField, fieldName])

  return (
    <TextAreaContainer>
      {labelText && <label>{labelText}</label>}
      <div className={'full-height'}>
        <textarea
          defaultValue={defaultValue} ref={textareaRef} {...props} />
      </div>
      {error}
    </TextAreaContainer>
  )
}

export default TextAerea
