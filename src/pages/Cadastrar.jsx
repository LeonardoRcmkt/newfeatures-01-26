// 1. Fazer um Cadastro completo igual o do Comper
// Colocar as Máscaras
// 2. Fazer as variáveis Estrangeiro/Brasileiro igual as do Comper
// 3. Integrar (Fazer erro de Back aparecer após o Submit/ Especificar erro de CPF/Email já cadastrado)
// 4. Fazer Entrar / Inserir CPF / Inserir Dados
// 5. Componentizar

// Colocar o error por digitar
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../Components/Button";
import { schema } from "../functions/form/schema";

export const Cadastrar = () => {
  const fields = [
    { field: "email" },
    { field: "documento", placeholder: "Documento" },
    { field: "senha", type: "password", placeholder: "Senha" },
  ];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@email.com",
      cpf: "51274244870",
      password: "Tonyakko0@",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    // new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  const Input = ({
    classWrapper = "form-inputs-wrapper",
    className = "new-form-input",
    classError = "text-red-500",
    field = "email",
    type = "text",
    placeholder = "E-mail",
  }) => {
    return (
      <div className={classWrapper}>
        <input
          className={className}
          {...register(field)}
          type={type}
          placeholder={placeholder}
        />
        {errors[field] && <p className={classError}>{errors[field].message}</p>}
      </div>
    );
  };

  return (
    <form
      className="flex w-full gap-2 flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((item, index) => (
        <div key={item.field}>
          <Input
            field={item.field}
            {...(item.type && { type: item.type })}
            {...(item.placeholder && { placeholder: item.placeholder })}
          />
        </div>
      ))}

      <Input type="email" />
      {/* 
      <div className="form-inputs-wrapper">
        <input
          className="new-form-input"
          {...register("email")}
          type="text"
          placeholder="Documento"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div> */}

      <div className="form-inputs-wrapper">
        <input
          className="new-form-input"
          {...register("documento")}
          type="text"
          placeholder="Documento"
        />
        {errors.documento && (
          <p className="text-red-500">{errors.documento.message}</p>
        )}
      </div>

      <div>
        <input
          className="new-form-input"
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Carregando..." : "Enviar"}
      </Button>
    </form>

    // <div className="flex w-full gap-4 flex-col">
    //   <form
    //     className="flex w-full gap-2 flex-col"
    //     onSubmit={handleSubmit((data) => {
    //       console.log(data);
    //     })}
    //   >
    //     <input
    //       className="new-form-input"
    //       placeholder="First Name"
    //       {...smartRegister("firstName", {
    //         required: "This is required",
    //         minLength: { value: 4, message: "Min Length is 4" },
    //       })}
    //     />
    //     <p
    //       className={`transition-all ${errors.firstName?.message ? " opacity-100" : "opacity-50 "}`}
    //     >
    //       {errors.firstName?.message}
    //     </p>

    //     <input
    //       className="new-form-input"
    //       placeholder="Psswowrd"
    //       {...smartRegister("password", {
    //         required: "This is required",
    //         minLength: { value: 4, message: "Min Length is 4" },
    //       })}
    //     />
    //     <p>{errors.password?.message}</p>

    //     <Button type="submit">Enviar</Button>
    //   </form>
    // </div>
  );
};
