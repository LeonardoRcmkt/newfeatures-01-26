import { useEffect, useState } from "react";
import api from "../services/api.js";
import { Title } from "../Components/Title.jsx";
import { Menu } from "../Components/MeusCupons/Menu.jsx";
import { Saldo } from "../Components/MeusCupons/Saldo.jsx";
import { Button } from "../Components/Button.jsx";
import { SaldoProdutoParticipante } from "../Components/MeusCupons/SaldoProdutoParticipante.jsx";
import { SaldoProdutoImpulsionador } from "../Components/MeusCupons/SaldoProdutoImpulsionador.jsx";
import { TitleMeta } from "../Components/MeusCupons/TitleMeta.jsx";



export const MinhasMetas = () => {
  const [loading, setLoading] = useState(true);
  const [produtosParticipantesSaldo, setProdutosParticipantesSaldo] =
    useState();
  const [produtosImpusionadoresSaldo, setProdutosImpusionadoresSaldo] =
    useState();
  const [data, setData] = useState({});



  useEffect(() => {
    api.get("/coupon").then((response) => {
      setData(response);
      setProdutosParticipantesSaldo(response.saldo.produto_participante_saldo);
      setProdutosImpusionadoresSaldo(
        response.saldo.produto_impulsionador_saldo
      );

      setLoading(false);

    });
  }, []);


  const chancesResgatarProdutosParticipantes = produtosParticipantesSaldo
    ? parseInt(Math.trunc((produtosParticipantesSaldo / 2) * 4))
    : 0;

  const chancesResgatarProdutosImpulsionadores = produtosImpusionadoresSaldo
    ? parseInt(produtosImpusionadoresSaldo) * 10
    : 0;
  const chancesResgatarComprasAcumuladas = 0;
  const totalChancesResgatar =
    chancesResgatarProdutosImpulsionadores +
    chancesResgatarProdutosParticipantes +

    1;

  return (
    <>
      <section className="main-internas">
        <Title titleImg={"/images/titles/minhas-metas.webp"} alt={'Minhas Metas'} className={'w-40!'} />

        <div className="w-full max-w-6xl px-6  flex flex-col gap-4 justify-center items-center ">
          {loading ? (
            <p className=" animate-pulse w-full text-center pt-10 font-bold text-secondary text-white">
              Buscando Informações...
            </p>
          ) : (
            <div className="flex flex-col gap-12 w-full items-center justify-center ">
              <div className="bg-primary-500/10  font-extrabold text-white shadow-neon-container-sec  rounded-2xl rounded-br-5xl overflow-hidden">
                <p className="w-full py-2 px-6 ">Faltam  <span className="text-secondary-300 text-2xl"> R${100 - data.saldo.saldo}</span> para você liberar  </p>
                <p className="bg-white/10 text-accent-500 px-6 py-2 flex items-center gap-2"> <span className="text-2xl">{chancesResgatarComprasAcumuladas} </span>chances e números da sorte </p>
              </div>

              <div className="flex flex-col gap-12 w-full">
                <div >
                  <TitleMeta qtd={1} />

                  <Saldo
                    dividendo={100}
                    saldo={data.saldo.saldo}




                  />
                  <Button link="/redes-participantes/" className="!text-white " icon={true} fill="outline">Redes Participantes</Button>
                </div>
                <div className="flex flex-col gap-4  justify-start items-start">
                  <TitleMeta qtd={4} />
                  <SaldoProdutoParticipante
                    produtoParticipanteSaldo={produtosParticipantesSaldo}
                    chancesSaldo={chancesResgatarProdutosParticipantes}
                  />
                  <Button link="/produtos-participantes/" className="!text-white " icon={true} fill="outline">Produtos Participantes</Button>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <TitleMeta qtd={8} />
                  <SaldoProdutoImpulsionador
                    chancesSaldoImpulsionador={chancesResgatarProdutosImpulsionadores}
                  />
                  <Button link="/produtos-participantes/?impulsionadores=true" className="!text-white " icon={true} fill="outline">Produtos Impulsionadores</Button>
                </div>


              </div>

              <p className="text-white max-w-4xl text-center">*Apenas <b>pedidos maiores que R$10,00</b> serão considerados para promoção. <b> Sua nota pode demorar até 72h para ser efetivada </b> após a realização da compra.</p>



            </div>
          )}

        </div>
      </section>
    </>
  );
};
