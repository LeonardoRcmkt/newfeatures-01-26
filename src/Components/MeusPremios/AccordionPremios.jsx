import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "motion/react";
import { HomeAnimation, MarcasAnimation } from "../home/HomeAnimation";
import { Accordion } from "../Accordion";
import { Button } from "../Button";
import "../../CSS/meus-premios.css"

export const AccordionPremios = ({ open, onClick }) => {
  const premios = [
    {
      title: 'prêmio instantâneo',
      img: '/images/telas-internas/meus-premios/premio-100.webp'
    },
    {
      title: 'prêmio instantâneo',
      img: '/images/telas-internas/meus-premios/premio-300.webp'
    },
    {
      title: 'prêmio instantâneo',
      img: '/images/telas-internas/meus-premios/premio-500.webp'
    },
    {
      title: 'prêmio instantâneo',
      img: '/images/telas-internas/meus-premios/premio-400.webp'
    },
    {
      title: 'videogame',
      img: '/images/telas-internas/meus-premios/premio-videogame.webp'
    },
    {
      title: 'smartphone',
      img: '/images/telas-internas/meus-premios/premio-smartphone.webp'
    },
    {
      title: 'carro',
      img: '/images/telas-internas/meus-premios/premio-carro.webp'
    },
    {
      title: 'tv',
      img: '/images/telas-internas/meus-premios/premio-tv.webp'
    },
    {
      title: 'casa',
      img: '/images/telas-internas/meus-premios/premio-casa.webp'
    },
  ];

  return (
    <div>
      <Accordion titleButton='Você ainda pode ganhar' open={open} onClick={onClick} headerClass="meus-premios-header"
        className="meus-premios-accordion"  >
        <section
          id="meus-premios"
          className={`h-auto flex flex-col mt-6`}
        >
          <motion.div className="slider-wrapper  " {...HomeAnimation()}>
            <button className="arrow-swiper premios-prev  rotate-y-180  " />
            <Swiper
              className="swiper-meus-premios "
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={2}

              rewind={true}
              navigation={{
                prevEl: " .premios-prev",
                nextEl: " .premios-next",
              }}
              breakpoints={{
                520: {
                  slidesPerView: 3,


                },
                768: {
                  slidesPerView: 4,

                },
                1400: {
                  slidesPerView: 5,

                },
              }}
            >
              {premios.map((card, index) => (
                <SwiperSlide key={index} className="flex! items-center">
                  {/* Ajustar classes */}

                  <img
                    className="w-[95%] h-auto   "
                    src={card.img}
                    alt={card.title}
                  />

                </SwiperSlide>
              ))}
            </Swiper>
            <button className="arrow-swiper premios-next " />
          </motion.div>

        </section>
      </Accordion>
      <div className="flex flex-col items-center justify-center w-full mt-6 gap-4 text-xl">
        <p className="font-extrabold text-accent-500"> Jogue na raspadinha para concorrer a diversos prêmios <span className="font-normal text-white">ou</span>  cadastre cupons e aumente suas chances!. </p>
        <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center">
          <Button
            title='Cadastrar'

            link='/cadastrar-cupons/'> Cadastrar cupom</Button>
          <Button
            title='Cadastrar'
            color="secondary"

            link='/game/'> jogar raspadinha</Button>
        </div>
      </div>
    </div>
  );
};
