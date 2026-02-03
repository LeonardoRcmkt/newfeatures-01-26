import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../CSS/como-participar.css";
import { Button } from "../Button";
import { Title } from "../Title";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { HomeAnimation } from "./HomeAnimation";
import { Detalhe } from "./Detalhe";

export const ComoParticipar = () => {
  const token = localStorage.getItem("token");
  const cards = [
    {
      img: "/images/home/como-participar/1.webp",
      link: "/redes-participantes/",
    },
    {
      img: "/images/home/como-participar/2.webp",
      link: "/produtos-participantes/",
    },
    {
      img: "/images/home/como-participar/3.webp",
      link: "/login/",
      linkToken: "/cadastrar-cupons/",
    },
    {
      img: "/images/home/como-participar/4.webp",
      link: "/login/",
      linkToken: "/game/",
    },
    {
      img: "/images/home/como-participar/5.webp",
      link: "https://card.linkpremiocard.com/login",
    },
  ];
  return (
    <section
      id="como-participar"
      className={`section-home section-home-secondary`}
    >
      <Detalhe
        type="1-pri"
        className="left-[5%] md:left-[2%] top-[15%] md:top-[15%]"
      />
      <Detalhe
        type="2-pri"
        className=" left-[77%] md:left-[90%] top-[15%] md:top-[80%]"
      />

      <Title
        alt="Como Participar"
        titleImg="images/titles/como-participar.webp"
      />

      {/* Desktop exclusive swiper */}
      <motion.div className="slider-wrapper " {...HomeAnimation()}>
        <button className="arrow-swiper custom-prev rotate-y-180  " />
        <Swiper
          className="como-participar-swiper"
          modules={[Navigation, Autoplay]}
          spaceBetween={-1}
          slidesPerView={1}
          rewind={true}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet bg-como-participar-details",
          }}
        >
          {cards.map((item, index) => (
            <SwiperSlide
              key={item.img}
              className={`como-participar-swiper-slide`}
            >
              {({ isActive }) => (
                <Link
                  to={
                    item.linkToken
                      ? token
                        ? item.linkToken
                        : item.link
                      : item.link
                  }
                  target="_blank"
                >
                  <motion.div {...HomeAnimation()}>
                    <img
                      className={` swiper-img floating animation-delay-${index} ${
                        !isActive && "opacity-50 pointer-events-none! "
                      }`}
                      src={item.img}
                      alt="Como Participar"
                    />
                  </motion.div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="arrow-swiper custom-next  " />
      </motion.div>
    </section>
  );
};
