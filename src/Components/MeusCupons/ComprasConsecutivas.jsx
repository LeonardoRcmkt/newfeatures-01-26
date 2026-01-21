import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "../../CSS/meus-cupons.css";

export const ComprasConsecutivas = ({ redes }) => {

  const comprasConsecultivas = redes.filter(
    (rede) => rede.qtd_pedido === 1 || rede.qtd_pedido === 2
  );

  return (
    <div
      id="meus-cupons"
      className="bg-primary text-center text-sm text-saldo-text p-4 shadow-medium-md justify-center flex flex-col items-center text-white relative "
    >
      <h2 className="flex gap-2 font-black">Compras Consecutivas* </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={2.5}
        pagination={{
          clickable: true,
        }}
        direction={"vertical"}
        navigation={{
          prevEl: "#meus-cupons .swiper-button-prev .prev",
          nextEl: "#meus-cupons .swiper-button-next .next",
        }}
        breakpoints={{
          520: {
            slidesPerView: 1.8,
            slidesPerGroup: 1,
            direction: "horizontal",
          },
          768: {
            slidesPerView: 2.5,
            slidesPerGroup: 1,
            direction: "horizontal",
          },
          1400: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            direction: "horizontal",
          },
        }}
      >
        {comprasConsecultivas.map((loja, index) => (
          <SwiperSlide
            key={index}
            className="!flex items-center justify-center !h-fit"
          >
            {}
            <div className="bg-primary-gradient-linear rounded-sm shadow-medium-md w-full p-4 m-4 h-fit">
              <h3 className="font-black text-secondary-700 mb-3 line-clamp-2">
                {loja.nome_fantasia}
              </h3>
              <div className="flex gap-2 items-center justify-center">
                {loja.qtd_pedido === 1 ? (
                  <>
                    <span className="rounded-2xs h-3 w-8 bg-secondary-500"></span>
                    <span className="rounded-2xs h-3 w-8 border-secondary-700 border-2"></span>
                    <span className="rounded-2xs h-3 w-8 border-secondary-700 border-2"></span>
                  </>
                ) : (
                  <>
                    <span className="rounded-2xs h-3 w-8 bg-secondary-500"></span>
                    <span className="rounded-2xs h-3 w-8 bg-secondary-500"></span>
                    <span className="rounded-2xs h-3 w-8 border-secondary-700 border-2"></span>
                  </>
                )}
              </div>
              <p className="text-secondary-500 font-black">
                {loja.qtd_pedido}/3 compras
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="swiper-button-prev !hidden  prev !-rotate-180"
        aria-label="Previous slide"
      ></div>
      <div
        className="swiper-button-next !hidden  next"
        aria-label="Next slide"
      ></div>
      <p className="-mt-3">
        A cada <span className="font-black">3 compras</span> nas redes
        participantes você recebe{" "}
        <span className="font-black"> +10 chances e números da sorte</span>
      </p>
      <p className="text-2xs">
        *Válido apenas para compras aprovadas e em dias diferentes.
      </p>
    </div>
  );
};
