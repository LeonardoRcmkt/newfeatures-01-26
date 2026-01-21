export const Saldo = ({ saldo, dividendo }) => {
  saldo = saldo % 200;
  const porcentagem = (saldo * 100) / dividendo;
  const resto = dividendo - saldo;



  return (
    <div className=' saldo     '>
      <div className='text-saldo flex flex-col justify-center w-full mx-auto  gap-2 items-center '>
        <p className="w-full mb-2  ">
          <span className="font-extrabold font-paragraph text-base md:text-lg text-left">A cada <b className=" saldo-details-text">R$ 100,00</b> em <span className=" saldo-details-text">pedidos acumulativos</span>.</span> <br />
          <span>A partir de R$10,00 em qualquer produto nas redes participantes. </span>
        </p>
        <div className='saldo-barra-bg  h-4 rounded-lg w-full  relative'>
          <div
            className='absolute -left-[1px] -bottom-[1px] saldo-barra w-full h-4 rounded-lg'
            style={{ width: `${porcentagem}%` }}
          >
            <span
              className={`absolute -top-[2px] text-xs  text-secondary-900 font-title font-black mb-2  mr-8`}
              style={{
                left: `${porcentagem < 15 ? 2 : porcentagem > 100 ? 90 : porcentagem - 15
                  }%`,
              }}
            >
              {Math.floor(porcentagem)}%
            </span>
          </div>
        </div>
        <div className="flex justify-between w-full  text-sm md:text-base">
          <span className="text-left">
            <p className="  ">
              Comprado: <b className="saldo-details-text">R${parseFloat(saldo.toFixed(2)).toFixed(2)}</b>
            </p>

          </span>

          <span className="tracking-wide font-bold ">
            Faltam:<span className="text-secondary-100"> R${parseFloat(resto.toFixed(2)).toFixed(2)}</span>
          </span>
        </div>
      </div>

    </div>
  );
};
