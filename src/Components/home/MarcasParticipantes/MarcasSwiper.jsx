// import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Grid, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../../../services/api";
import { motion } from "motion/react";
import { HomeAnimation, MarcasAnimation } from "../HomeAnimation";
import { chunkArray } from "../../../data/chunkArray";
import { useIsMobile } from "../../../data/useIsMobile";
import { Link } from "react-router-dom";

export const MarcasSwiper = () => {
  const { isMobile } = useIsMobile(768);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega os dados apenas uma vez
    const fetchData = async () => {
      try {
        const response = await api.get("/marcas");
        const filteredResponse = response.filter(marca => marca.img); 
        setData(filteredResponse || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  const marcasPorSlide = isMobile ? 16 : 27;
  const grupos = chunkArray(data, marcasPorSlide);

  return (
    <>
      {loading ? (
        <p className=" font-xl font-bold mx-auto">
          <div class="w-8 h-8 border-4 mx-auto text-primary-700 border-t-transparent rounded-full animate-spin"></div>

        </p>
        
      ) : (
        <motion.div className="slider-wrapper " {...HomeAnimation()}>
          <button className="arrow-swiper custom-prev rotate-y-180  " />
          <Swiper
            className="swiper-marcas "
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            rewind={true}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
          >
            {grupos.map((grupo, slideIndex) => (
              <SwiperSlide key={slideIndex} className="swiper-slider-marcas">
                {({ isActive }) => (
                  <div className="swiper-slider-wrapper-marcas">
                    {grupo.map((marca, index) => {
                      const animIndex = index % 4;
                      // isActive && console.log(marca.marca + isActive)
                      if (!marca.img) return null;
                      return (
                        // marca.img && (
                        <motion.div
                          {...MarcasAnimation({
                            delay: index / 10,
                            index,
                            isActiveAnimation: isActive,
                          })}
                        >
                          <Link
                            to={`/produtos-participantes/?marca=${marca.marca.toLowerCase()}`}
                          >
                            <img
                              key={index}
                              // src={`/images/marcas-participantes/${marca.marca}.jpg`}
                              src={
                                marca.img
                                  ? marca.img
                                  : `/images/indisponivel.jpg`
                              }
                              alt={marca.marca}
                              className={` swiper-img-marcas floating animation-delay-${animIndex} ${
                                !isActive && "opacity-25"
                              }`}
                            />
                          </Link>
                        </motion.div>
                        // )
                      );
                    })}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="arrow-swiper custom-next " />
        </motion.div>
      )}
    </>
  );
};
