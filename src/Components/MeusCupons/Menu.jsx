import Swal from "sweetalert2";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const Menu = ({ totalValor, chances, cupons, sorte }) => {
  let navigate = useNavigate();
  function openNumerosSorte() {
    Swal.fire({
      title:
        sorte.length > 0
          ? `VOCÊ POSSUI ${sorte.length} NÚMERO${sorte.length > 1 ? "S" : ""
          } DA SORTE`
          : `VOCÊ NÃO POSSUI NÚMEROS DA SORTE`,
      text: sorte
        .map((num) => {
          const strNum = num.toString().padStart(9, "0");
          return `${strNum.slice(-9, -5)}-${strNum.slice(-5)}`;
        })
        .join(" / "),
      showConfirmButton: true,
    });
  }

  const itens = [
    {
      value: Number(totalValor ? totalValor : '0'.replace(",", ".")).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      title: "Total em Compras",
      textValue: "text-white",
      classNameLabel: "bg-secondary-900 text-white",
      button: false,
    },
    {
      value: cupons,
      title: "Cupons Cadastrados",
      textValue: "text-white",
      classNameLabel: "bg-secondary-900 text-white",
      button: false,
    },
    {
      value: sorte.length,
      title: "Números da Sorte",
      textValue: "text-accent-500",
      classNameLabel: "bg-accent-500 text-secondary-900",
      button: {
        text: "Ver Números",
        secondary: true,
        function: openNumerosSorte,
      },
    },
    {
      value: chances,
      title: "Chances na Raspadinha",
      textValue: "text-accent-500",
      classNameLabel: "bg-secondary-900 text-white",
      button: {
        text: "Jogar",
        className:
          "text-card-chances-button-text bg-card-chances-button border-card-chances-button-text",
        classNameMD:
          "text-card-chances-button-text bg-card-chances-button border-card-chances-button-text",
        function: () => navigate("/game/"),
      },
    },
    // {
    //   value: premios,
    //   title: "Prêmios",
    //   textValue: "text-white",
    //   classNameLabel: "bg-secondary-900 text-white",
    //   // button: {
    //   //   text: "Jogar",
    //   //   className:
    //   //     "text-card-chances-button-text bg-card-chances-button border-card-chances-button-text",
    //   //   classNameMD:
    //   //     "text-card-chances-button-text bg-card-chances-button border-card-chances-button-text",
    //   //   function: () => navigate("/game/"),
    //   // },
    // },
  ];
  return (
    <div className="flex w-full flex-col gap-4 ">

      <div className="flex flex-col md:flex-row gap-8 items-start justify-start w-full animate-fade-up animate-ease-linear px-2 md:px-4">
        {itens.map((i, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col w-full justify-self-start relative"
          >
            <div className="flex flex-col w-full h-full items-center gap-4 container-sm  ">
              <div
                className={`flex items-center md:justify-center relative w-full h-full meus-cupons-menu-value   ${i.button ? "justify-between" : "justify-center"}`}
              >
                <div
                  className={`flex flex-col text-sm text-center justify-center items-center container   w-full md:gap-0  ${i.button ? "gap-2" : "gap-4"
                    }`}
                >
                  <p className={`text-4xl min-w-fit w-full md:text-5xl md:my-6  ${i.textValue}  font-title tracking-wider  px-8 md:p-0`}>
                    {i.value}
                  </p>
                  <div className={`flex justify-center min-w-min meus-cupons-menu-label ${i.classNameLabel}
                    } w-full py-2 md:py-4 items-center px-8 md:p-0`}>
                    <h3
                      className={`text-center  leading-4 p-2  font-title flex justify-center items-center md:text-base ${i.button ? "text-xs" : "text-sm"
                        } `}
                    >
                      {i.title}
                    </h3>
                  </div>
                </div>
              </div>
              {i.button && (
                <Button
                  onClick={i.button.function}
                  className={`${i.button.classNameMD} text-base  w-full !text-white  `}
                  fill="outline"


                > {i.button.text}</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
