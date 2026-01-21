// Duvidas.js
import { useEffect, useState } from "react";
import { form } from "../../../src/config/forms/formSac";
import api from "../../../src/services/api";
import { triggerSwal } from "../../functions/swal";
import { Form } from "../Form/Form";
import { Title } from "../Title";
import {FaWhatsapp} from "react-icons/fa";

export const Contato = () => {
  const [formData, setFormData] = useState({});
  const button = [{ title: "Enviar", primary:true, className:"w-full"}];

  useEffect(() => { setFormData(form);}, []);

  async function handleSubmit(formData) {
    formData.telefone = formData.telefone.replace(/[^\d]/g, "");

    await api
      .post("/sac", formData)
      .then(() => {
        triggerSwal(
          "Mensagem enviada!",
          "Aguarde que em breve iremos retornar sua mensagem!"
        ).then(() => window.location.reload());
      })
      .catch((error) => console.error("Erro:", error));
  }

  return (
    <section
      id="duvidas"
      className={'w-full flex gap-9 h-auto w-full flex-col justify-center items-center relative bg-cover bg-no-repeat bg-center '}
    >
      <Title text="Entre em Contato" />
      <div className="w-full md:w-[70%] flex flex-col gap-0 items-center">    
        <ContactSection
          formData={formData}
          handleSubmit={handleSubmit}
          button={button}
        />
        {/* <div className="w-full md:w-[70%] flex flex-col gap-0 items-center"> 
          <p className="text-white leading-none uppercase font-title font-extrabold tracking-normal drop-shadow-light-sm pb-2 text-lg w-full md:text-xl text-center text-title bg-clip-text>">Ou nos chame pelo Whatsapp:</p>
            <a
            href="https://wa.me/551126263437?text=Ol%C3%A1%2C+gostaria+de+saber+sobre+a+Promo%C3%A7%C3%A3o+Marcas+Campeãs+2025"
            className="bg-gradient-green-linear text-white text-center flex items-center justify-center rounded-xl gap-4 py-2 px-4 mt-2 w-full md:w-fit"
          >
            <FaWhatsapp className="text-xl " />
            <div className="text-center mb-1 flex flex-col uppercase font-bold">
              <span className="text-lg">(11) 2626-3437</span>
            </div>
          </a>
        </div> */}
      </div>  
    </section>
  );
};


const ContactSection = ({ formData, handleSubmit, button }) => (
  <div className="text-center flex flex-col items-center gap-8 text-duvidas-details w-full relative">
    
    <section className=" w-full md:w-[70%] pb-8">
      {Object.keys(formData).length > 0 && (
        <Form data={formData} handleSubmit={handleSubmit} button={button} />
      )}
    </section>
  </div>
);
