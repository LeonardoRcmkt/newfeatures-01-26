import { useState } from 'react'
import { validate } from '../../functions/form/validation'

export const Select = ({
  label = '',
  name,
  value = '',
  disabled = false,
  onChange = () => { },
  options = [],
  optionDefault = '',
}) => {
  const [state, setState] = useState({
    valid: null,
    message: null,
  })

  const handleBlur = async () => {
    const res = await validate(name, value)

    if (res !== true) {
      setState({
        valid: false,
        message: res,
      })

      return
    }
    if (value !== '') {
      setState({
        valid: true,
        message: null,
      })

      return
    }

    setState({
      valid: null,
      message: null,
    })
  }

  return (
    <div>
      <div className={`w-full relative`}>
        <select
          className={`form-input ${state.valid != null
            ? !state.valid
            &&
            '!border-error'
            : ''
            }`}
          name={name}
          id={name}
          value={value}
          onBlur={handleBlur}
          onChange={onChange}
          disabled={disabled}
        >
          <option value='' className='text-input-text' disabled hidden>
            {optionDefault}
          </option>
          {options.map((option, key) => (
            <option key={key} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <label
          className='form-input-placeholder'
          htmlFor={name}
        >
          {label}
        </label>
      </div>
      {!state.valid && (
        <p
          id={`error-${name}`}
          className='text-error leading-4 text-xs font-bold text-left animate-fade-right'
        >
          {state.message}
        </p>
      )}
    </div>
  )
}
