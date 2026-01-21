import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { Button } from "./Button";
import { ModalPDF } from "./ModalPDF";
import { TrackSection } from "../data/TrackSection";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [textoLegal, setTextoLegal] = useState("");
   const { ref } = TrackSection();

    // const { bgPrimary, setBgPrimary } = useContext(AppContext);
    // useEffect(() => {
    //   inView ? setBgPrimary(true) : setBgPrimary(false);
    // }, [inView, setBgPrimary]);



  useEffect(() => {
    fetch("/arquivos/textolegal.txt")
      .then((response) => response.text())
      .then((texto) => setTextoLegal(texto));
  }, []);

  return (
    <footer ref={ref} className="section-home footer ">
      <section className="wrapper-home ">
        <div className="footer-duvidas">
          <h3 className="footer-duvidas-title">Ficou com dúvidas?</h3>
          <div className="footer-duvidas-wrapper">
            <div className="footer-faq">
              <p className="footer-faq-title">
                Tire suas dúvidas em <span>nosso FAQ</span>
              </p>{" "}
              <Button
                fill="outline"
                color="secondary"
                link="/duvidas#suporte"
                className="footer-button"
                childrenClass="footer-button-span"
              >
                Tire suas dúvidas
              </Button>
            </div>
            <div className="footer-suporte">
              <p className="footer-faq-title">
                Ou entre em contato com{" "}
                <span className="footer-highlight"> nosso suporte</span>
              </p>
              <p className="">
                Atendimento de segunda a Sexta-feira das 08:30 às 17h30, exceto
                feriados (horário de Brasília).
              </p>
              <Button
                fill="outline"
                color="primary"
                link="https://wa.me/551126261685?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20a%20Promo%C3%A7%C3%A3o%20Momentos%20de%20Alegria"
                className="footer-button-whatsapp"
                childrenClass="footer-button-whatsapp-span"
              >
                <FaWhatsapp className="" /> <span>(11) 2626-1685 </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a
              href="https://www.instagram.com/marcascampeas/"
              target="_blank"
              className="hover:opacity-80  hover:scale-110 duration-300 ease-in-out"
              aria-label="Ir para o Instagram"
            >
              <FaInstagram
                className="text-3xl text-footer-details"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.facebook.com/mcampeasoficial"
              target="_blank"
              className="hover:opacity-80 hover:scale-110 duration-300 ease-in-out"
              aria-label="Ir para o Facebook"
            >
              <FaFacebook className="text-3xl text-footer-details" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCCmtc-fddXzi1kxY2QkDp3w"
              target="_blank"
              className="hover:opacity-80 hover:scale-110 duration-300 ease-in-out"
              aria-label="Ir para o Youtube"
            >
              <FaYoutube className="text-3xl text-footer-details" />
            </a>
          </div>

          <div className=" footer-bottom-buttons">
            <ModalPDF
              title="Regulamento"
              PdfTitles={["sorteio", "vale brinde"]}
              files={[
                "/arquivos/regulamento-sorteio-1.pdf",
                "/arquivos/regulamento-vale-brinde-1.pdf",
              ]}
              color="white"
            />
            <ModalPDF
              title="Política de Privacidade"
              PdfTitles={["política de privacidade"]}
              files={["/arquivos/politica-de-privacidade-1.pdf"]}
              color="white"
            />
          </div>

          <div className="  footer-logos">
            <div className="footer-logo">
              <p className=" ">Reprodução e Realização</p>
              <a
                className=""
                href="https://www.rctrademkt.com.br/"
                target="_blank"
              >
                <img
                  className=""
                  src={"/images/base/logo-rc-trade-mkt.png"}
                  alt="Logo Rodapé"
                />
              </a>
            </div>
            <div className="footer-logo">
              <p className="">Administração e Realização</p>

              <img
                className=""
                src="/images/footer/logo-apas.svg"
                alt="Logo APAS"
              />
            </div>
          </div>
        </div>
        <p className="footer-texto-legal"> {textoLegal}</p>
      </section>
    </footer>
  );
};

