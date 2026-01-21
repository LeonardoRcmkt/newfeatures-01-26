import { Title } from "../Title";
import { Button } from "../Button";
import { Detalhe } from "./Detalhe";

export const Video = () => {
  const token = localStorage.getItem("token");

  return (
    <section
      id="video"
      className="section-home rounded-secondary-md bg-secondary "
    >
      <Detalhe
        type="1-pri"
        className="left-[5%] md:left-[2%] top-[17%] md:top-[12%]"
      />
      <Detalhe
        type="2-pri"
        className=" left-[77%] md:left-[90%] top-[17%] md:top-[85%]"
      />
      <div className="wrapper-home">
        <Title
          alt="Marcas Participantes"
          titleImg="images/titles/video.webp"
          className="video-title"
        />
        <iframe
          title="Vídeo promocional da campanha"
          className="video-iframe"
          src="https://www.youtube.com/embed/KwXvUFFy-bU"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          rel="preconnect"
        ></iframe>
      </div>
    </section>
  );
};

// <section
//   id="marcas-participantes"
//   className="section-home section-home-secondary"
// >
//   <div className="wrapper-home">
//     <Title
//       alt="Marcas Participantes"
//       titleImg="images/titles/marcas-participantes.webp"
//     />

//     <h3 className="text-marcas ">
//       A cada{" "}
//       <span className="text-highlight-marcas">produto participante</span>{" "}
//       comprado, você ganha{" "}
//       <span className="text-highlight-marcas">+4 números da sorte</span> e{" "}
//       <span className="text-highlight-marcas">+ 4 chances</span>*
//     </h3>

//     <MarcasSwiper />

//     <div className=" text-wrapper-marcas-button ">
//       <p className=" text-marcas-wrapper-button">
//         Não são todos os produtos das marcas participantes que geram números
//         da sorte e chances no balão.{" "}
//         <span className="text-highlight-marcas-wrapper-button">
//           {" "}
//           Confira os produtos participantes.{" "}
//         </span>
//       </p>
//       <Button link="/produtos-participantes/" fill="outline">
//         Lista de produtos participantes
//       </Button>
//     </div>
//   </div>
// </section>
