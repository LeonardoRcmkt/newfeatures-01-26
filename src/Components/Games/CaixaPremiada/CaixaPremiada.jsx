import { useEffect, useRef, useState } from 'react'
import '../../../CSS/games/balao-premiado.css'
import { Button } from '../../Button'
import Swal from 'sweetalert2'

export const CaixaPremiada = ({ handleGamificacao, chances }) => {
  const ref = useRef(null)
  const firstRender = useRef(true)
  const [disabled, setDisabled] = useState(false)
  const [src, setSrc] = useState('/gameficacao/presente/presente_fechado.png')

  useEffect(() => {
    if (chances > 0 && firstRender) {
      firstRender.current = false
      setSrc(
        chances > 0
          ? '/gameficacao/presente/presente.gif'
          : '/gameficacao/presente/presente_fechado.png',
      )
    }
  }, [chances])

  useEffect(() => {
    ref.current.src = src
  }, [src])

  function handleClick() {
    setDisabled(true)
    handleGamificacao().then((data) => {
      setSrc('/gameficacao/presente/presente_aberto.gif')
      setTimeout(() => {
        Swal.fire({
          html: `<img onclick="document.getElementsByClassName('swal2-close')[0].click()" class='cursor-pointer' src='data:image/png;base64,${data.modal}'/>`,
          background: '#EC008C00',
          customClass: {
            htmlContainer: '!flex items-center justify-center',
          },
          showCloseButton: true,
          showConfirmButton: false,
        })
        setSrc(
          data.chances_disponiveis > 0
            ? '/gameficacao/presente/presente.gif'
            : '/gameficacao/presente/presente_fechado.png',
        )
        setDisabled(false)
      }, 6000)
    })
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <img src='/gameficacao/presente/presente_aberto.gif' className='hidden' />
      <img src='/gameficacao/presente/presente.gif' className='hidden' />
      <img ref={ref} alt='Presente' />
      <Button
        title={'Abrir Caixa'}
        onClick={handleClick}
        disabled={disabled || chances == 0}
        className='-mt-4 md:-mt-12'
      />
    </div>
  )
}
