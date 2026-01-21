import React, { useState } from 'react'
import { validate } from '../../functions/form/validation'
import { ModalPDF } from '../ModalPDF'

export const Checkbox = ({
  name,
  disabled = false,
  onChange,
  checked,
  label,
}) => {
  const [state, setState] = useState({
    valid: null,
    message: null,
  })
  // const url =
  //   window.location.hostname == 'localhost'
  //     ? `/`
  //     : `https://audiencia${window.location.hostname.includes('rcmkt') ? '' : '.'
  //     }${window.location.hostname}/`;

  const handleBlur = async (e) => {
    const res = await validate(name, e.target.checked)
    if (res !== true) {
      setState({
        valid: false,
        message: res,
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
      <div className='flex items-center gap-2 '>
        <input

          id={name}
          name={name}
          type='checkbox'
          onChange={(e) => {
            onChange(e)
            handleBlur(e)
          }}
          disabled={disabled}
          checked={checked}
          className='accent-accent-300 '
        ></input>
        <div className={
          `  ` +
          (!state.valid && 'border-error')
        }>

        </div>

        <label
          className=' form-checkbox-label'
          htmlFor={name}
        >
          {label}
          {name == 'regulamento' && (
            <ModalPDF
              title='regulamento'
              text='Regulamento da Promoção'
              PdfTitles={['sorteio', 'vale brinde']}
              files={[
                `/arquivos/regulamento-sorteio.pdf`,
                `/arquivos/regulamento-vale-brinde.pdf`,
              ]}
              button={false}
            />
          )}
          {name == 'politica' && (
            <ModalPDF
              title='política de privacidade'
              PdfTitles={['política de privacidade']}
              files={[`/arquivos/politica-de-privacidade.pdf`]}
              text='Política de Privacidade'
              button={false}
            />
          )}
        </label>
      </div>
      {!state.valid && (
        <p
          id={`error-${name}`}
          className='text-error leading-4 text-xs font-bold text-left animate-fade-right'
        >
          {' '}
          {state.message}
        </p>
      )}
    </>
  )
}
