import { useEffect, useState } from "react";
import { Button } from "./Button";

// 🧠 Desafio JavaScript — Exibição de Dados

// Contexto
// Você está criando a lógica de um resumo de serviços contratados para um cliente.

// Objetivo
// Processar uma lista de serviços e gerar uma exibição em texto com as informações calculadas.

// Requisitos
// Trabalhar com uma lista (array) de objetos
// Cada objeto representa um serviço e contém:
// nome do serviço
// duração (em minutos)
// valor
// Criar a lógica que:
// percorra todos os itens da lista
// gere uma linha de texto para cada serviço
// calcule:
// o valor total
// o tempo total
// O resultado final deve ser um único texto contendo:
// a lista formatada dos serviços
// o tempo total
// o valor total

// Regras
// Usar JavaScript puro
// Resolver tudo usando funções
// Não usar classes
// Não usar variáveis globais
// Não usar DOM
// O código deve funcionar para qualquer lista de serviços com a mesma estrutura

// Restrições mentais (importantes)
// Você não pode acessar propriedades “fixas” fora da função
// A solução deve permitir mudar facilmente qual propriedade será exibida
// Nenhuma parte da lógica pode depender da posição fixa dos itens na lista

// Resultado esperado (conceitual)
// Um texto que poderia ser mostrado ao cliente, contendo:
// cada serviço em sua própria linha
// um resumo final claro

export const Exercicio2 = () => {
  const services = [
    {
      name: "Barba",
      price: 30,
      time: 60,
    },
    {
      name: "Cabelo",
      price: 50,
      time: 90,
    },
    {
      name: "Barba e Cabelo",
      price: 70,
      time: 120,
    },
  ];

  const serviceReadProperty = (
    i,
    name1,
    property1,
    name2,
    property2,
    name3,
    property3,
  ) => {
    const result = i.map((item) => {
      return (
        `${name1} ${item[property1]} ///// ${name2} ${item[property2]} /////  ${name3} ${item[property3]} ///// ` +
        "\n"
      );
    });
    return result;
  };

  // const servicesSumarry = (i) =>{

  //   return
  // }

  // console.log(services[1].name);
  const displayServices = (i) => {
    console.log("Estes foram seus serviços:");
    console.log(
      `${serviceReadProperty(services, "Nome: ", "name", "Preço: ", "price", "Tempo: ", "time")}`,
    );
    // console.log("Este é o resumo dos seus serviços");
    // console.log(servicesSummary(i));
  };

  displayServices(services);

  return (
    <section className="section-home section-home-primary md:pt-56">
      <Button color="secondary" onClick={() => increase()}>
        Aumentar
      </Button>
      <Button color="secondary" onClick={() => decrease()}>
        Diminuir
      </Button>
      <Button color="secondary" onClick={() => reset()}>
        Reset
      </Button>
    </section>
  );
};
