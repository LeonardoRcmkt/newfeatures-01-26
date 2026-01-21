import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { linksInterno } from '../../data/LinksNavigation'
import { Title } from '../Title'

export const MenuInterno = ({ width = '379px' }) => {
  const [active, setActive] = useState('')
  const location = useLocation()
  const page = location.pathname

  const paginasMenuInterno = [
    '/meus-cupons/',
    '/meus-premios/',
    '/meus-dados/',
    '/alterar-senha/',
    '/game/',
    '/cadastrar-cupons/',
  ]

  // Verifica se a página atual está na lista de páginas permitidas
  const isPaginaMenuInterno = paginasMenuInterno.includes(page)

  useEffect(() => {
    const activeLink = linksInterno.find((link) => link.link === page)
    setActive(activeLink ? activeLink.link : '')
  }, [page])

  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  // Se a página atual não estiver em `paginasMenuInterno`, não renderiza o menu
  if (!isPaginaMenuInterno) {
    return null
  }

  return (
    <aside
      className={`lg:flex w-auto hidden relative flex-col bg-primary pt-0 divide-y divide-menu items-start transition-all duration-100 font-title uppercase rounded-lg mt-8 shadow-lg shadow-primary border-2 border-[#fff58395]`}
      style={{ width }}
    >
      <div className='flex flex-col w-full   p-6 mt-'>
        <div className='my-5'>
          <Title text='Menu' typeArrow={'secondary'} />
        </div>
        {linksInterno
          .filter((link) => paginasMenuInterno.includes(link.link))
          .map((link, index) => (
            <Fragment key={index}>
              <div
                className={`pb-2 text-center px-3 rounded-full ${
                  active === link.link
                    ? 'text-secondary-700 hover:text-secondary-500 active:text-secondary-900 hover:drop-shadow-medium-sm bg-primary-gradient-linear rounded-xl drop-shadow-medium-sm transition-all duration-100'
                    : 'text-white hover:text-primary-700 active:bg-primary-gradient-linear active:bg-clip-text active:text-transparent active:drop-shadow-medium-sm'
                }`}
              >
                <Link
                  to={link.link}
                  className='text-xl whitespace-nowrap active:bg-primary-gradient-linear active:bg-clip-text font-black transition-all duration-200 active:drop-shadow-medium-sm'
                  style={{ borderRadius: 10 }}
                >
                  {link.name}
                </Link>
              </div>
              {/* Renderiza <hr> somente se o link atual não for ativo */}
              {/* {active !== link.link && <hr className="border-border my-1" />} */}
            </Fragment>
          ))}
        <button
          onClick={logout}
          className='text-lg font-black text-white px-2 py-2 w-full cursor-pointer uppercase flex justify-end align-middle gap-3 active:bg-primary-gradient-linear active:bg-clip-text active:text-transparent  hover:text-primary-700 transition active:drop-shadow-medium-sm'
        >
          Sair
        </button>
      </div>
    </aside>
  )
}
