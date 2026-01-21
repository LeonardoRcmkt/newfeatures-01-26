import { Button } from "../Button";
import { Title } from "../Title";
import { useContext, useState, useMemo, useEffect } from "react";
import { TrackSection } from "../../data/TrackSection";
import api from "../../services/api";
import { motion } from "motion/react";
import { HomeAnimation } from "./HomeAnimation";
import { useIsMobile } from "../../data/useIsMobile";
import { Link } from "react-router-dom";
import { Detalhe } from "./Detalhe";

export const MarcasImpulsionadoras = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Carrega os dados apenas uma vez
    const fetchData = async () => {
      try {
        const response = await api.get("/marcas", {
          params: { impulsionador: true },
        });
        setData(response || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

     const { ref } = TrackSection();

  return (
    <section
      ref={ref}
      id="marcas-impulsionadoras"
      className="section-home section-home-primary"
    >
      
      <Detalhe
        type="3-sec"
        className="left-[5%] md:left-[2%] top-[7%] md:top-[10%]"
      />
      <Detalhe
        type="4-sec"
        className=" left-[77%] md:left-[90%] top-[7%] md:top-[80%]"
      />

      <div className="wrapper-home">
        <Title
          alt="Marcas Impulsionadoras"
          titleImg="images/titles/marcas-impulsionadoras.webp"
          className="imp-title"
        />

        <h3 className="text-imp ">
          A cada{" "}
          <span className="text-highlight-imp">produto impulsionador</span>{" "}
          comprado, você ganha{" "}
          <span className="text-highlight-imp">+8 números da sorte</span> e{" "}
          <span className="text-highlight-imp">+ 8 chances</span>*
        </h3>

        <div className="swiper-slider-wrapper-marcas">
          {data.map((marca, index) => {
            const animIndex = index % 4;

            return (
              <motion.div {...HomeAnimation(index / 10)}>
                <Link to={`/produtos-participantes/?marca=${marca.marca.toLowerCase()}`}>
                  <img
                    key={index}
                    src={`/images/marcas-participantes/${marca.marca}.jpg`}
                    alt={marca.marca}
                    className={` img-imp floating animation-delay-${animIndex}"
                  }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-wrapper-imp-button">
          <p className=" text-imp-wrapper-button">
            Não são todos os produtos das marcas impulsionadoras que geram números
            da sorte e chances no balão.{" "}
            <span className="text-highlight-imp-wrapper-button">
              {" "}
              Confira os produtos impulsionadores.{" "}
            </span>
          </p>
          <Button link="/produtos-participantes/?impulsionadores=true" color="secondary" fill="outline">
            Lista de produtos impulsionadores
          </Button>
        </div>
      </div>
    </section>
  );
};