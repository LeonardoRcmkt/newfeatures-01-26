import { useState, useEffect, useMemo } from "react";
import api from "../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useLocation } from "react-router-dom";

export const BannerIndustria = () => {
  const [banners, setBanners] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const marcaFromUrl = queryParams.get("marca")?.toLowerCase() || "";
  const [marcaFilter, setMarcaFilter] = useState(marcaFromUrl);

  // Função para filtrar banners válidos
  const filterValidBanners = (banners) => {
    const todayDate = new Date();
    return banners.filter((banner) => {
      const startDate = new Date(
        banner.data_inicio_exibe_site.replaceAll("-", "/") + " 00:00:01"
      );
      const endDate = new Date(
        banner.data_fim_exibe_site.replaceAll("-", "/") + " 23:59:59"
      );
      return startDate <= todayDate && todayDate <= endDate;
    });
  };

  useEffect(() => {
    api
      .get("/industry-banners")
      .then((response) => {
        const validBanners = filterValidBanners(response);
        setBanners(validBanners);
      })
      .catch((err) => {
        console.error("Ocorreu um erro ao buscar os banners:", err);
      });
  }, []);

  const filteredData = useMemo(() => {
    return banners.filter((item) => {
      const matchesMarca =
        !marcaFilter ||
        marcaFilter?.toLowerCase() === item.marca;

      return matchesMarca;
    });
  }, [banners, marcaFilter]);



  const renderBanners = (filteredBanners, className) => {
    return (
      <div className={`${className} w-full! max-w-7xl`}>
        <Swiper
          id="banner"
          className={` w-full! my-3  `}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          centeredSlides={true}
          parallax={true}
          grabCursor={true}
          effect={"fade"}
          slidesPerView={1}
          navigation={{
            prevEl: "#banner .swiper-button-prev",
            nextEl: "#banner .swiper-button-next",
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
          }}
        >
          {filteredBanners.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex! justify-center items-center w-full!"
            >
              <img
                className={`w-full! mx-auto rounded-lg! overflow-hidden block h-auto`}
                src={item.caminho_arquivo}
                alt="Banner Industria"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  const bannersMobile = filteredData.filter((item) => item.layout === "M");
  const bannersDesktop = filteredData.filter((item) => item.layout === "D");

  return (
    <div>
      {bannersDesktop.length > 0 &&
        renderBanners(bannersDesktop, "hidden! md:flex!")}
      {bannersMobile.length > 0 &&
        renderBanners(bannersMobile, "flex! md:hidden!")}
    </div>
  );
};
