import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";


export const SelectCategoriaFaq = ({
  name = "",
  options = [],
  value = "",
  onChange,
  optionDefault,
}) => {
  return (
    <div className="container-secondary duvidas-category">
      <select
        className="duvidas-category-html"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        aria-label="Selecione um assunto"
      >
        <option value="" disabled hidden className="">
          {optionDefault}
        </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option}
              className="duvidas-category-option"
            >
              {option}
            </option>
          ))}
      </select>
      <BiSolidDownArrow className="duvidas-category-arrow" />
    </div>
  );
};


// import * as Select from "@radix-ui/react-select";
// import { BiSolidDownArrow } from "react-icons/bi";

// export const SelectCategoriaFaq = ({
//   name = "",
//   options = [],
//   value = "",
//   onChange,
//   optionDefault,
// }) => {
//   return (
//     <Select.Root value={value} onValueChange={onChange} name={name}>
//       <Select.Trigger
//         className="duvidas-category-trigger container-secondary items-center justify-between"
//       >
//         <Select.Value placeholder={optionDefault} />
//         <Select.Icon>
//           <BiSolidDownArrow className="duvidas-category-arrow" />
//         </Select.Icon>
//       </Select.Trigger>

//       <Select.Content className="container-secondary duvidas-category-content">
//         <Select.Viewport>
//           {options.map((opt, i) => (
//             <Select.Item key={i} value={opt} className="duvidas-category-item">
//               <Select.ItemText>{opt}</Select.ItemText>
//             </Select.Item>
//           ))}
//         </Select.Viewport>
//       </Select.Content>
//     </Select.Root>
//   );
// };
