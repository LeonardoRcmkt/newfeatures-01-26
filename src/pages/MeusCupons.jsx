import { useEffect, useState } from "react";
import api from "../services/api.js";
import { Cupom } from "../Components/MeusCupons/Cupom.jsx";
import { Title } from "../Components/Title.jsx";
import { Menu } from "../Components/MeusCupons/Menu.jsx";
import { Button } from "../Components/Button.jsx";



export const MeusCupons = () => {
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [produtosParticipantesSaldo, setProdutosParticipantesSaldo] =
    useState();
  const [produtosImpusionadoresSaldo, setProdutosImpusionadoresSaldo] =
    useState();
  const [comprasFidelizadas, setComprasFidelizadas] =
    useState();
  const [data, setData] = useState({});

  const handleAccordionClick = (index) => {
    setOpen((prevOpenAccordion) =>
      prevOpenAccordion === index ? null : index
    );
  };



  useEffect(() => {
    api.get("/coupon").then((response) => {
      setData(response);
      setProdutosParticipantesSaldo(response.saldo.produto_participante_saldo);
      setProdutosImpusionadoresSaldo(
        response.saldo.produto_impulsionador_saldo
      );
      setComprasFidelizadas(response.lojas_fidelizadas)
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
        <Title titleImg={"/images/titles/meus-cupons.webp"} alt={'Meus Cupons'} className={'w-44!'} />

        <div className="w-full max-w-6xl px-6  flex flex-col gap-4 justify-center items-center ">
          {loading ? (
            <p className=" animate-pulse w-full text-center pt-10 font-bold text-secondary text-white">
              Buscando Informações...
            </p>
          ) : data.cupons.length > 0 ? (
            <div className="flex flex-col gap-12 w-full items-center justify-center ">


              <Menu
                totalValor={data.valor_total_pedidos}
                cupons={data.cupons.length}
                sorte={data.sorte}
                chances={data.saldo.chances}

              />
              <p className="text-white max-w-4xl text-center">*Apenas <b>pedidos maiores que R$10,00</b> serão considerados para promoção. <b> Sua nota pode demorar até 72h para ser efetivada </b> após a realização da compra.</p>

              <section className="flex flex-col gap-2 w-full items-center justify-center ">
                {data.cupons.map((cupom, index) => {
                  return (
                    <Cupom
                      key={index}
                      cupom={cupom}
                      open={index === open}
                      onClick={() => handleAccordionClick(index)}
                    />
                  );
                })}

              </section>
              <Button
                link="/cadastrar-cupons/"


              >cadastrar cupons</Button>
            </div>
          ) : (
            <>
              <Menu
                chances={data.saldo.chances}
                cupons={data.cupons.length}
                sorte={data.sorte}
                premios={data.premios.length}
              />
              <h2 className="text-white w-full text-center py-2 px-2 rounded-lg ">
                Você ainda não possui nenhum cupom cadastrado. <br />
              </h2>
              <Button
                link="/cadastrar-cupons/"
                className="!text-white "
                fill="outline"
                icon={true}
              >cadastrar cupons</Button>
            </>
          )}

        </div>
      </section>
    </>
  );
};
