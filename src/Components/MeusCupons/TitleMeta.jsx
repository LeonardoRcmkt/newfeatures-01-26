
export const TitleMeta = ({ qtd }) => {
  return (

    <div>
      <h3 className="saldo-details-text text-2xl ">
        <span className="text-white">Ganhe</span> +{qtd}{" "}
        {qtd > 1 ? (
          <>
            números da sorte <span className="text-white"> e </span> +{qtd} chances
          </>
        ) : (
          <>
            número da sorte <span className="text-white"> e </span> +{qtd} chance
          </>
        )}
      </h3>

      <p className="text-white">
        Em <span className="saldo-details-text">prêmios instantâneos</span> e
        nos <span className="saldo-details-text">sorteios</span>
      </p>
    </div>

  );
};
