import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button } from "../Button";
import "../../CSS/roleta.css"; // arquivo css que ajusta o tamanho da roleta
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../../services/api";

// Configuração das fatias
const options = [
  {
    value: 1,
    option: "0",
    image: {
      uri: "/gameficacao/molde_semborda_ganhou.png",
      sizeMultiplier: 2.2,
    },
  },
  {
    value: 2,
    option: "1",
    image: {
      uri: "/gameficacao/molde_semborda_naoganhou.png",
      sizeMultiplier: 2.2,
    },
  },
  {
    value: 1,
    option: "2",
    image: {
      uri: "/gameficacao/molde_semborda_ganhou.png",
      sizeMultiplier: 2.2,
    },
  },
  {
    value: 2,
    option: "3",
    image: {
      uri: "/gameficacao/molde_semborda_naoganhou.png",
      sizeMultiplier: 2.2,
    },
  },
  {
    value: 1,
    option: "4",
    image: {
      uri: "/gameficacao/molde_semborda_ganhou.png",
      sizeMultiplier: 2.2,
    },
  },
  {
    value: 2,
    option: "5",
    image: {
      uri: "/gameficacao/molde_semborda_naoganhou.png",
      sizeMultiplier: 2.2,
    },
  },
];

// Layout do ponteiro
const pointer = {
  src: "/gameficacao/pointer.png",
  style: {
    width: "44px",
    top: "-25px",
    left: "50%",
    transform: "translateX(-50%)",
  },
};

export const Roleta = ({ chances = 0, setChances }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState([]);
  const elementRoullet = document.querySelector(".sc-eCssSg");

  // Mudança na rotação da roleta para a fatia escolhida ficar no meio conforme ponteiro
  useEffect(() => {
    if (elementRoullet) {
      const style = elementRoullet.style;
      style.transform = "rotate(-45deg)";
    }
  }, [elementRoullet]);

  //Função para quando desabilitar o botão quando o usuário não tiver chances
  const disabledButton = () => {
    return chances <= 0 ? true : false;
  };

  let newPrizeNumber;

  // Função para quando girar a roleta
  const handleSpinClick = () => {
    setChances(chances - 1);
    api.post("/game").then((data) => {
      setData(data);
      let optionsWithValue;

      if (data.premio) {
        // Se a hora informada for posterior à hora atual, use as opções de ganhou com value igual a 1
        optionsWithValue = options.filter((option) => option.value === 1);
      } else {
        // Caso contrário, use as opções não ganhou com value igual a 2
        optionsWithValue = options.filter((option) => option.value === 2);
      }

      // Selecionar aleatoriamente um índice dentro das opções filtradas
      const randomIndex = Math.floor(Math.random() * optionsWithValue.length);

      // Obter o novo número do prêmio
      newPrizeNumber = options.findIndex(
        (option) => option === optionsWithValue[randomIndex]
      );

      setMustSpin(true);
      setPrizeNumber(newPrizeNumber);
    });
  };

  const openModal = () => {
    setMustSpin(false);

    withReactContent(Swal)
      .fire({
        showConfirmButton: false,
        background: "transparent",

        html: `<img onclick='window.location.reload()' src="${data.modal}"/> `,
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <section className="flex flex-col items-center parent-container  w-[60%] h-fit">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={options}
        onStopSpinning={openModal}
        spinDuration={0.5}
        pointerProps={pointer}
        innerBorderWidth={false}
        backgroundColors={["white"]}
        outerBorderColor={["#f2f2f2"]}
        outerBorderWidth={[25]}
        innerBorderColor={["#f2f2f2"]}
        radiusLineColor={["#dedede"]}
        radiusLineWidth={[0]}
        textColors={["#2a2a2a"]}
      />
      <Button
        disabled={disabledButton()}
        onClick={handleSpinClick}
        title="GIRAR ROLETA"
      />
    </section>
  );
};
