import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { AppContext } from "../../data/AppContext";

export const Burger = ({ isOpen, onClick, token }) => {
 const { bgPrimary, setBgPrimary } = useContext(AppContext);
  return (
  <button
    className={`burger-button ${bgPrimary ? "text-accent-500" : "text-secondary-700"}  `}
    onClick={onClick}
  >
    <BiMenu
      className={`burger-icon
      ${isOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
    />
    <AiOutlineClose
      className={`burger-icon
      ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
    />
  </button>
);}
