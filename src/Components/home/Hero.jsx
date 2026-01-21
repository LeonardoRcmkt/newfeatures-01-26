import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../data/AppContext";
import { useInView } from "react-intersection-observer";
import { Detalhe } from "./Detalhe";
import { motion } from "motion/react";
import { HomeAnimation } from "./HomeAnimation";
import { TrackSection } from "../../data/TrackSection";
export const Hero = () => {

  const { ref } = TrackSection("-10% 0% 0% 0%");


  const token = localStorage.getItem("token");

  return (
    <>
      <section
        ref={ref}
        id="index"
        className={` section-home section-home-primary section-hero overflow-hidden ${
          token && "md:pt-36"
        } `}
      >

        <Detalhe
          type="1-sec"
          className="left-[5%] md:left-[2%] top-[12%] md:top-[20%]"
        />
        <Detalhe
          type="3-sec"
          className="left-[77%] md:left-[30%] top-[95%] md:top-[78%]"
        />
        <Detalhe
          type="4-sec"
          className=" left-[78%] md:left-[60%] top-[12%] md:top-[50%]"
        />
        <Detalhe
          type="2-sec"
          className="right-[70%] md:right-[2%] top-[63%] md:top-[15%]"
        />

        <div className="w-full h-full flex py-4 md:py-2 ">
          {/* Mob */}
          <div className="div-hero">
            <div className="div-wrapper-hero">
              <motion.div {...HomeAnimation()}>
                <img
                  className="img-hero floating "
                  alt="Mais de 1 Milhão em Prêmios"
                  src="/images/home/hero/1-milhao-em-premios.webp"
                />
              </motion.div>
              <motion.div {...HomeAnimation()}>
                <img
                  {...HomeAnimation()}
                  className="img-hero floating animation-delay-1"
                  alt="Marcas Campeãs - Promoção Amor de Família, Prêmios Todo Dia! "
                  src="/images/home/hero/selo.webp"
                />
              </motion.div>
            </div>
            <motion.div {...HomeAnimation()}>
              <img
                {...HomeAnimation()}
                className="img-hero floating"
                alt="1 Casa e 1 Carrão!"
                src="/images/home/hero/casa-e-carro.webp"
              />
            </motion.div>
            <motion.div {...HomeAnimation()}>
              <img
                {...HomeAnimation()}
                className="img-hero floating animation-delay-2"
                alt="Prêmios Incríveis Toda Semana!"
                src="/images/home/hero/premios-semanais.webp"
              />
            </motion.div>
            <motion.div {...HomeAnimation()}>
              <img
                {...HomeAnimation()}
                className="img-hero w-2/3 mx-auto floating "
                alt="Raspou, achou, ganhou! + de 5 mil prêmios de até R$500 na hora!"
                src="/images/home/hero/raspou-achou-ganhou.webp"
              />
            </motion.div>
          </div>

          <div className=" hidden md:flex flex-row  justify-center mx-auto  ">
            {/* Desk */}
            <div className="div-hero-desk -space-y-[10%] ">
              <div className="floating img-wrapper-desk ">
                <motion.img
                  {...HomeAnimation()}
                  alt="Marcas Campeãs - Promoção Amor de Família, Prêmios Todo Dia!"
                  className="img-hero-desk "
                  src="/images/home/hero/desktop/selo.webp"
                />
              </div>
              <div className="floating img-wrapper-desk  animation-delay-2">
                <motion.img
                  {...HomeAnimation(0.1)}
                  className="img-hero-desk "
                  alt="1 Casa e 1 Carrão!"
                  src="/images/home/hero/desktop/casa-e-carro.webp"
                />
              </div>
            </div>
            {/* <div className="floating img-wrapper-desk  "> */}
            <motion.img
              {...HomeAnimation(0.2)}
              alt="Mais de 1 Milhão em Prêmios"
              className="img-hero-desk img-hero-desk-vic object-bottom"
              src="/images/home/hero/desktop/1-milhao-em-premios.webp"
            />
            {/* </div> */}

            <div className="div-hero-desk -space-y-[10%] animation-delay-3">
              <div className="floating img-wrapper-desk  ">
                <motion.img
                  {...HomeAnimation(0.3)}
                  alt="Raspou, achou, ganhou! + de 5 mil prêmios de até R$500 na hora!"
                  className="img-hero-desk"
                  src="/images/home/hero/desktop/raspou-achou-ganhou.webp"
                />
              </div>
              <div className="floating img-wrapper-desk  animation-delay-4">
                <motion.img
                  {...HomeAnimation(0.4)}
                  className="img-hero-desk"
                  alt="Prêmios Incríveis Toda Semana!"
                  src="/images/home/hero/desktop/premios-semanais.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
