import React, { useState } from "react"

import * as masks from "../../functions/form/masks"

import { adapter } from "../../functions/form/adapter"
import { validate } from "../../functions/form/validation"
import { buscarEnderecoPorCep } from "../../functions/utils"
import { Button } from "../Button"
import { Checkbox } from "./Checkbox"
import { Input } from "./Input"
import { Select } from "./Select"
import { Textarea } from "./Textarea"
import Container from "../Container"

export const Form = ({ data, handleSubmit, label, button = [{}] }) => {
  const [formData, setFormData] = useState(
    data.reduce((acumulador, objeto) => {
      acumulador[objeto.name] = ""
      if (objeto.value != undefined) {
        acumulador[objeto.name] =
          typeof masks[`${objeto.name}`] === "function"
            ? masks[`${objeto.name}`](objeto.value)
            : objeto.value
      }

      return acumulador
    }, {}),
  )

  async function handleChange(e) {
    const { name, value } = e.target

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        typeof masks[`${name}`] === "function"
          ? masks[`${name}`](value)
          : value,
    }))

    if (value.length == 9 && name == "cep") {
      const endereco = await buscarEnderecoPorCep(value.replace("-", ""))
      if (endereco != null)
        setFormData((prevState) => ({
          ...prevState,
          endereco: endereco.logradouro,
          bairro: endereco.bairro,
          cidade: endereco.localidade,
          uf: endereco.uf,
        }))
    }
  }

  function handleChangeCheckbox(e) {
    const { name, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  async function submitEvent(e) {
    e.preventDefault()
    const button = e.target.lastElementChild.getElementsByTagName("button")[0]
    const buttonText = button.innerHTML

    button.disabled = true
    button.innerHTML = `<img class="motion-safe:animate-spin h-4 w-4 mx-auto" src="/images/base/icon-loading.svg" alt="Carregando..." />`

    let validForm = true
    const form = new FormData(e.target)
    let data = formData

    for (const i of form.entries()) {
      data = {
        ...data,
        [i[0]]: i[1] === "on" ? true : i[1],
      }
    }

    for (const campo in data) {
      const validacao = await validate(campo, data[campo])

      if (validacao !== true) {
        document.getElementById(campo).focus()
        document.getElementById(campo).blur()
        if (document.getElementById(campo).type == "checkbox") {
          document.getElementById(campo).click()
          document.getElementById(campo).click()
        }
        validForm = false
      }
    }

    if (validForm !== true) {
      button.innerHTML = buttonText
      button.disabled = false
      return
    }

    data = await adapter(data)
    await handleSubmit(data)

    button.innerHTML = buttonText
    button.disabled = false
  }

  return (
    <Container secondary >
      <form
        method='POST'
        className='w-full grid grid-cols-12 gap-5 font-text'
        onSubmit={submitEvent}
      >
        {label && <h3 className="form-label">
          {label}
        </h3>}

        {data.map((input, key) => {
          if (input.type == "select") {
            return (
              <div
                key={key}
                className={`col-span-${input.columns.xs} md:col-span-${input.columns.md}`}
              >
                <Select
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  disabled={input.disabled ? true : false}
                  value={formData[input.name]}
                  onChange={handleChange}
                  options={input.options}
                  optionDefault={input.defaultOption}
                />
              </div>
            )
          }

          if (input.type == "checkbox") {
            return (
              <div key={key} className={`col-span-12`}>
                <Checkbox
                  label={input.label}
                  name={input.name}
                  disabled={input.disabled ? true : false}
                  checked={formData[input.name]}
                  onChange={handleChangeCheckbox}
                />
              </div>
            )
          }
          if (input.class == "textarea") {
            return (
              <div key={key} className={`col-span-12`}>
                <Textarea
                  label={input.label}
                  name={input.name}
                  disabled={input.disabled ? true : false}
                  value={formData[input.name]}
                  onInput={handleChange}
                />
              </div>
            )
          }

          return (
            <div
              key={key}
              className={`col-span-${input.columns.xs} md:col-span-${input.columns.md}`}
            >
              <Input
                key={key}
                label={input.label}
                type={input.type}
                name={input.name}
                disabled={input.disabled ? true : false}
                value={formData[input.name]}
                onInput={handleChange}
                className={`col-span-${input.columns}`}
              />
            </div>
          )
        })}
        <div className='flex justify-center items-center w-full col-span-12 gap-1 flex-col '>
          {button.map((btn, index) => {
            return (
              <Button
                key={index}
                className={btn.className}
                onClick={btn.onClick}
                link={btn.link}
                primary={btn.primary}
                order={btn.order}
                disabled={btn.disabled}
                fill={btn.fill}
                fullWidth={btn.fullWidth}
                type={btn.type}
              > {btn.title}</Button>
            )
          })}
        </div>
      </form>
    </Container>
  )
}
