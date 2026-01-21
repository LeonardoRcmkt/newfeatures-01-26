import { useInView } from "react-intersection-observer";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";

export const TrackSection = (rootMargin = "-10% 0% -100% 0%") => {
  const { setBgPrimary } = useContext(AppContext);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: rootMargin
  });

  useEffect(() => {
    setBgPrimary(inView);
  }, [inView, setBgPrimary]);

  return { ref, inView };
};
