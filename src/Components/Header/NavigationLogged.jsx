import { Button } from "../Button";
import { linksInterno } from "../../data/LinksNavigation";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../data/AppContext";
import { Link, useLocation } from "react-router-dom";

export const NavigationLogged = ({ isOpen }) => {
  const { bgPrimary } = useContext(AppContext);

  const [active, setActive] = useState("");
  const location = useLocation();
  const page = location.pathname;

  useEffect(() => {
    const active = linksInterno.find((link) => link.link === page);
    setActive(active ? active.link : "");
  }, [page]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const btnColor = bgPrimary ? "secondary" : "primary";


  return (
    <div
      className={`${
        bgPrimary ? "container-secondary" : "container-primary  "
      } navigation-logged     ${
        isOpen
          ? "max-h-64 opacity-100 translate-y-0 pointer-events-auto"
          : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
      }  `}
    >
      <div className="navigation-logged-wrapper">
        {linksInterno.map((link, index) => (
          <Button
            link={link.link}
            key={index}
            fill="transparent"
            color={bgPrimary ? "secondary" : "primary"}
            className={`button-navigation-logged ${
              active === link.link ? btnColor==="primary" ? "text-primary-500" : "text-accent-500" : ""
            }`}
          >
            {link.name}
          </Button>
        ))}
        <Button
        onClick={() => {
            logout();
          }}
          fill="transparent"
          color={bgPrimary ? "secondary" : "primary"}
          className="button-navigation-sair"
        >
          Sair
        </Button>
      </div>
    </div>
  );
};
