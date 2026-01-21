import { LazyMotion, domAnimation, m } from 'framer-motion'
import { IoIosArrowDropdown } from "react-icons/io";

const CupomHeader = ({ cupom }) => (
  <div className='grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:mr-6 '>
    <div className='flex flex-col col-span-2 md:col-span-1'>
      <span className='text-2xs  '>Chave de acesso:</span>
      <span className='meus-cupons-cupom-text-details'>
        {cupom.codigo.replace(/(\d{4})/g, '$1 ')}
      </span>
    </div>

    <div className='flex gap-8 md:items-center md:justify-center'>
      <div className='flex flex-col'>
        <span className='text-2xs  '>Status:</span>
        {cupom.status === 'A' && (
          <span className='text-aprovado font-extrabold uppercase'>
            Aprovada
          </span>
        )}
        {cupom.status === 'P' && (
          <span className='text-pendente font-extrabold uppercase'>
            Em aprovação
          </span>
        )}
        {cupom.status === 'C' && (
          <span className='text-reprovado font-extrabold uppercase'>
            Cancelado
          </span>
        )}
      </div>
    </div>
    <div className='flex gap-8 md:items-center md:justify-center'>
      <div className='flex flex-col'>
        <span className='text-2xs  '>Valor da Compra:</span>
        <span className='meus-cupons-cupom-text-details'>
          {cupom.valor_total != null
            ? `R$${cupom.valor_total.replace('.', ',')}`
            : '--'}
        </span>
      </div>
    </div>
  </div>
)

const CupomToggleIcon = ({ open, onClick }) => (
  <div
    className={`self-center text-center text-lg font-bold cursor-pointer duration-300 ease-in-out ${open ? 'rotate-180' : ''
      }`}
    onClick={onClick}
  >
    <IoIosArrowDropdown className='text-accent-500 text-xl!' />
  </div>
)

const CupomDetails = ({ cupom, dataEmissao, dataCadastro, animate }) => (
  <LazyMotion features={domAnimation} strict>
    <m.div
      style={{ overflow: 'hidden' }}
      initial={{ height: 0, opacity: 1 }}
      animate={animate}
      exit={{ height: 0, opacity: 1 }}
      className={`${animate.height === 'auto' ? 'flex' : 'hidden'
        } flex-col text-2xs rounded-b-md bg-white/10  px-4`}
    >
      <div className='flex-col text-sm pb-4 px-4 pt-2' style={{ overflowX: 'auto' }}>
        <table className='table-auto w-full  text-meus-cupons-cupom'>
          <tbody className='text-meus-cupons-cupom'>
            <tr className='bg-meus-cupons-cupom-alt '>
              <td className='py-1'>Nome da Loja:</td>
              <td className='meus-cupons-cupom-text-details'>{cupom.nome_filial}</td>
            </tr>
            <tr className=''>
              <td className='py-1'>CNPJ da Loja:</td>
              <td className='meus-cupons-cupom-text-details'>
                {cupom.cnpj_filial.replace(
                  /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                  '$1.$2.$3/$4-$5',
                )}
              </td>
            </tr>
            <tr className='bg-meus-cupons-cupom-alt '>
              <td className='py-1'>Data da Compra:</td>
              <td className='meus-cupons-cupom-text-details'>
                {dataEmissao != '--'
                  ? dataEmissao.toLocaleDateString('pt-br')
                  : '--'}
              </td>
            </tr>
            <tr className=''>
              <td className=''>Data do Cadastro:</td>
              <td className='meus-cupons-cupom-text-details'>
                {dataCadastro.toLocaleDateString('pt-br')}
              </td>
            </tr>
            <tr className='bg-meus-cupons-cupom-alt '>
              <td className='py-1'>Produtos Participantes:</td>
              <td className='meus-cupons-cupom-text-details'>
                {cupom.total_produtos_participantes}
              </td>
            </tr>
            <tr className=''>
              <td className='py-1'>Produtos Impulsionadores:</td>
              <td className='meus-cupons-cupom-text-details'>
                {cupom.total_produtos_impulsionadores}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </m.div>
  </LazyMotion>
)

export const Cupom = ({ cupom, onClick, open }) => {
  const animate = {
    transition: { type: 'tween' },
    height: open ? 'auto' : 0,
    opacity: open ? 1 : 0.5,
  }

  const dataEmissao =
    cupom.dt_emissao != null
      ? new Date(cupom.dt_emissao.replaceAll('-', '/'))
      : '--'
  const dataCadastro = new Date(cupom.dt_cadastro.replaceAll('-', '/'))

  return (
    <div className='meus-cupons-cupom  ' onClick={onClick}>
      <div className='overflow-hidden w-full meus-cupons-text'>
        <div className='flex flex-row justify-between items-start w-full p-4 px-8'>
          <CupomHeader cupom={cupom} dataEmissao={dataEmissao} />
          <CupomToggleIcon open={open} />
        </div>
        <CupomDetails
          cupom={cupom}
          dataEmissao={dataEmissao}
          dataCadastro={dataCadastro}
          animate={animate}
        />
      </div>
    </div>
  )
}
