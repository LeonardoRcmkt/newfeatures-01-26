import { Button } from "../Button";
import { Navigation } from "./Navigation";
import { Burger } from "./Burger";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useContext } from "react";
import { AppContext } from "../../data/AppContext";

export const HeaderTop = ({
  isMobile,
  isOpen,
  toggleMenu,
  onParticipar,
  token,
}) => {
  const { bgPrimary, setBgPrimary } = useContext(AppContext);

  return (
    <div className="header-wrapper">
      <HashLink to="/#index">
        <img
          className="header-top-logo"
          src="/images/base/logo.webp"
          alt="Marcas Campeãs 2026"
        />
      </HashLink>

      <div className="header-top-button">
        <Button onClick={onParticipar} color={bgPrimary ? "secondary" : "primary"}>
          {token ? "Raspadinha" : "Participar"}
        </Button>

        {!isMobile ? (
          <Navigation />
        ) : (
          <Burger isOpen={isOpen} onClick={toggleMenu} />
        )}
      </div>
    </div>
  );
};
