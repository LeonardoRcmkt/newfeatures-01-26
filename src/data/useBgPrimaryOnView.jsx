import { useInView } from "framer-motion";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";

export function useBgPrimaryOnView(options) {
  const { setBgPrimary } = useContext(AppContext);

  const { ref, inView } = useInView(
    options || {
      threshold: 0,
      rootMargin: "0% 0% -90% -90%",
    }
  );

  useEffect(() => {
    setBgPrimary(inView);
  }, [inView, setBgPrimary]);

  return { ref, inView };
}
