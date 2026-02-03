// A forma mais fácil de fazer uma função de Delay
const delayNoValue = () =>
  new Promise((resolve) => setTimeout(resolve, 1000));

// A forma mais fácil de fazer uma função de Delay que retorne um valor
const delay = () =>
  new Promise((resolve) => setTimeout(() => resolve(2), 1000));

// A forma mais fácil de exibir os resultados
(async () =>{
  console.log(1);
  console.log(await delay());
  console.log(3);
})() 