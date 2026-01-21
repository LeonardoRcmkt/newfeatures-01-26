import { Button } from '../Button'

export const PreCadastro = ({ onNext }) => {
  return (
    <section className='mt-[10vh] md:mt-[15vh]'>
      <main className='w-full flex flex-col items-center '>
        <div
          className='flex flex-col items-center px-4 py-8 w-full md:w-max md:p-10 rounded-lg shadow-[0_0_20px_rgba(235,224,130,1)] border-4 border-button-primary md:min-w-[465px] lg:min-w-[465px]'
          style={{
            boxShadow: 'inset 0px 0px 30px 14px rgba(0, 0, 0, 0.445)',
          }}
        >
          <span className='text-center text-md md:text-xl text-white font-extrabold uppercase '>
            Você participou da <br className='md:hidden' /> promoção
            <span className='text-primary-700'>
              {' '}
              Marcas <br className='hidden md:block' /> Campeãs
              <br className='md:hidden' /> 2024
            </span>
            . Quer utilizar os
            <br className='md:hidden' /> mesmos{' '}
            <br className='hidden md:block' /> dados para
            <br className='md:hidden' /> cadastro?
          </span>
          <div className='w-full flex flex-col-reverse md:flex-row items-center gap-2 mt-4'>
            <Button
              className='w-full'
              title='Nao'
              fill={false}
              onClick={() => {
                onNext('nao')
              }}
            />
            <Button
              className='w-full'
              title='Sim'
              onClick={() => {
                onNext('sim')
              }}
            />
          </div>
        </div>
      </main>
    </section>
  )
}
