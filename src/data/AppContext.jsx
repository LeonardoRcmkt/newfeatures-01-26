import { createContext, useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [bgPrimary, setBgPrimary] = useState(false);
  const location = useLocation();

//   const activeLinks = [
//   "/cadastrar-cupons/",
//   "/meus-dados/",
//   "/alterar-senha/",
// ]

  // Definir bg por Página
  const activeLinks = useMemo(
    () => [
  "/game/",
  "/minhas-metas/",
  "/meus-cupons/",
  "/meus-premios/",],
    []
  );
  
  useEffect(() => {
    const isActive = activeLinks.includes(location.pathname);
    setBgPrimary(isActive);
  }, [location.pathname, activeLinks]);



  return (
    <AppContext.Provider value={{ bgPrimary, setBgPrimary }}>
      {children}
    </AppContext.Provider>
  );
}
