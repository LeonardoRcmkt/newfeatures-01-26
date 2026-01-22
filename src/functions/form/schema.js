
import { z } from "zod";

const requiredDefault = "Campo obrigatório!"

export const schema = z.object({
  email: z
    .string({ required_error: {requiredDefault} })
    .email("Email inválido"),

  senha: z
    .string({ required_erorr: {requiredDefault} })
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[a-z]/, "Precisa de letra minúscula")
    .regex(/[A-Z]/, "Precisa de letra maiúscula")
    .regex(/[0-9]/, "Precisa de número")
    .regex(
      /[!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|]/,
      "Precisa de caractere especial",
    ),

  documento: z
    .string({ required_erorr: {requiredDefault} })

    .regex(
      /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, "Documento inválido"
    ),

});