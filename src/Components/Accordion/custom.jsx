import { LazyMotion, domAnimation, m } from "framer-motion";
import { Search } from "../Search";
import { BiSolidDownArrow } from "react-icons/bi";

// Subcomponente: Botão do Accordion
const AccordionButton = ({
  titleButton,
  open,
  onClick,
  backgroundColor,
  textColor,
}) => {
  return (
    <button
      className={`${backgroundColor} hover:cursor-pointer w-full ${textColor} pl-4 flex justify-between items-center font-bold text-lg  hover:brightness-120 transition-all  ${
        open ? "rounded-t-lg border-b-0" : "rounded-lg"
      }`}
      type="button"
      onClick={onClick}
    >
      <p className={` text-lg  text-left font-title font-extrabold text-primary-500 w-full`}>{titleButton}</p>

      <BiSolidDownArrow className={`duvidas-question-arrow transition-all ${open && "rotate-180"}`} />
    </button>
  );
};

// Subcomponente: Conteúdo do Accordion
const AccordionContent = ({
  open,
  children,
  info,
  isVisible,
  onChange,
  word,
}) => {
  const animate = {
    transition: { type: "tween", duration: 0.3 },
    height: open ? "auto" : 0,
    opacity: open ? 1 : 0,
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div>
        <m.div
          style={{ overflow: "hidden" }}
          initial={{ height: 0, opacity: 0 }}
          animate={animate}
          exit={{ height: 0, opacity: 0 }}
        >
          {info.length > 0 && (
            <Search isVisible={isVisible} onChange={onChange} word={word} />
          )}
          {open && (
            <div className="p-4 bg-white rounded-b-lg text-secondary-500 text-center ">
              {children}
            </div>
          )}
        </m.div>
      </div>
    </LazyMotion>
  );
};

// Componente Principal: Accordion
export const AccordionCustom = ({
  titleButton = "",
  open = false,
  children,
  onClick,
  info = [],
  isVisible,
  onChange,
  word,
  backgroundColor = "bg-white",
  textColor = "text-white",
  className = "",
}) => {
  return (
    <section className={`rounded-lg shadow-lg ${className}`}>
      <AccordionButton
        titleButton={titleButton}
        open={open}
        onClick={onClick}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
      <AccordionContent
        open={open}
        children={children}
        info={info}
        isVisible={isVisible}
        onChange={onChange}
        word={word}
      />
    </section>
  );
};
