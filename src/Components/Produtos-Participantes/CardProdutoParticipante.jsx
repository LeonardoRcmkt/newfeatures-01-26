import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BiSolidStar } from "react-icons/bi";
import { useState } from "react";

export const CardProdutoParticipante = ({
  variable = "primary",
  title,
  ean,
  srcBrand,
  category,
  src,
}) => {
  const MySwal = withReactContent(Swal);
  const [imageMarcaSrc, setImageMarcaSrc] = useState(
    `/images/marcas-participantes/${String(srcBrand)}.jpg`
  );

  const openModal = () => {
    MySwal.fire({
      background: "transparent",
      html: (
        <div
          className={`produtos-participantes-card ${variable === "primary" ? "bg-secondary" : "bg-primary"
            }`}
          style={{ maxWidth: "80vw" }}
        >
          <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full">
            <div className="flex md:justify-start md:items-start flex-col gap-2">
              <h1
                className={`font-black uppercase leading-none bg-clip-text text-transparent text-sm md:text-lg text-center md:text-left max-w-[25rem] mt-6 md:mt-0 ${classNameTitle}`}
              >
                {title}
              </h1>
              <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-2">
                {variable === "secondary" && (
                  <h3 className="py-1  bg-secondary-gradient-linear text-accent-500 uppercase flex gap-2 font-bold text-sm rounded-lg shadow-light-sm flex items-center justify-center leading-none">
                    <div className="bg-accent bg-cover h-5 w-5 rounded-full flex items-center justify-center "> <BiSolidStar className="text-secondary-700" /></div>   Produto Impulsionador
                  </h3>
                )}
                <h2 className={`uppercase text-xs md:text-sm ${classNameEan}`}>
                  {category}
                </h2>
              </div>
            </div>
            <div className="h-[50px] w-[50px] 9-8 flex justify-center items-center rounded-sm overflow-hidden bg-white">
              <img
                className="w-full"
                src={imageMarcaSrc}
                onError={() => setImageMarcaSrc(`/images/indisponivel.jpg`)}
                alt={srcBrand}
              />
            </div>
          </div>
          <figure className="flex flex-col items-center gap-2">
            <div className="rounded-2xl  overflow-hidden flex items-center justify-center mx-2 p-4 bg-white">
              <img
                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] hover:scale-105 duration-300 ease-in-out bg-white"
                src={src ? src : `/images/indisponivel.jpg`}
                alt={title}
              />
            </div>
            <figcaption className={`text-sm mx-auto ${classNameEan}`}>
              EAN: {ean}
            </figcaption>
          </figure>
        </div>
      ),
      showCloseButton: true,
      showConfirmButton: false,
      width: "52rem",
    });
  };

  let classNameBackground = "";
  let classNameTitle = "";
  let classNameEan = "";

  switch (variable) {
    case "secondary":
      classNameBackground =
        "bg-primary bg-cover ";
      classNameTitle = "text-white";
      classNameEan = "text-white";
      break;
    default:
      classNameBackground = "bg-white/10";
      classNameTitle = "bg-primary-500";
      classNameEan = "text-primary-500";
      break;
  }

  return (
    <div
      onClick={openModal}
      className={`produtos-participantes-card  ${classNameBackground}  `}
    >
      <div className="flex flex-col gap-1 items-center text-center">
        {variable === "secondary" && (
          <h3 className="py-1  bg-secondary-gradient-linear text-accent-500 uppercase flex gap-2 font-bold text-sm rounded-lg shadow-light-sm flex items-center justify-center leading-none">
            <div className="bg-accent bg-cover h-5 w-5 rounded-full flex items-center justify-center "> <BiSolidStar className="text-secondary-700" /></div>   Produto Impulsionador
          </h3>
        )}
        <h2
          className={` uppercase leading-none bg-clip-text text-transparent text-sm  overflow-hidden text-ellipsis ${classNameTitle}`}
        >
          {title.length > 25 ? `${title.slice(0, 25)}...` : title}
        </h2>

      </div>
      <div className="rounded-2xl bg-white overflow-hidden flex items-center justify-center p-2 mx-2">
        <img
          className="w-full hover:scale-105 duration-300 ease-in-out bg-white"
          src={src ? src : `/images/indisponivel.jpg`}
          alt={title}
        />
      </div>
      <p className={`text-xs ${classNameEan}`}>EAN: {ean}</p>
    </div>
  );
};
