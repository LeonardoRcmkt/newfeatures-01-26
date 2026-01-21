import { motion } from "motion/react";
import { HomeAnimation } from "./home/HomeAnimation";

export const Title = ({ className, alt, titleImg }) => {
  return (
    <motion.div
      {...HomeAnimation()}

    >
      <img className={` title ${className}`} src={titleImg} alt={alt} />
    </motion.div>
  );
};
