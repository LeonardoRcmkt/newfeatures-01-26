import { useEffect, useState } from 'react'
import { Title } from '../Components/Title.jsx'
import api from '../services/api.js'
import { Raspadinha } from '../Components/Games/Raspadinha/Raspadinha.jsx'
import Swal from 'sweetalert2'

export const Gameficacao = () => {
  const [chances, setChances] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getApi = async () => {
      try {
        api.get('/game').then((data) => setChances(data.chances_disponiveis))
      } catch (err) {
        console.error('ops! ocorreu um erro' + err)
      } finally {
        setLoading(false)
      }
    }
    getApi()
  }, [])

  const chancesDisponiveis = loading ? '...' : chances

  async function handleGamificacao() {
    if (chances === 0) return null

    setChances(prev => prev - 1)

    const loading = Swal.fire({


      background: 'rgba(255,255,255,0.9)',
      color: '#fff',
      html: ` <div> <h3 class="text-primary-500 text-3xl font-black"> Aguarde...</h3> <p> </p>  <div>`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const data = await api.post('/game')

      Swal.close()

      Swal.fire({
        showConfirmButton: false,
        showCloseButton: true,
        background: 'transparent',
        html: `<img class=" w-full mx-auto" onClick='window.location.reload()' src="data:image/png;base64,${data.modal}"/> `,
        didClose: () => {
          window.location.reload()
        }
      })

      return data

    } catch (err) {
      Swal.close()
      Swal.fire('Erro ao carregar prêmio')
    }
  }

  return (
    <section className='main-internas relative!'>
      <Title titleImg={"/images/titles/raspadinha-digital.webp"} alt={'Raspadinha Digital'} className={'w-44!'} />
      <div className='flex flex-col items-center justify-center gap-2 text-white'>
        <h3 className='text-center text-lg md:text-xl  uppercase font-black'>
          Você tem{' '}
          <span className='text-2l md:text-3xl text-accent-500'>
            {chancesDisponiveis}
          </span>{' '}
          Chances
        </h3>
        <p className='text-lg'>Raspe o coração com o mouse ou o dedo para saber se ganhou <span className='font-black'>até R$ 500,00 em vale-compras!</span></p>

      </div>

      <article className='flex flex-col w-full justify-center items-center gap-10 md:gap-0 max-w-7xl relative'>
        <div className='flex flex-col md:flex-row justify-center items-end mx-auto gap-4 w-full'>

          <div className='max-w-[350px]'>
            <Raspadinha
              handleGamificacao={handleGamificacao}
              chances={chances}
            />
          </div>
          <img
            src='/images/telas-internas/vic-gameficacao.webp'
            className='block md:hidden  w-[80%]  mx-auto '
          />
        </div>

      </article>
      <img
        src='/images/telas-internas/vic-gameficacao.webp'
        className='hidden md:block  w-[25%] -bottom-24 absolute right-[5%]'
      />
    </section>
  )
}
