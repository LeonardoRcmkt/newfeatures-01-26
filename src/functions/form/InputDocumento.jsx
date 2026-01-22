import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

export const InputDocumento = ({ control, name }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <IMaskInput
        {...field}
        mask={value =>
          value.replace(/\D/g, "").length > 11
            ? "00.000.000/0000-00" // CNPJ
            : "000.000.000-00"    // CPF
        }
        placeholder="CPF ou CNPJ"
        unmask={true} // deixa o valor limpo no field.value
      />
    )}
  />
);
