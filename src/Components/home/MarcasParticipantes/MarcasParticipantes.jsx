// import Swal from "sweetalert2";
import { Button } from "../../Button";
import { Title } from "../../Title";
import { MarcasSwiper } from "./MarcasSwiper";
import { Detalhe } from "../Detalhe";
export const MarcasParticipantes = () => {


  return (
    <section
      id="marcas-participantes"
      className="section-home section-home-secondary"
    >
        <Detalhe
          type="1-pri"
          className="left-[5%] md:left-[2%] top-[10%] md:top-[10%]"
        />
        <Detalhe
          type="2-pri"
          className=" left-[77%] md:left-[90%] top-[10%] md:top-[85%]"
        />

      <div className="wrapper-home">
        <Title
          alt="Marcas Participantes"
          titleImg="images/titles/marcas-participantes.webp"
          className="marcas-title"
        />

        <h3 className="text-marcas ">
          A cada{" "}
          <span className="text-highlight-marcas">produto participante</span>{" "}
          comprado, você ganha{" "}
          <span className="text-highlight-marcas">+4 números da sorte</span> e{" "}
          <span className="text-highlight-marcas">+ 4 chances</span>*
        </h3>

        <MarcasSwiper />

        <div className=" text-wrapper-marcas-button ">
          <p className=" text-marcas-wrapper-button">
            Não são todos os produtos das marcas participantes que geram números
            da sorte e chances no balão.{" "}
            <span className="text-highlight-marcas-wrapper-button">
              {" "}
              Confira os produtos participantes.{" "}
            </span>
          </p>
          <Button link="/produtos-participantes/" fill="outline">
            Lista de produtos participantes
          </Button>
        </div>
      </div>
    </section>
  );
};
