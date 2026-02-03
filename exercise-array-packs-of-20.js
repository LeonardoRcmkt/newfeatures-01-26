const services = [
    {
      id: 1,
      name: "Barba",
      price: 42,
      duration: 30,
    },
    {
      id: 2,
    //   name: "Cabelo",
      price: 32,
      duration: 30,
    },
    {
      id: 3,
      name: "Cabelo e Barba",
      price: 52,
      // duration: 50,
    },
];

const nF = (item, label = "Não encontrado") =>
  item === 0
    ? label
    : Array.isArray(item) && !item.length
      ? label
      : item === ""
        ? label
        : (item ?? label);

const servicesList = (item) =>
  nF(
    item
      .map(
        (item) =>
          `Serviço: ${nF(item.name)}, Id: ${nF(item.id)}, Preço: ${nF(item.price)}, Duração: ${nF(item.duration)}\n`,
      )
      .join(""),
    "Serviços não encontrados",
  );

const objectSum = (label, item, key) =>
  `${label}: ${nF(
    item.reduce((a, item) => a + nF(item[key], null), 0),
    "Sem preços",
  )}`;

const servicesSummary = (item) =>
  `${objectSum("Preço total", item, "price")}
${objectSum("Tempo total", item, "duration")}`;

const result = (item) =>
`Lista de Serviços:

${servicesList(item)}

Resumo dos serviços:

${servicesSummary(item)}`;

console.log(result(services));