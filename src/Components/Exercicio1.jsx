import { useEffect, useState } from "react";
import { Button } from "./Button";

export const Exercicio1 = () => {
  // Versão só com useState

  // const [count, setCount] = useState(0);
  //   const titleCount = count;
  // document.title = titleCount;

  // Versão com useEffect

  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((prev) => prev + 1);
  };

  const decrease = () => {
    if (count === 0) {
      alert("Você não pode diminuir mais!");
      return;
    }
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  useEffect(() => {
    document.title = count;
      console.log(count);
  }, [count]);


  return (
      <section className="section-home section-home-primary md:pt-56">
        <Button color="secondary" onClick={() => increase()}>
          Aumentar
        </Button>
        <Button color="secondary" onClick={() => decrease()}>
          Diminuir
        </Button>
        <Button color="secondary" onClick={() => reset()}>
          Reset
        </Button>
      </section>
  );
};
