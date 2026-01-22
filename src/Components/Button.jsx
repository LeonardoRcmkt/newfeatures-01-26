import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { VscArrowSmallRight } from "react-icons/vsc";

export const Button = ({
  id = "",
  link = "",
  className = "",
  children = "",
  disabled,
  onClick,
  onMouseLeave,
  onMouseOver,
  color = "primary", // primary | secondary
  fill = "solid", // solid | outline | transparent
  target = "_self",
  type = link ? "button" : "submit",
  icon = false,
  childrenClass = "",
}) => {
  const variantClass = `button-${color}-${fill}`;

  const buttonElement = (
    <button
      type={type}
      disabled={disabled}
      id={id}
      className={`button font-title ${variantClass} ${disabled ? "button-disabled" : ""}  ${className}`}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
    >
      <span className={`w-full ${childrenClass}`}>{children}</span>
      {icon && <VscArrowSmallRight className="!p-0 h-7 w-auto" />}
    </button>
  );

  return link ? (
    <HashLink to={link} className="button-link-wrapper" target={target}>
      {buttonElement}
    </HashLink>
  ) : (
    buttonElement
  );
};
