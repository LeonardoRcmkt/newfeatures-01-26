import { motion } from "motion/react";
import { HomeAnimation } from "./HomeAnimation";
export const Detalhe = ({ className, type }) => {
  let src,
    duration = "",
    delay = "";
  switch (type) {
    case "1-pri":
      src = "/images/home/detalhes/1-pri.webp";
      delay = "";
      break;
    case "2-pri":
      src = "/images/home/detalhes/2-pri.webp";
      delay = "1";
      break;
    case "3-pri":
      src = "/images/home/detalhes/3-pri.webp";
      delay = "2";
      break;
    case "4-pri":
      src = "/images/home/detalhes/4-pri.webp";
      delay = "3";
      break;
    case "1-sec":
      src = "/images/home/detalhes/1-sec.webp";
      delay = "";
      break;
    case "2-sec":
      src = "/images/home/detalhes/2-sec.webp";
      delay = "1";
      break;
    case "3-sec":
      src = "/images/home/detalhes/3-sec.webp";
      delay = "2";
      break;
    case "4-sec":
      src = "/images/home/detalhes/4-sec.webp";
      delay = "3";
      break;
  }
  return (
    <motion.div className={` detalhe   ${className}`} {...HomeAnimation()}>
      <img
        className={`animate-bounce floating animation-delay-${delay} drop-shadow-neon-sm`}
        alt="Balão"
        src={src}
      />
    </motion.div>
  );
};
