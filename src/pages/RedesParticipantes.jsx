import { useEffect, useState } from "react";
import { FaChevronLeft, FaMapMarkerAlt } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa6";
import { Search } from "../Components/Search";
import { Title } from "../Components/Title";
import { Accordion } from "../Components/Accordion";
import api from "../services/api";

export const RedesParticipantes = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);

  return (
    <section className="min-h-screen h-auto flex flex-col justify-start items-center overflow-hidden relative bg-cover bg-no-repeat bg-center  md:pb-14 md:px-14">
      <div className="container mx-auto space-y-12">
        {selectedBranch == null ? (
          <RedesGrid setSelectedBranch={setSelectedBranch} />
        ) : (
          <RedeUnits
            setSelectedBranch={setSelectedBranch}
            selectedBranch={selectedBranch}
          />
        )}
      </div>
    </section>
  );
};

const RedesGrid = ({ setSelectedBranch }) => {
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    api
      .get("/branches")
      .then((response) => {
        setBranches(response.branches || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (word) {
      const filtered = branches.filter((e) =>
        e.branch.toLowerCase().includes(word.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(branches);
    }
  }, [branches, word]);


  return (
    <main main className="main-internas max-w-7xl mx-auto">

      <Title titleImg={"/images/titles/redes-participantes.webp"} alt={'Redes-Participantes'} className={'w-72!'} />


      <Search
        onChange={(e) => setWord(e.target.value.toLowerCase())}
        word={word}
        placeholder="Busque pelo nome da rede"
        isVisible={true}
      />


      {
        loading ? (
          <p className='text-center  mx-auto text-primary-500  py-3 font-bold animate-pulse'>
            Buscando Informações...
          </p>
        ) :
          filteredData.length === 0 ? (

            <p className='text-center  mx-auto text-white  py-3 font-bold uppercase'>
              Nenhum resultado encontrado.
            </p>
          ) : (<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-6 ">
            {filteredData.map((branch, index) => (
              <article
                key={index}
                onClick={() => setSelectedBranch(branch)}
                className="bg-white/10 redes-participantes-card p-2 flex flex-col items-center justify-center gap-2 cursor-pointer py-6"
              >
                <header className="text-lg font-black font-title uppercase text-primary-500  text-center leading-none min-h-12 line-clamp-2">
                  {branch.branch}
                </header>
                <div className="w-4/5 mx-auto aspect-square bg-white rounded-md overflow-hidden">
                  <img
                    className="w-full"
                    src={`/images/redes/${branch.branch}.jpg`}
                    alt={branch.branch}
                    onError={(e) => (e.target.src = "/images/indisponivel.jpg")}
                  />
                </div>
                <footer className="text-lg font-black font-title uppercase text-secondary-700">
                  Ver Lojas
                </footer>
              </article>
            ))}
          </section>)
      }

    </main>
  );
};

const RedeUnits = ({ setSelectedBranch, selectedBranch }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="w-full   gap-8  ">
      <header className=" relative flex items-center flex-col gap-8 justify-center w-full">
        <div
          onClick={() => setSelectedBranch(null)}
          className="absolute left-0 top-4 text-lg text-primary-700 font-black font-title uppercase flex gap-2 items-center justify-center cursor-pointer"
        >
          <FaChevronLeft /> Voltar{" "}
        </div>
        <h3 className="text-3xl text-center w-full text-secondary-700 font-extrabold font-title uppercase pt-12" >{selectedBranch.branch} </h3>
        <div className="!w-48 mx-auto aspect-square bg-white rounded-md overflow-hidden redes-participantes-card ">
          <img
            className="w-full"
            src={`/images/redes/${selectedBranch.branch}.jpg`}
            alt={selectedBranch.branch}
            onError={(e) => (e.target.src = "/images/indisponivel.jpg")}
          />
        </div>
      </header>
      <div className="w-full max-w-7xl mx-auto  flex flex-col gap-8 items-center justify-start pt-10">
        <h2 className="text-3xl text-secondary-700 font-extrabold font-title uppercase">
          Unidades
        </h2>
        <div className="flex flex-col gap-6 w-full min-h-auto  overflow-y-auto p-4">
          {selectedBranch.units.map((unit, key) => (
            <Accordion
              key={key}
              titleButton={`unidade ${unit.bairro}`}
              open={open === key} // ✅ Agora abre só o clicado
              onClick={() => setOpen(open === key ? null : key)}
              headerClass="redes-participantes-premios-header text-primary-500! "
              className="meus-premios-accordion"
            >

              <div
                className={`bg-white rounded-b-md flex-col justify-center itens-start gap-2 text-left text-primary-500 text-lg p-4  `}
              >
                <span>{`${unit.endereco}, ${unit.numero} - CEP ${unit.cep}`} </span>
                <span className="uppercase font-extrabold">{` -  ${unit.cidade} / ${unit.uf}`}</span>
                <a
                  className="text-secondary-700 font-extrabold uppercase flex items-center gap-2 w-fit py-2 "
                  href={`https://www.google.com/maps/search/?api=1&query=${unit.endereco} ${unit.numero} ${unit.cidade}`}
                  target="_blank"
                >
                  Ver Localização
                </a>
              </div>

            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};
