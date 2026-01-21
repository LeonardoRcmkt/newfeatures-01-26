import { Title } from "../Title";
import "../../CSS/premios.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "motion/react";
import { HomeAnimation } from "./HomeAnimation";
import { TrackSection } from "../../data/TrackSection";
import { Detalhe } from "./Detalhe";

export const Premios = () => {

     const { ref } = TrackSection();

  return (
    <section
      ref={ref}
      id="premios"
      className={`section-home section-home-primary`}
    >
              <Detalhe
                type="3-sec"
                className="left-[5%] md:left-[2%] top-[5%] md:top-[10%]"
              />
              <Detalhe
                type="4-sec"
                className=" left-[77%] md:left-[90%] top-[5%] md:top-[80%]"
              />

      <div className="wrapper-home">
        <Title alt="Prêmios" titleImg="images/titles/premios.webp" />
        <div className="premios-wrapper ">
                <p className="text-sm text-secondary-100">
        Imagens meramente ilustrativas.
      </p>
          <motion.div {...HomeAnimation()}>
            <img
              src="/images/home/premios/casa-e-carro.webp"
              alt=""
              className="premios-img floating"
            />
          </motion.div>
          <motion.div {...HomeAnimation()}>
            <img
              src="/images/home/premios/premios-semanais.webp"
              alt=""
              className="premios-img floating animation-delay-1"
            />
          </motion.div>
          <motion.div {...HomeAnimation()} className="  ml-auto w-2/3">
            <img
              src="/images/home/premios/raspou-achou-ganhou.webp"
              alt=""
              className="premios-img floating animation-delay-2"
            />
          </motion.div>
                    {/* <motion.div {...HomeAnimation()}> */}
            <img
              src="/images/home/premios/vic.webp"
              alt=""
              className="premios-img floating premios-vic"
            />
          {/* </motion.div> */}
        </div>

        {/* Desktop */}
        <div className=" premios-desktop-wrapper">
          <motion.div {...HomeAnimation()}>
            <img
              src="/images/home/premios/desktop/premios.webp"
              alt=""
              className="premios-img floating"
            />
          </motion.div>

          {/* <motion.div {...HomeAnimation()}> */}
            <img
              src="/images/home/premios/vic.webp"
              alt=""
              className="premios-img floating premios-vic"
            />
          {/* </motion.div> */}
        </div>
      </div>


    </section>
  );
};
