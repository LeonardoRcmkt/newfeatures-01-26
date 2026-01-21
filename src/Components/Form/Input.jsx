import { useState } from 'react'
import { validate } from '../../functions/form/validation'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

export const Input = ({
  label = '',
  type = '',
  name,
  value = '',
  placeholder = '',
  disabled = false,
  onInput = () => { },
}) => {
  const [state, setState] = useState({
    valid: null,
    message: null,
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleBlur = async () => {
    const res = await validate(name, value)
    if (res !== true) {
      setState({ valid: false, message: res })
      return
    }
    if (value !== '') {
      setState({ valid: true, message: null })
      return
    }
    setState({ valid: null, message: null })
  }

  return (
    <div>
      <div className='w-full relative'>
        {state.valid != null && (
          <img
            className={
              `absolute top-[48%] -translate-y-[50%] ${type === 'password' ? "right-10" : "right-2"}  w-8 animate-fade-right ` +
              (!state.valid && 'fill-error')
            }
            src={
              !state.valid && '/images/base/icon-error.svg'
            }
            alt={!state.valid && 'error'}
          />
        )}
        <input
          className={`block form-input peer  ${state.valid != null
            ? !state.valid
            &&
            '!border-error'
            : ''
            }`}
          id={name}
          name={name}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          onBlur={handleBlur}
          onInput={onInput}
          value={value}
          disabled={disabled}
        />
        {type === 'password' && (
          <button
            type='button'
            className='absolute top-[30%] right-2 w-6 h-6'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {
              showPassword
                ? <FaRegEyeSlash className='text-primary-500/85 ' />
                : <FaRegEye className='text-primary-500/85' />
            }
          </button>
        )}
        <label
          className='form-input-placeholder peer'
          htmlFor={name}
        >
          {label}
        </label>
        {type == 'password' && name != 'senhaAtual' && name != 'senhaLogin' && (
          <div className='peer-focus:flex flex-col rounded-md bg-white border border-black w-fit p-3 mt-1 font-semibold text-xs absolute z-[100]  hidden shadow-lg animate-fade-down '>
            <p className={value.length >= 8 ? 'text-green-500' : 'text-error'}>
              Mínimo de 8 caracteres
            </p>
            <p
              className={value.match(/[A-Z]/) ? 'text-green-500' : 'text-error'}
            >
              Pelo menos uma letra maiúscula
            </p>
            <p
              className={value.match(/[a-z]/) ? 'text-green-500' : 'text-error'}
            >
              Pelo menos uma letra minúscula
            </p>
            <p className={value.match(/\d+/) ? 'text-green-500' : 'text-error'}>
              Pelo menos um número
            </p>
          </div>
        )}
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
