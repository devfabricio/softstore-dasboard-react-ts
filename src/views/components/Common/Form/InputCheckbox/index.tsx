import React, { useEffect, useRef, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

export interface CheckboxOptionsInterface {
  id: string
  value: string
  label: string
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}
const InputCheckbox: React.FC<Props> = ({ name, options, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { fieldName, registerField, defaultValue = [] } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value)
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false
        })
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true
          }
        })
      }
    })
  }, [defaultValue, fieldName, registerField])
  return (
    <div>
      {options.map((option, index) => (
        <div key={option.id} className="form-check form-check-inline">
          <input
            className="form-check-input"
            defaultChecked={defaultValue.find((dv: string) => dv === option.id)}
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          <label htmlFor={option.id} key={option.id} className="form-check-label">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default InputCheckbox
