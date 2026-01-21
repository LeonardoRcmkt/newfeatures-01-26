import { useState } from 'react';
import { GanhadoresSorteioCasa } from '../Components/Ganhadores/GanhadoresSorteioCasa';
import { GanhadoresSorteioCarro } from '../Components/Ganhadores/GanhadoresSorteioCarro';
import { GanhadoresSorteioTv } from '../Components/Ganhadores/GanhadoresSorteioTv';
import { GanhadoresSorteioSmartphone } from '../Components/Ganhadores/GanhadoresSorteioSmartphone';
import { GanhadoresInstantaneo } from '../Components/Ganhadores/GanhadoresInstantaneo';
import { Title } from '../Components/Title';
import { GanhadoresSorteioVideogame } from '../Components/Ganhadores/GanhadoresSorteioVideogame';

export const Ganhadores = () => {
  const [openSorteioCasa, setIsOpenSorteioCasa] = useState(false);
  const [openSorteioCarro, setIsOpenSorteioCarro] = useState(false);
  const [openSorteioMoto, setIsOpenSorteioMoto] = useState(false);
  const [openSorteioSmartphone, setIsOpenSorteioSmartphone] = useState(false);
  const [openSorteioVideogame, setIsOpenSorteioVideogame] = useState(false);
  const [openInstantaneo, setIsOpenInstantaneo] = useState(false);

  const handleOpenSorteioCasa = () => {
    setIsOpenSorteioCasa(!openSorteioCasa);
    setIsOpenInstantaneo(false);
    setIsOpenSorteioCarro(false);
    setIsOpenSorteioMoto(false);
    setIsOpenSorteioVideogame(false)
    setIsOpenSorteioSmartphone(false);
  };

  const handleOpenSorteioCarro = () => {
    setIsOpenSorteioCarro(!openSorteioCarro);
    setIsOpenInstantaneo(false);
    setIsOpenSorteioCasa(false);
    setIsOpenSorteioMoto(false);
    setIsOpenSorteioVideogame(false)
    setIsOpenSorteioSmartphone(false);
  };

  const handleOpenSorteioMoto = () => {
    setIsOpenSorteioMoto(!openSorteioMoto);
    setIsOpenInstantaneo(false);
    setIsOpenSorteioCasa(false);
    setIsOpenSorteioCarro(false);
    setIsOpenSorteioVideogame(false)
    setIsOpenSorteioSmartphone(false);
  };

  const handleOpenSorteioSmartphone = () => {
    setIsOpenSorteioSmartphone(!openSorteioSmartphone);
    setIsOpenInstantaneo(false);
    setIsOpenSorteioCasa(false);
    setIsOpenSorteioCarro(false);
    setIsOpenSorteioVideogame(false)
    setIsOpenSorteioMoto(false);
  };

  const handleOpenSorteioVideogame = () => {
    setIsOpenSorteioVideogame(!openSorteioVideogame);
    setIsOpenInstantaneo(false);
    setIsOpenSorteioCasa(false);
    setIsOpenSorteioCarro(false);
    setIsOpenSorteioSmartphone(false);
    setIsOpenSorteioMoto(false);
  };

  const handleOpenInstantaneo = () => {
    setIsOpenInstantaneo(!openInstantaneo);
    setIsOpenSorteioCasa(false);
    setIsOpenSorteioCarro(false);
    setIsOpenSorteioMoto(false);
    setIsOpenSorteioSmartphone(false);
    setIsOpenSorteioVideogame(false)
  };

  return (
    <section
      id="ganhadores"
      className="main-internas"
    >
      <div className="">
        <Title titleImg={"/images/titles/ganhadores.webp"} alt={'Ganhadores'} className={'w-72!'} />
      </div>
      <div className="w-full relative md:w-[70%] flex flex-col gap-4">
        <GanhadoresSorteioCasa open={openSorteioCasa} onClick={handleOpenSorteioCasa} />
        <GanhadoresSorteioCarro open={openSorteioCarro} onClick={handleOpenSorteioCarro} />
        <GanhadoresSorteioTv open={openSorteioMoto} onClick={handleOpenSorteioMoto} />
        <GanhadoresSorteioSmartphone
          open={openSorteioSmartphone}
          onClick={handleOpenSorteioSmartphone}
        />
        <GanhadoresSorteioVideogame open={openSorteioVideogame} onClick={handleOpenSorteioVideogame} />
        <GanhadoresInstantaneo open={openInstantaneo} onClick={handleOpenInstantaneo} />
      </div>
    </section>
  );
};
