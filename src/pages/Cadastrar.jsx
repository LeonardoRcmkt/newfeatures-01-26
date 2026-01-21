import React, { useEffect, useState } from "react";
import api from "../../src/services/api";
import { Form } from "../Components/Form/Form";
import { Subtitle } from "../Components/Subtitle";
import { Title } from "../Components/Title";
import { form } from "../config/forms/formCadastro";
import { triggerSwal } from "../functions/swal";
import { formatDate } from "../functions/utils";
import { useForm, SubmitHandler  } from "react-hook-form";
import { Button } from "../Components/Button";

export const Cadastrar = () => {
  // Objetivo: fazer o form funcionar igual ao comper com a lógica Estrangeiro/Brasileiro e mudar mensagens de erro/lógicas dpeendendo se é Estrangeiro/Brasileiro
  let renderCount = 0;
  const {
    register,
    handleSubmit,
    // handleChange,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  renderCount++;

  console.log(errors);

  return (
    <div className="flex w-full gap-8 flex-col ">
      <p>Render count: {renderCount}</p>
      <form
        className="flex w-full gap-4 flex-col"
        // onChange={handleChange((data) => {
        //   console.log(data);
        // })}
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input
          className="new-form-input"
          {...register("firstName", {
            required: "This is required",
            minLength: { value: 4, message: "Min Length is 4" },
          })}
          placeholder="First Name"
        />
        <p>{errors.firstName?.message}</p>
        <input
          className="new-form-input"
          {...register("lastName", {
            required: "This is required",
            minLength: { value: 4, message: "Min Length is 4" },
          })}
          placeholder="Last Name"
        />
        <p>{errors.lastName?.message}</p>
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
};

// export const Cadastrar = () => {
//   const [formData, setFormData] = useState({})

//   useEffect(() => {
//     if (localStorage.getItem('user')) {
//       const user = JSON.parse(localStorage.getItem('user'))
//       for (const iterator of form) {
//         iterator.value =
//           typeof user[iterator.name] == 'string' ? user[iterator.name] : ''
//       }

//       form[2].value = formatDate(user.dt_nascimento)
//       form[3].value = user.sexo
//       form[4].value = user.cependereco.padStart(8, '0')
//       form[7].value = user.numero_endereco
//       form[13].value = user.email
//       form[18].value = user.receberMensagens == '1' ? true : false
//     }
//     form[0].value = localStorage.getItem('documento')
//     setFormData(form)
//   }, [])

//   async function handleSubmit(formData) {
//     delete formData.confirma_email
//     delete formData.confirmar_senha_acesso
//     formData.complemento == '' && delete formData.complemento
//     formData.telefone = formData.telefone.replace(/[^\d]/g, '')

//     formData.dt_nascimento = `${formData.dt_nascimento.slice(
//       6,
//       10,
//     )}-${formData.dt_nascimento.slice(3, 5)}-${formData.dt_nascimento.slice(
//       0,
//       2,
//     )}`

//     await api
//       .post('/user', formData)
//       .then((data) => {
//         localStorage.setItem('token', data.token)

//         triggerSwal('Cadastro Realizado com Sucesso').then(
//           () => (window.location.href = '/meus-cupons/'),
//         )
//       })
//       .catch((error) => console.error('Erro:', error))
//   }

//   return (
//     <>
//       <main

//         className={`main-internas`}
//       >
//         <Title titleImg={"/images/titles/cadastrar.webp"} alt={'Cadastrar'} />

//         <div className='items-center justify-center flex w-full '>
//           {Object.keys(formData).length > 0 && (
//             <Form
//               label={'Digite seus dados abaixo para participar da promoção.'}
//               data={formData}
//               handleSubmit={handleSubmit}
//               button={[{ title: 'Avançar', className: 'w-full' }]}
//             />
//           )}
//         </div>
//       </main>
//     </>
//   )
// }