//  <footer className="section-home">
//       <div className="container mx-auto grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-16 items-center">
//         <div className="col-span-2 md:col-span-4 2xl:col-span-2 overflow-hidden order-1">
//           <img
//             className="hidden md:block absolute left-0 -top-8 w-1/4 2xl:w-1/5"
//             src="/images/footer/vick-desktop.webp"
//           />
//           {window.location.href.includes("/game/") ? (
//             <img
//               className="md:hidden absolute bottom-full left-1/4 w-1/2"
//               src="/images/telas-internas/vic-gameficacao.webp"
//             />
//           ) : (
//             <img
//               className="md:hidden absolute bottom-[calc(100%_-_3rem)] left-1/4 w-1/2"
//               src="/images/footer/vick-mobile.webp"
//             />
//           )}
//         </div>
//         <div className="col-span-2 md:col-span-4 2xl:col-span-5 order-2">
//           <header className="text-center text-lg uppercase font-extrabold text-footer-social mb-4">
//             Acesse nossas redes
//           </header>
//           <div className="flex flex-col gap-4 text-footer-social font-extrabold">
//             <a
//               className="flex gap-2 border-4 border-footer-social rounded-lg justify-center items-center py-2"
//               href="https://www.instagram.com/marcascampeas/"
//             >
//               <FaInstagram className="text-xl" />
//               MARCASCAMPEAS
//             </a>
//             <a
//               className="flex gap-2 border-4 border-footer-social rounded-lg justify-center items-center py-2"
//               href="https://www.facebook.com/mcampeasoficial"
//             >
//               <FaFacebook className="text-xl" />
//               MCAMPEASOFICIAL
//             </a>
//             <a
//               className="flex gap-2 border-4 border-footer-social rounded-lg justify-center items-center py-2"
//               href="https://www.youtube.com/channel/UCCmtc-fddXzi1kxY2QkDp3w"
//             >
//               <FaYoutube className="text-xl" />
//               PROMOMARCASCAMPEAS
//             </a>
//           </div>
//         </div>
//         <div className="col-span-2 md:col-span-4 2xl:col-span-5 bg-footer-duvidas shadow-light-md rounded-md p-2 order-3">
//           <div className="w-full h-full rounded-md bg-transparent border-4 border-footer-duvidas px-4 md:px-6 md:py-4 flex flex-col items-center justify-center gap-2">
//             <header className="text-footer-duvidas-title text-lg md:text-xl text-center uppercase font-extrabold">
//               DÚVIDAS FREQUENTES
//             </header>
//             <p className="text-footer-duvidas text-sm text-center md:text-base md:text-left">
//               <a className="uppercase font-extrabold" href="/duvidas/">
//                 Consulte aqui
//               </a>{" "}
//               nossa seção de Perguntas Frequentes (FAQ) ou entre em contato com
//               nosso suporte para mais informações sobre a Promoção Marcas
//               Campeãs 2025.
//             </p>
//           </div>
//         </div>
//         <div className="col-span-2 md:col-span-3 flex flex-col gap-4 order-4">
//           <a
//             href="/arquivos/regulamento-sorteio-1.pdf"
//             className="duration-300 ease-in-out z-30 py-2 px-4 border-4 w-full border-footer-documentos rounded-lg text-footer-documentos font-bold cursor-pointer uppercase relative  flex items-center justify-center gap-3 shadow-medium-sm"
//              target="_blank"
//           >
//             Regulamento Sorteio{" "}
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 21 21"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M11.175 10.5L8.1 13.575L9.5 15L14 10.5L9.5 6L8.1 7.425L11.175 10.5ZM10.5 20.5C9.11667 20.5 7.81667 20.2375 6.6 19.7125C5.38333 19.1875 4.325 18.475 3.425 17.575C2.525 16.675 1.8125 15.6167 1.2875 14.4C0.7625 13.1833 0.5 11.8833 0.5 10.5C0.5 9.11667 0.7625 7.81667 1.2875 6.6C1.8125 5.38333 2.525 4.325 3.425 3.425C4.325 2.525 5.38333 1.8125 6.6 1.2875C7.81667 0.7625 9.11667 0.5 10.5 0.5C11.8833 0.5 13.1833 0.7625 14.4 1.2875C15.6167 1.8125 16.675 2.525 17.575 3.425C18.475 4.325 19.1875 5.38333 19.7125 6.6C20.2375 7.81667 20.5 9.11667 20.5 10.5C20.5 11.8833 20.2375 13.1833 19.7125 14.4C19.1875 15.6167 18.475 16.675 17.575 17.575C16.675 18.475 15.6167 19.1875 14.4 19.7125C13.1833 20.2375 11.8833 20.5 10.5 20.5ZM10.5 18.5C12.7333 18.5 14.625 17.725 16.175 16.175C17.725 14.625 18.5 12.7333 18.5 10.5C18.5 8.26667 17.725 6.375 16.175 4.825C14.625 3.275 12.7333 2.5 10.5 2.5C8.26667 2.5 6.375 3.275 4.825 4.825C3.275 6.375 2.5 8.26667 2.5 10.5C2.5 12.7333 3.275 14.625 4.825 16.175C6.375 17.725 8.26667 18.5 10.5 18.5Z"
//                 fill="#F5E082"
//               />
//             </svg>
//           </a>
//           <a
//             href="/arquivos/regulamento-vale-brinde.pdf"
//             className="duration-300 ease-in-out z-30 py-2 px-4 border-4 w-full border-footer-documentos rounded-lg text-footer-documentos font-bold cursor-pointer uppercase relative  flex items-center justify-center gap-3 shadow-medium-sm"
//              target="_blank"
//           >
//             Regulamento Vale-Brinde
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 21 21"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M11.175 10.5L8.1 13.575L9.5 15L14 10.5L9.5 6L8.1 7.425L11.175 10.5ZM10.5 20.5C9.11667 20.5 7.81667 20.2375 6.6 19.7125C5.38333 19.1875 4.325 18.475 3.425 17.575C2.525 16.675 1.8125 15.6167 1.2875 14.4C0.7625 13.1833 0.5 11.8833 0.5 10.5C0.5 9.11667 0.7625 7.81667 1.2875 6.6C1.8125 5.38333 2.525 4.325 3.425 3.425C4.325 2.525 5.38333 1.8125 6.6 1.2875C7.81667 0.7625 9.11667 0.5 10.5 0.5C11.8833 0.5 13.1833 0.7625 14.4 1.2875C15.6167 1.8125 16.675 2.525 17.575 3.425C18.475 4.325 19.1875 5.38333 19.7125 6.6C20.2375 7.81667 20.5 9.11667 20.5 10.5C20.5 11.8833 20.2375 13.1833 19.7125 14.4C19.1875 15.6167 18.475 16.675 17.575 17.575C16.675 18.475 15.6167 19.1875 14.4 19.7125C13.1833 20.2375 11.8833 20.5 10.5 20.5ZM10.5 18.5C12.7333 18.5 14.625 17.725 16.175 16.175C17.725 14.625 18.5 12.7333 18.5 10.5C18.5 8.26667 17.725 6.375 16.175 4.825C14.625 3.275 12.7333 2.5 10.5 2.5C8.26667 2.5 6.375 3.275 4.825 4.825C3.275 6.375 2.5 8.26667 2.5 10.5C2.5 12.7333 3.275 14.625 4.825 16.175C6.375 17.725 8.26667 18.5 10.5 18.5Z"
//                 fill="#F5E082"
//               />
//             </svg>
//           </a>
//           <a
//             href="/arquivos/politica-de-privacidade.pdf"
//             className="duration-300 ease-in-out z-30 py-2 px-4 border-4 w-full border-footer-documentos rounded-lg text-footer-documentos font-bold cursor-pointer uppercase relative  flex items-center justify-center gap-3 shadow-medium-sm"
//             target="_blank"
//           >
//             Política de Privacidade
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 21 21"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M11.175 10.5L8.1 13.575L9.5 15L14 10.5L9.5 6L8.1 7.425L11.175 10.5ZM10.5 20.5C9.11667 20.5 7.81667 20.2375 6.6 19.7125C5.38333 19.1875 4.325 18.475 3.425 17.575C2.525 16.675 1.8125 15.6167 1.2875 14.4C0.7625 13.1833 0.5 11.8833 0.5 10.5C0.5 9.11667 0.7625 7.81667 1.2875 6.6C1.8125 5.38333 2.525 4.325 3.425 3.425C4.325 2.525 5.38333 1.8125 6.6 1.2875C7.81667 0.7625 9.11667 0.5 10.5 0.5C11.8833 0.5 13.1833 0.7625 14.4 1.2875C15.6167 1.8125 16.675 2.525 17.575 3.425C18.475 4.325 19.1875 5.38333 19.7125 6.6C20.2375 7.81667 20.5 9.11667 20.5 10.5C20.5 11.8833 20.2375 13.1833 19.7125 14.4C19.1875 15.6167 18.475 16.675 17.575 17.575C16.675 18.475 15.6167 19.1875 14.4 19.7125C13.1833 20.2375 11.8833 20.5 10.5 20.5ZM10.5 18.5C12.7333 18.5 14.625 17.725 16.175 16.175C17.725 14.625 18.5 12.7333 18.5 10.5C18.5 8.26667 17.725 6.375 16.175 4.825C14.625 3.275 12.7333 2.5 10.5 2.5C8.26667 2.5 6.375 3.275 4.825 4.825C3.275 6.375 2.5 8.26667 2.5 10.5C2.5 12.7333 3.275 14.625 4.825 16.175C6.375 17.725 8.26667 18.5 10.5 18.5Z"
//                 fill="#F5E082"
//               />
//             </svg>
//           </a>
//         </div>
//         <div className="md:col-span-3 flex flex-col gap-4 items-center justify-center order-6 md:order-5">
//           <header className="text-center text-white">
//             Administração e <br /> Realização:
//           </header>
//           <img
//             className="w-32"
//             src="/images/footer/logo-apas.svg"
//             alt="Logo APAS"
//           />
//         </div>
//         <div className="md:col-span-3 flex flex-col gap-4 items-center justify-center order-7 md:order-6">
//           <header className="text-center text-white">
//             Reprodução e <br /> Realização:
//           </header>
//           <img
//             className="w-32"
//             src="/images/footer/logo-rc.webp"
//             alt="Logo RC"
//           />
//         </div>
//         <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center text-center text-white order-5 md:order-7">
//           <header className="uppercase">Horário de atendimento</header>
//           <p>
//             De Segunda a Sexta-feira <br />
//             das 08h30 às 17:30, exceto feriados.
//           </p>
//           <a
//             href="https://wa.me/551126263437?text=Ol%C3%A1%2C+gostaria+de+saber+sobre+a+Promo%C3%A7%C3%A3o+Marcas+Campeãs+2025"
//             className="bg-gradient-green-linear text-white text-center flex items-center justify-center rounded-xl gap-4 py-2 px-4 mt-2 w-full"
//           >
//             <FaWhatsapp className="text-2xl" />
//             <div className="text-center flex flex-col uppercase font-bold">
//               <span className="text-lg">(11) 2626-3437</span>
//               <span>Chame pelo Whatsapp</span>
