import React, { useState, useEffect } from "react";
import { BiSolidShoppingBag } from "react-icons/bi";

export const SaldoProdutoParticipante = ({ produtoParticipanteSaldo, chancesSaldo }) => {
  const [produtoInfo, setProdutoInfo] = useState({
    icons: ["empty", "empty"],
    text: "",
  });

  useEffect(() => {
    if (produtoParticipanteSaldo % 2 === 0) {
      // Vazio
      setProdutoInfo({
        icons: ["empty", "empty"],
        text: "2 produtos",
      });
    } else {
      // Cheio + vazio
      setProdutoInfo({
        icons: ["full", "empty"],
        text: "1 produto",
      });
    }
  }, [produtoParticipanteSaldo]);

  return (
    <div className="saldo-produto  ">

      <div className="text-white md:w-3/4  flex flex-col  p-4 md:p-6 ">

        <p className="w-full mb-4  ">
          <span className="font-extrabold font-paragraph text-base md:text-lg text-left">A cada <b className=" saldo-details-text">2 produtos participantes</b> acumulados.</span> <br />
          <span>Válido após acumular ao menos R$100,00. </span>
        </p>

        <div className="flex justify-start items-center my-2">
          {produtoInfo.icons.map((state, index) => (
            <BiSolidShoppingBag
              key={index}
              className={`w-12 h-12 transition-all duration-300 ${state === "full" ? "opacity-100" : "opacity-30"
                }`}
            />
          ))}

        </div>
        <div className="flex justify-between w-full  text-sm md:text-base">
          <span className="text-left">
            <p className="  ">
              Comprado: <b className="saldo-details-text">{produtoParticipanteSaldo % 2}</b>
            </p>

          </span>

          <span className="tracking-wide font-bold ">
            Faltam:<span className="text-secondary-100"> {produtoInfo.text}</span>
          </span>
        </div>

      </div>
      <div className="saldo-bg-secondary  ">
        <p className="text-center  text-base pb-4 ">
          Acumulados por <span className="text-accent-500">produtos participantes</span>
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 items-center">
            <p className="">Nºs da Sorte </p>
            <p className="text-accent-500 text-2xl">{chancesSaldo}</p>
          </div>
          <div className="flex flex-col gap-1 items-center ">
            <p>Chances </p>
            <p className="text-accent-500 text-2xl">{chancesSaldo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
