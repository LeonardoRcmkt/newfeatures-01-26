import { Button } from "../Button";
import { links } from "../../data/LinksNavigation";
import { useContext } from "react";
import { AppContext } from "../../data/AppContext";


export const Navigation = ({onToggle, onClick}) => {
  const { bgPrimary, setBgPrimary } = useContext(AppContext);

  return (
    <div className={`navigation`}>
          {links.map((item) => (
            // <a key={item.name} href={item.link}>
            <div key={item.name}>
            <Button link={item.link} onClick={onClick} fill="transparent" color={bgPrimary ? "secondary" : "primary"} className="button-navigation">
              {item.name}
            </Button>
            </div>            
          //  </a>
               ))}  
    </div>
  );

};
