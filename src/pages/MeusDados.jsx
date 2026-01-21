import React, { useEffect, useState } from 'react'
import api from '../../src/services/api'
import { Form } from '../Components/Form/Form'
import { Title } from '../Components/Title'
import { form } from '../config/forms/formMeusDados'
import { triggerSwal } from '../functions/swal'

export const MeusDados = () => {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({})
  const button = [
    {
      title: 'ALTERAR DADOS',


    },
    {
      title: 'EXCLUIR DADOS',

      link: '/excluir-dados/',
      fill: 'outline',
      color: 'secondary '
    },
  ]

  useEffect(() => {
    api.get('/user').then((user) => {

      for (const iterator of form) {
        iterator.value =
          typeof user[iterator.name] == 'string' ? user[iterator.name] : ''
      }

      form[0].value = user.numero_documento
      if (
        user.numero_documento <= 99999999999 &&
        user.numero_documento.length > 11
      ) {
        form[0].value = user.numero_documento.substring(3)
      }



      form[2].value = new Date(user.dt_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      form[3].value = user.sexo
      form[4].value = user.cependereco.padStart(8, '0')
      form[7].value = user.numero_endereco
      form[11].value = user.telefone
      form[12].value = user.email
      form[14].value = user.receberMensagens == '1' ? true : false

      setFormData(form)
      setLoading(false)
      return
    })
  }, [])

  async function handleSubmit(formData) {
    delete formData.confirma_email
    formData.complemento == '' && delete formData.complemento
    formData.telefone = formData.telefone.replace(/[^\d]/g, '')

    formData.dt_nascimento = `${formData.dt_nascimento.slice(
      6,
      10,
    )}-${formData.dt_nascimento.slice(3, 5)}-${formData.dt_nascimento.slice(
      0,
      2,
    )}`

    await api
      .put('/user', formData)
      .then((data) => {
        localStorage.clear()
        localStorage.setItem('token', data.token)

        triggerSwal('Alteração de Dados realizada com Sucesso').then(() =>
          window.location.reload(),
        )
      })
      .catch((error) => console.error('Erro:', error.message))
  }

  return (
    <>
      <main
        id='index'
        className={`main-internas `}
      >

        <Title titleImg={"/images/titles/meus-dados.webp"} alt={'Meus Dados'} className={'w-44!'} />


        {loading ? <p className='font-bold text-primary-500 animate-pulse' > Carregando Dados ...</p> : (

          <Form data={formData} handleSubmit={handleSubmit} button={button} />

        )}
      </main>
    </>
  )
}
