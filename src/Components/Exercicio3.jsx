import { Button } from "./Button";
import { useState } from "react";
export const Exercicio3 = () => {
  const increment = 5;
  const [inc, setInc] = useState([]);
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  const handleCount = () => {
    if (inc.length > array.length) return;
    setInc((prev) => [
      ...prev,
      ...array.slice(prev.length, prev.length + increment),
    ]);
  };

  const handleReset = () => setInc([]);

  // console.log(inc);

  return (
    <div className="section-home">
      <Button onClick={handleCount}>Increase</Button>
      <Button onClick={handleReset}>Reset</Button>
      {inc.map((item, index) => item + (index < inc.length - 1 && ", "))}
    </div>
  );
};
