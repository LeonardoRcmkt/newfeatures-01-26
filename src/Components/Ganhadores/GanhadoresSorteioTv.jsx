import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Accordion } from '../Accordion';

export const GanhadoresSorteioTv = ({ open, onClick }) => {
  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/winner")
      .then((data) => {
        const filterWinnersTv = data.filter(ganhador => ganhador.nome_premio === "Tv"
        );
        setData(filterWinnersTv);
        setFilteredData(filterWinnersTv);
        setLoading(false);
      })
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
        setLoading(true);
      });
  }, []);



  useEffect(() => {
    if (word) {
      const filtered = data.filter(
        (e) =>
          e.nome.toLowerCase().includes(word.toLowerCase()) ||
          e.numero_documento.toLowerCase().includes(word.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, word]);

  return (
    <Accordion
      titleButton="TV 50'"
      onClick={onClick}
      open={open}
      onChange={(e) => setWord(e.target.value.toLowerCase())}
      word={word}
      headerClass="ganhadores-header"
      className="ganhadores-accordion"

    >
      <div className='flex flex-col pt-0 text-base-coloralt gap-4'>

        <div id='ganhadores-table' className='  ganhadores-table '>
          <table className='w-full text-center border-collapse'>
            <thead>
              <tr className=' ganhadores-table-header ' >
                <th>
                  <span className='lg:hidden flex h-auto justify-center pb-2'>
                    Data
                    <br />
                    Nome - CPF
                    <br />
                    Loja
                    <br />
                    Número da Sorte
                  </span>
                  <span className='hidden lg:block  pb-2'>Data</span>
                </th>
                <th>
                  <span className='hidden lg:block  pb-2'>Nome - CPF</span>
                </th>
                <th>
                  <span className='hidden lg:block  pb-2'>Loja</span>
                </th>
                <th>
                  <span className='hidden lg:block  pb-2'>Número da Sorte</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className=' ganhadores-message'>
                  <td colSpan={4} className='text-center p-6'>
                    Buscando Informações...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr className=' ganhadores-message'>
                  <td
                    colSpan={4}
                    className=' ganhadores-message'
                  >
                    Aguarde a divulgação dos ganhadores.
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr className='h-[35px]'>
                  <td colSpan={4} className='ganhadores-message'>
                    Nenhum resultado encontrado.
                  </td>
                </tr>
              ) : (
                filteredData.map((ganhador, index) => {
                  const date = new Date(
                    ganhador.dt_premio.replaceAll('-', '/')
                  );
                  return (
                    <tr
                      key={index}
                      className='ganhadores-body-rows'
                    >
                      <td>
                        <span className='block lg:hidden'>
                          {date.toLocaleDateString('pt-br')}
                          <br />
                          {`${ganhador.nome} - ${ganhador.numero_documento}`}
                          <br />
                          {ganhador.filial}
                          <br />
                          {ganhador.numero_da_sorte}
                        </span>
                        <span className='hidden lg:block'>
                          {date.toLocaleDateString('pt-br')}
                        </span>
                      </td>
                      <td>
                        <span className='hidden lg:block'>
                          {`${ganhador.nome} - ${ganhador.numero_documento}`}
                        </span>
                      </td>
                      <td>
                        <span className='hidden lg:block'>
                          {ganhador.filial}
                        </span>
                      </td>
                      <td>
                        <span className='hidden lg:block'>
                          {ganhador.numero_da_sorte}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Accordion>
  );
};
