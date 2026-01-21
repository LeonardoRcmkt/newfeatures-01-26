import { useState } from 'react'
import { validate } from '../../functions/form/validation'

export const InputChaveAcesso = ({ value = '', onInput = () => {} }) => {
  const [state, setState] = useState({
    valid: null,
    message: null,
  })

  const handleBlur = async () => {
    const res = await validate('chaveAcesso', value)
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
    <>
      <div className={`w-full relative`}>
        <label htmlFor='chaveAcesso' className='hidden'>
          Chave de Acesso
        </label>
        <input
          className={`block rounded-md p-2 pt-1  leading-none w-full text-black bg-[#FFDD00] bg-opacity-25 backdrop-opacity-25 outline-0 border border-black appearance-none focus:outline-0 focus:ring-0`}
          id='chaveAcesso'
          name='chaveAcesso'
          type='text'
          onBlur={handleBlur}
          onInput={onInput}
          value={value}
          placeholder='Insira a chave de acesso'
        />
      </div>
      {!state.valid && (
        <p
          id={`error-chaveAcesso`}
          className='text-error leading-4 text-xs font-bold text-left animate-fade-right'
        >
          {state.message}
        </p>
      )}
    </>
  )
}
