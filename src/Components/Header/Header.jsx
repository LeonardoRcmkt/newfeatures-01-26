import { useState } from "react";
import { useNavigate } from "react-router";
import { HeaderTop } from "./HeaderTop";
import { Navigation } from "./Navigation";
import { useIsMobile } from "../../data/useIsMobile";
import { NavigationLogged } from "./NavigationLogged";
import { useContext } from "react";
import { AppContext } from "../../data/AppContext";

export const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useIsMobile(1024);

  const token = localStorage.getItem("token");

  const { bgPrimary, setBgPrimary } = useContext(AppContext);

  const handleParticipar = () => {
    navigate(token ? "/game/" : "/login/");
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="header-nav">
      <main
        className={`header-main ${
          bgPrimary ? "container-primary " : "container-secondary "
        }  transition-all ${
          token
            ? isOpen
              ? "rounded-b-none md:rounded-b-none md:rounded-br-none  "
              : "md:rounded-b-none"
            : isOpen
              ? "rounded-br-5xl md:rounded-br-5xl"
              : "rounded-br-5xl md:rounded-br-5xl"
        }`}
      >
        <HeaderTop
          isMobile={isMobile}
          isOpen={isOpen}
          onParticipar={handleParticipar}
          toggleMenu={toggleMenu}
          token={token}
        />

        {isMobile && (
          <div
            className={`
      overflow-hidden transition-all duration-300
      ${
        isOpen
          ? "max-h-64 opacity-100 translate-y-0 pointer-events-auto"
          : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
      }
    `}
          >
            <Navigation onClick={() => setIsOpen(false)} onToggle={() => setIsOpen(false)} />
          </div>
        )}
      </main>
      {token && <NavigationLogged isOpen={isMobile ? isOpen : true} />}
    </nav>
  );
};
