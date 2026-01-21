import React, { useState } from 'react'
import { validate } from '../../functions/form/validation'

export const Textarea = ({
  label = '',
  name = '',
  value = '',
  disabled = false,
  onInput = () => { },
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
    <div className='w-full'>
      <div className='w-full relative '>
        {state.valid != null && (
          <img
            className={
              'absolute top-[18%] -translate-y-[50%] right-2 w-8 animate-fade-right ' +
              (!state.valid && 'fill-error')
            }
            src={
              !state.valid && '/images/base/icon-error.svg'
            }
            alt={!state.valid && 'error'}
          />
        )}
        <textarea
          id={name}
          className={`form-input  ${state.valid != null
            ? !state.valid
            &&
            '!border-error'
            : ''
            }`}
          name={name}
          placeholder=''
          onBlur={handleBlur}
          onInput={onInput}
          value={value}
          disabled={disabled}
          rows={5}
        />
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
          className='text-error leading-4 text-xs font-bold text-left'
        >
          {' '}
          {state.message}
        </p>
      )}
    </div>
  )
}
