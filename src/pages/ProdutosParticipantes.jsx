import React, { useEffect, useMemo, useState } from "react";
import api from "../../src/services/api.js";
import { BannerIndustria } from "../Components/BannerIndustriaSwiper.jsx";
import { Button } from "../Components/Button.jsx";
import { CardProdutoParticipante } from "../Components/Produtos-Participantes/CardProdutoParticipante.jsx";
import { Search } from "../Components/Search.jsx";
import { Title } from "../Components/Title.jsx";
import { useLocation } from "react-router-dom";
import Container from "../Components/Container.jsx";

export const ProdutosParticipantes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isImpulsionadorFromUrl = queryParams.get("impulsionadores") === "true";
  const marcaFromUrl = queryParams.get("marca")?.toLowerCase() || "";
  const [marcaFilter, setMarcaFilter] = useState(marcaFromUrl);
  const [word, setWord] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isImpulsionadorChecked, setIsImpulsionadorChecked] = useState(isImpulsionadorFromUrl);
  const [visibleCount, setVisibleCount] = useState(20); // Novo estado para contar itens visíveis

  useEffect(() => {
    // Carrega os dados apenas uma vez
    const fetchData = async () => {
      try {
        const response = await api.get("/products");
        setData(response || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtragem baseada em pesquisa e checkbox
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      console.log()
      const matchesWord =
        !word ||
        item.produto.toLowerCase().includes(word) ||
        item.ean.toLowerCase().includes(word);
      const matchesImpulsionador =
        !isImpulsionadorChecked || item.produto_participante === "I";
      const matchesMarca =
        !marcaFilter ||
        item.marca?.toLowerCase() === marcaFilter;
      return matchesWord && matchesImpulsionador && matchesMarca;
    });
  }, [data, word, isImpulsionadorChecked, marcaFilter]);

  // Função para carregar mais itens
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  // Determina se há mais itens para carregar
  const hasMore = visibleCount < filteredData.length;

  return (
    <section
      id="produtos-participantes"
      className="main-internas w-full "
    >

      <Title titleImg={"/images/titles/produtos-participantes.webp"} alt={'Produtos Participantes'} className={'w-72!'} />

      <Container secondary className="w-full max-w-7xl flex flex-col md:flex-row md:justify-between  md:items-center gap-4 ">
        <Search
          placeholder="Pesquise pelo nome do produto ou EAN"
          onChange={(e) => setWord(e.target.value.toLowerCase())}
          word={word}
          className={" w-full!"}
        />
        <div className="flex items-center justify-center ">
          <label
            className="block relative pl-6 cursor-pointer text-primary-500  text-left leading-5"
            htmlFor="produto-impulsionador"
          >
            Filtrar apenas Impulsionadores
            <input
              className="absolute left-0 top-[50%]  cursor-pointer h-4 w-4 rounded-2xs"
              type="checkbox"
              id="produto-impulsionador"
              name="produto-impulsionador"
              checked={isImpulsionadorChecked}
              onChange={(e) => setIsImpulsionadorChecked(e.target.checked)}
            />
          </label>
        </div>

      </Container>

      {loading ? (
        <p className="animate-pulse w-full text-center pt-10 font-bold text-secondary text-primary-500">
          Buscando Informações...
        </p>
      ) : filteredData.length === 0 ? (
        <p className="text-center font-bold text-primary-500">
          Nenhum resultado encontrado.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 h-fit over p-6 max-w-7xl">
            {filteredData.slice(0, visibleCount).map((item, index) => (
              <CardProdutoParticipante
                key={item.ean ? `${item.ean}-${index}` : index} // Fallback para índice
                title={item.produto}
                ean={item.ean}
                src={item.img}
                category={item.categoria}
                srcBrand={item.marca}
                variable={
                  item.produto_participante === "I" ? "secondary" : "primary"
                }
              />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center ">
              <Button onClick={loadMore} >Carregar mais</Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
