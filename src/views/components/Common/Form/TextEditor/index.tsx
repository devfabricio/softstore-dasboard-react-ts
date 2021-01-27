import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { TextAreaContainer } from './style'
import { Editor } from 'react-draft-wysiwyg'

interface TextAereaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  labelText?: string
}

const TextEditor: React.FC<TextAereaProps> = ({ name, labelText, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { fieldName, error, registerField } = useField(name)

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
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
      {error}
    </TextAreaContainer>
  )
}

export default TextEditor
