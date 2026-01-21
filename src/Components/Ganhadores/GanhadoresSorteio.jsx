import { useEffect, useState } from 'react';
import api from '../../../src/services/api';
import { Accordion } from '../../Components/Accordion';

export const GanhadoresSorteio = ({ open, onClick }) => {
  const [word, setWord] = useState(undefined);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
    .get("/winner")
    .then((data) => {
      const filterWinnersSkate = data.filter((win) => {
        const date = new Date(win.dt_premio.replaceAll("-", "/"));
        const comparisonDate = new Date("2024-12-30");
        return date < comparisonDate 
      });
      setData(filterWinnersSkate);
      setFilteredData(filterWinnersSkate);
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
      titleButton='Carro 0KM - Sorteio Aniversário'
      onClick={onClick}
      open={open}
      info={data}
      isVisible={false}
      onChange={(e) => setWord(e.target.value.toLowerCase())}
      word={word}
    >
      <div className=' p-4 text-zinc-700'>
        <div className='overflow-x-auto h-fit max-h-[20rem]  '>
          <table className='  w-full text-center border-collapse'>
            <thead>
              <tr className='bg-ganhadores-details text-white border lg:divide-x-2 lg:divide-duvidas-text sticky top-0'>
                <th>
                  <span className='lg:hidden font-title pb-2'>
                    Data
                    <br />
                    Nome
                    <br />
                    CPF
                    <br />
                    Loja <br />
                    Número da Sorte
                  </span>
                  <span className='hidden lg:block font-title pb-2'> Data </span>
                </th>
                <th>
                  <span className='hidden lg:block font-title pb-2'> Nome </span>
                </th>
                <th>
                  <span className='hidden lg:block font-title pb-2'> CPF </span>
                </th>
                <th>
                  <span className='hidden lg:block font-title pb-2'> Loja </span>
                </th>
                <th>
                  <span className='hidden lg:block font-title pb-2'> Número da Sorte </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className='bg-white p-4 text-zinc-800'>
                  <td colSpan={5} className='text-center p-6'>
                    Buscando Informações...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr className='bg-white p-4 text-zinc-800 '>
                  <td
                    colSpan={5}
                    className='mb-2 text-lg text-center font-normal italic p-6'
                  >
                    O sorteio será realizado no dia
                    <strong> 06/11/2024 e 04/12/2024</strong> <br />
                    Aguarde a divulgação dos ganhadores.
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr className='h-[35px] '>
                  <td colSpan={5} className='text-center bg-white py-3 '>
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
                      className='h-[35px] border-[1px] border-zinc-300 bg-white'
                    >
                      <td>
                        <span className='lg:hidden'>
                          {date.toLocaleDateString('pt-br')}
                          <br />
                          {ganhador.nome}
                          <br />
                          {ganhador.numero_documento}
                          <br />
                          {ganhador.filial}
                          <br />
                          {ganhador.numero_da_sorte}
                          <br />
                        </span>
                        <span className='hidden lg:block'> {date.toLocaleDateString('pt-br')}</span>
                      </td>
                      <td>
                        <span className='hidden lg:block'>{ganhador.nome}</span>
                      </td>
                      <td>
                        <span className='hidden lg:block'>{ganhador.numero_documento}</span>
                      </td>
                      <td>
                        <span className='hidden lg:block'>{ganhador.filial}</span>
                      </td>
                      <td>
                        <span className='hidden lg:block'>
                          {ganhador.numero_da_sorte}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Accordion>
  );
};
