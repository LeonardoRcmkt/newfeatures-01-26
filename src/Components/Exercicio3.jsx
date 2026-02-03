import { useEffect, useState } from "react";
import { Button } from "./Button";

export const Exercicio3 = () => {
  const increaseAmount = 5;

  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  const [arrayVis, setArrayVis] = useState([]);

  const reset = () => setArrayVis([]);

  const increase = () => {
    if (arrayVis.length >= array.length) return;
    setArrayVis((prev) => [
      ...prev,
      ...array.slice(prev.length, prev.length + increaseAmount),
    ]);
  };

  return (
    <section className="section-home">
      <Button onClick={increase}>Show more</Button>
      <Button onClick={reset}>Reset</Button>

      {arrayVis.map(
        (item, index) => item + (index < arrayVis.length - 1 && ", "),
      )}
    </section>
  );
};
