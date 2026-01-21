import { useEffect, useState } from 'react';
import api from '../../../src/services/api';
import { Accordion } from '../../Components/Accordion';
import { Search } from '../../Components/Search'

export const GanhadoresInstantaneo = ({ open, onClick }) => {
  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/winner-instant')
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
        setLoading(false);
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
      titleButton='RASPADINHA digital'
      onClick={onClick}
      open={open}
      info={data}
      isVisible={true}
      onChange={(e) => setWord(e.target.value.toLowerCase())}
      word={word}
      placeholder='Pesquise pelo nome ou CPF do ganhador'
      headerClass="ganhadores-header"
      className="ganhadores-accordion"

    >
      <div className='flex flex-col  pt-0 text-base-coloralt gap-4 '>

        <div id='ganhadores-table' className='  ganhadores-table '>
          <table className='w-full text-center  border-collapse'>
            <thead>
              <tr className=' ganhadores-table-header ' >
                <th>
                  <span className='flex h-auto justify-center lg:hidden pb-2 '>
                    Data
                    <br />
                    Nome - CPF
                    <br />
                    Prêmio
                    <br />
                    Loja
                  </span>
                  <span className='hidden lg:block  pb-2'>Data</span>
                </th>
                <th>
                  <span className='hidden lg:block  pb-2'>Nome - CPF</span>
                </th>
                <th>
                  <span className='hidden lg:block  pb-2'>Prêmio</span>
                </th>
                <th>
                  <span className='hidden lg:block  pb-2'>Loja</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className='ganhadores-message'>
                  <td colSpan={4} className=''>
                    Buscando Informações...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr className=' '>
                  <td
                    colSpan={4}
                    className='ganhadores-message '
                  >
                    Aguarde a divulgação dos ganhadores.
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr className='h-[35px]'>
                  <td colSpan={4} className=' ganhadores-message '>
                    Nenhum resultado encontrado.
                  </td>
                </tr>
              ) : (
                filteredData.map((ganhador, index) => {
                  const date = new Date(
                    ganhador.dt_saida_premio.replaceAll('-', '/')
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
                          {ganhador.desc_premio}
                          <br />
                          {`${ganhador.nome} - ${ganhador.numero_documento}`}
                          <br />
                          {ganhador.nome_fantasia}
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
                          {ganhador.desc_premio}
                        </span>
                      </td>
                      <td>
                        <span className='hidden lg:block'>
                          {ganhador.nome_fantasia}
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
