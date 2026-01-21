import React, { useState, useEffect } from "react";
import { BiSolidStar } from "react-icons/bi";

export const SaldoProdutoImpulsionador = ({ chancesSaldoImpulsionador }) => {

  return (
    <div className="saldo-produto  ">

      <div className="text-white md:w-3/4  flex flex-col  p-4 md:p-6 ">

        <p className="w-full  flex gap-2  ">

          <span className="font-extrabold font-paragraph text-base md:text-lg text-left">A cada <b className=" saldo-details-text">produtos impulsionador</b>  </span><div className="bg-accent bg-cover h-8 w-8 rounded-full flex items-center justify-center"> <BiSolidStar className="text-secondary-700" /></div>       </p>
        <p className=" ">  Válido após acumular ao menos R$100,00.
        </p>




      </div>
      <div className="saldo-bg-secondary  ">
        <p className="text-center  pb-2 ">
          Acumulados por <span className="text-accent-500">produtos impulsionadores</span>
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 items-center">
            <p className="">Nºs da Sorte </p>
            <p className="text-accent-500 text-2xl">{chancesSaldoImpulsionador}</p>
          </div>
          <div className="flex flex-col gap-1 items-center ">
            <p>Chances </p>
            <p className="text-accent-500 text-2xl">{chancesSaldoImpulsionador}</p>
          </div>
        </div>
      </div>
    </div >
  );
};
