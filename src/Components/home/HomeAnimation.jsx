export const HomeAnimation = (delay = 0) => ({
  initial: {
    filter: "blur(50px) ",
    opacity: 0,
    transform: "scale(0)",
  },
  whileInView: {
    filter: "blur(0px) ",
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 1.2,
      ease: [0.83, 0, 0.17, 1],
      delay,
    },
  },
  viewport: { once: true },
});


export const MarcasAnimation = ({ delay = 0, index, isActiveAnimation }) => ({
  initial: {
    filter: "blur(50px)",
    opacity: 0,
    scale: 0,
  },

  whileInView: isActiveAnimation
    ? {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: [0.83, 0, 0.17, 1],
          delay,
        },
      }
    : {},
  viewport: { once: true },
});

