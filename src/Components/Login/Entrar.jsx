import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { form } from "../../../src/config/forms/formEntrar"
import api from "../../../src/services/api"
import { validate } from "../../functions/form/validation"
import { triggerSwal } from "../../functions/swal"
import { Form } from "../Form/Form"
import { Subtitle } from "../Subtitle"
import { Title } from "../Title"
import { color } from "motion"

export const Entrar = ({ documento = "" }) => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    form[0].value = documento
    setFormData(form)
  }, [])

  async function handleSubmit(formData) {
    await api
      .post(`/login`, formData)
      .then((data) => {
        if (data.cadastrado === false) {
          localStorage.setItem("documento", formData.numero_documento)
          navigate("/cadastrar/")
          return true
        }

        localStorage.setItem("token", data.token)
        triggerSwal("Login Realizado com Sucesso", "").then(
          () => (window.location.href = "/meus-cupons/"),
        )
      })
      .catch((error) => console.error("Erro:", error))
  }

  async function recovery() {
    const validacao = await validate(
      "documentoEntrar",
      document.getElementById("documentoEntrar").value,
    )

    if (validacao !== true) {
      document.getElementById("documentoEntrar").focus()
      document.getElementById("documentoEntrar").blur()

      return
    }
    const button = document.querySelectorAll("button[type=button]")[1]
    const buttonText = button.innerHTML

    button.disabled = true
    button.innerHTML = `<img class="motion-safe:animate-spin h-4 w-4 mx-auto" src="/images/base/icon-loading.svg" alt="Carregando..." />`
    api
      .post(`/recovery`, {
        numero_documento: document
          .getElementById("documentoEntrar")
          .value.replace(/[^0-9]/gi, ""),
      })
      .then((data) => {
        triggerSwal(
          "Recuperação de Senha",
          "",
          "success",
          `<p>
        ${"Enviamos um e-mail para <strong> " +
          data +
          "</strong>, <br>" +
          "contendo instruções para cadastrar uma nova senha de acesso. " +
          "Caso não encontre o nosso e-mail " +
          "na caixa de entrada, verifique a pasta " +
          'de "Lixo eletrônico" e "SPAM". <br> <br>' +
          "Caso não localize o e-mail, entre " +
          "em contato através do “Fale " +
          "conosco” ou do Tel/WhatsApp: " +
          "(11) 2626-3437"
          }</p>`,
        ).then(() => (window.location.href = "/login/"))

        return
      })
      .catch((error) => console.error("Erro:", error.message))
      .finally(() => {
        button.innerHTML = buttonText
        button.disabled = false
      })
  }

  const button = [
    {
      title: "AVANÇAR",


    },
    {
      title: "esqueci a senha",

      onClick: recovery,
      type: "button",
      fill: "outline",
      color: "secondary"

    },
  ]

  return (
    <main className='main-internas'>
      <Title titleImg={"/images/titles/entrar.webp"} alt={'Entrar'} />


      {Object.keys(formData).length > 0 && (
        <Form label={'Digite sua senha para entrar'} data={formData} handleSubmit={handleSubmit} button={button} />
      )}


    </main>
  )
}
