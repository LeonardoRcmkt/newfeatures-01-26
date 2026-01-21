import { Title } from '../Components/Title.jsx'
import { CupomForm } from '../Components/Form/CupomForm.jsx'
import { Subtitle } from '../Components/Subtitle.jsx'
import { useState, useEffect } from 'react'

export const CadastrarCupons = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Mobile breakpoint
    }

    handleResize() // Initialize on mount
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className='main-internas'>
      <Title
        titleImg={"/images/titles/cadastrar-cupom.webp"} alt={'Cadastrar Cupom'} className={'w-40!'}
      />
      <div className=' flex flex-col md:flex-row justify-center  w-full gap-8  md:px-8  '>

        <CupomForm />


        <div className='flex flex-col gap-6 md:items-center w-fit '>
          <p className='text-md  text-center md:text-nowrap font-black text-primary-500'>
            EXEMPLO DE CUPOM FISCAL
          </p>
          <img
            src='/images/telas-internas/cadastrar-cupons/imagem-modelo.webp'
            alt='Cupom fiscal'
            className='md:w-64 '
          />
        </div>
      </div>
    </section>
  )
}
