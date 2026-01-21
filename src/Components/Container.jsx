import { motion } from "motion/react";
import { HomeAnimation } from "./home/HomeAnimation";

const Container = ({
  children,
  className = "",
  delay = 0,
  animate = true,
  secondary = false,
}) => {
  return (
    <motion.div
      {...(animate && {
        initial: {
          filter: "blur(100px)",
          backdropFilter: "blur(15px)",
          transform: "scaleX(0)",
          opacity: 0,
        },
        whileInView: {
          opacity: 1,
          filter: "blur(0px)",
          transform: "scaleX(1)",
          backdropFilter: "blur(12px)",
          transition: {
            duration: 1.2,
            ease: [0.83, 0, 0.17, 1],
            delay,
          },
        },
        viewport: { once: true },
      })}
      className={`${
        !secondary ? " container-primary" : "container-secondary"
      }      ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Container;
