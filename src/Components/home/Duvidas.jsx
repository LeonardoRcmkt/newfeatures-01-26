// Duvidas.js
import { useEffect, useState } from "react";
import { form } from "../../../src/config/forms/formSac";
import api from "../../../src/services/api";
import { triggerSwal } from "../../functions/swal";
import { Faq } from "../Duvidas/Faq";
import { Form } from "../Form/Form";
import { Title } from "../Title";
import { motion } from "motion/react";
import { HomeAnimation } from "./HomeAnimation";

export const Duvidas = () => {
  const [formData, setFormData] = useState({});
  const button = [
    {
      title: "Enviar",
      primary: true,
    },
  ];

  useEffect(() => {
    setFormData(form);
  }, []);

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
    <section id="duvidas" className={`main-internas`}>
      <Title alt="Dúvidas" titleImg="/images/titles/duvidas-frequentes.webp" />
      <div className="wrapper-home w-full max-w-4xl ">
        <motion.div {...HomeAnimation()} className="w-full flex flex-col items-center justify-center gap-4">
          <Faq />
        </motion.div>

        <motion.div {...HomeAnimation} className="text-center flex flex-col items-center gap-8 text-duvidas-details w-full relative">
          <div
            id="contato"
            className=" w-full justify-center items-center max-w-6xl flex gap-8 md:gap-12 flex-col"
          >
            <h2 className="text-secondary-700 text-2xl md:text-3xl font-title font-extrabold uppercase">
              Entre em contato
            </h2>
            {Object.keys(formData).length > 0 && (
              <Form
                data={formData}
                handleSubmit={handleSubmit}
                button={button}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
