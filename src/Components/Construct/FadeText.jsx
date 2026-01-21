import React, { useState, useEffect } from "react";

export const FadeInOutText = ({ texts }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [texts]);

  return (
    <h1 className={`text-gray-50 text-center font-bold text-3xl max-w-[60%] animate-up ${texts[index] && "animate-fade-up"}`}>
      {texts[index]}
    </h1>
  );
};
