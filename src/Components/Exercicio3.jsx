import { useEffect, useState } from "react";
import { Button } from "./Button";

export const Exercicio3 = () => {
  const [indexesShown, setIndexesShown] = useState(0);
  const [arrayVis, setArrayVis] = useState([]);
  const [count, setCount] = useState(0);
  const increaseAmount = 5;
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  const increase = () => {
    if (arrayVis.length >= array.length) {
      return;
    }
    setIndexesShown((prev) => prev + increaseAmount);
    const indexesShownIncrease = indexesShown + increaseAmount;
    const arraySliced = array.slice(indexesShown, indexesShownIncrease);
    // arrayVis.push(...arraySliced);
    setArrayVis((prev) => [...prev, ...arraySliced]);

    console.log(
      "increaseAmount:" +
        increaseAmount +
        "\n indexesShownIncrease: " +
        indexesShownIncrease +
        "\n arraySliced: " +
        arraySliced +
        "\n arrayVis: " +
        arrayVis,
    );
    console.log(arrayVis.length);
    console.log(array.length);
    return;
  };

  return (
    <section className="section-home">
      <Button onClick={() => increase()}>oi</Button>

      {arrayVis.map(
        (item, index) => item + (index === item.length - 1 && ", "),
        // ADICIONAR lógica de não colocar vírgula no último item - ainda está errada
      )}
    </section>
  );
};
