const buscarUsuarios = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Falha na requisição:", error);
    throw error;
  }
};

const init = async () => {
  try {
    const usuarios = await buscarUsuarios();
    // console.log(usuarios);
  } catch (e) {
    console.log("Erro tratado no caller");
  }
};

init();

// const buscarUsuarios = async () => {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     if (!res.ok) {
//       throw new Error(res.status);
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log("Ih, deu erro");
//   }
// };

// const Constante = async;

// const pegarApi = async () => {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     if (!res.ok) {
//       console.log("Ih, deu erro no HTTP");
//     }
//     const data = await res.json();
//     return data;
//   } catch (e) {
//     console.log("Falha na requisição");
//   }
// };

// const init = async () => {
//   try {
//     const usuarios = await usarApi();
//     console.log(usuarios)

//   } catch (e) {
//     console.log("erro de caller");
//   }
// };

// //   try {
// //     const usuarios = await buscarUsuarios();
// //     console.log(usuarios);
// //   } catch (e) {
// //     console.log("erro de caller");
// //   }
// // };

// init();
