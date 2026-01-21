import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 1100) {
  const [isMobile, setIsMobile] = useState(false);
  const [mainHeight, setMainHeight] = useState(null);

  const updateMainHeight = () => {
    if (window.innerWidth >= breakpoint) {
      const main = document.querySelector("main");
      if (main) {
        setMainHeight(main.clientHeight);
      }
    } else {
      setMainHeight(null);
    }
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
      updateMainHeight();
    };

    checkIsMobile(); // checa logo no início
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return { isMobile, mainHeight };
}
