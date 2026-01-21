import { useEffect, useState } from "react";
import api from "../../../src/services/api";
import { AccordionCustom } from "../Accordion/custom";
import { SelectCategoriaFaq } from "../Duvidas/SelectCategoriaFaq";


export const Faq = () => {
  const [selectValue, setSelectValue] = useState(""); // Inicializa como null
  const [openAccordion, setOpenAccordion] = useState(null);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    api
      .get("/faq")
      .then((data) => {
        setFaqData(data);
        // Define o selectValue para a primeira categoria se houver dados
        if (data.length > 0) {
          const firstCategory = data[0].ds_nome_categoria;
          setSelectValue(firstCategory);
        }
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const handleAccordionClick = (index) => {
    setOpenAccordion((prevOpenAccordion) =>
      prevOpenAccordion === index ? null : index
    );
  };

  const filteredFaq = faqData.filter(
    (question) => question.ds_nome_categoria === selectValue
  );

  const categoryFaq = Array.from(
    new Set(faqData.map((faq) => faq.ds_nome_categoria))
  );

  return (
    <>
        <SelectCategoriaFaq
          value={selectValue}
          onChange={(e) => {
            setSelectValue(e.target.value);
            setOpenAccordion(null); // Reset open accordion when selecting a new category
          }}
          name="faq"
          options={categoryFaq}
          optionDefault={"Selecione um assunto"}
        />

      {filteredFaq.map((question, index) => {
        const isOtherQuestions = question.ds_pergunta.toLowerCase() === "o que eu faço no caso de outras dúvidas?";
        return (
          <AccordionCustom
            key={index}
            titleButton={`${question.ds_pergunta}`}
            onClick={() => handleAccordionClick(index)}
            open={index === openAccordion}
            backgroundColor={"!bg-none"}
            textColor="text-primary-700"
            className="duvidas-question w-full "
          >
            {isOtherQuestions ? (
              <p className="duvidas-question-answer">                
                Em caso de outras dúvida e controvérsias, <a className=" transition-all text-secondary-500 font-extrabold hover:text-secondary-700"   href="./#contato"  rel="noopener noreferrer">clique aqui</a> para entrar em contato com nossa equipe.
              </p>
            ) : (
              <p className="duvidas-question-answer">
               {question.ds_resposta}
              </p>
            )}
          </AccordionCustom>
        );
      })} 
    </>
  );
};