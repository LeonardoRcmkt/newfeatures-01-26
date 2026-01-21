import { useState, useEffect } from 'react';
import { AccordionPremios } from '../Components/MeusPremios/AccordionPremios.jsx';
import { AccordionPremiosGanhos } from '../Components/MeusPremios/AccordionPremiosGanhos.jsx';
import { Title } from '../Components/Title.jsx';
import api from "../services/api.js";

export const MeusPremios = () => {
  const [openPremiosGanhos, setOpenPremiosGanhos] = useState(true);
  const [openPremios, setOpenPremios] = useState(false);
  const [qtdPremios, setQtdPremios] = useState(0);

  // Função para buscar os prêmios
  useEffect(() => {
    const fetchPremios = async () => {
      try {
        const data = await api.get("/award"); // Requisição à API
        if (data && Array.isArray(data)) {
          setQtdPremios(data.length); // Define o número de prêmios
        } else {
          setQtdPremios(0); // Caso não haja prêmios
        }
      } catch (error) {
        console.error("Erro ao buscar prêmios:", error);
        setQtdPremios(0); // Trata erros
      }
    };

    fetchPremios();
  }, []); // Executa apenas uma vez ao carregar o componente

  const handleOpenPremiosGanhos = () => {
    setOpenPremiosGanhos(!openPremiosGanhos);
    setOpenPremios(false);
  };

  const handleOpenPremios = () => {
    setOpenPremios(!openPremios);
    setOpenPremiosGanhos(false);
  };

  return (
    <section id="meus-premios" className='main-internas '>

      <Title titleImg={"/images/titles/meus-premios.webp"} alt={'Meus Prêmios'} className={"w-44!"} />
      <p className=' text-xl -mt-2 text-left font-black text-white'>Você tem <span className=' drop-shadow-medium-sm  text-accent-500 text-2xl'>{qtdPremios}</span>{" "} {qtdPremios === 1 ? "prêmio" : "prêmios"}</p>

      <div className='w-full flex flex-col gap-12 max-w-6xl '>
        <AccordionPremiosGanhos
          onClick={handleOpenPremiosGanhos}
          open={openPremiosGanhos}
        />
        <AccordionPremios onClick={handleOpenPremios} open={openPremios} />
      </div>
    </section>
  );
};
