import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import "swiper/css";
import "swiper/swiper-bundle.css";
import App from "./App.jsx";
import { Duvidas } from "./Components/home/Duvidas.jsx";
import { Contato } from "./Components/Duvidas/Contato.jsx";
import { AlterarSenha } from "./pages/AlterarSenha.jsx";
import { Cadastrar } from "./pages/Cadastrar.jsx";
import { CadastrarCupons } from "./pages/CadastrarCupons.jsx";
import { ExcluirDados } from "./pages/ExcluirDados.jsx";
import { Gameficacao } from "./pages/Gameficacao.jsx";
import { Ganhadores } from "./pages/Ganhadores.jsx";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login.jsx";
import { MeusCupons } from "./pages/MeusCupons.jsx";
import { MinhasMetas } from "./pages/MinhasMetas.jsx";
import { MeusDados } from "./pages/MeusDados.jsx";
import { MeusPremios } from "./pages/MeusPremios.jsx";
import { ProdutosParticipantes } from "./pages/ProdutosParticipantes.jsx";
import { RecuperarSenha } from "./pages/RecuperarSenha.jsx";
import { RedesParticipantes } from "./pages/RedesParticipantes.jsx";
import { PreCadastro } from "./pages/PreCadastro.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/produtos-participantes/:marca?",
        element: <ProdutosParticipantes />,
      },
      {
        path: "/login/",
        element: <Login />,
      },
      {
        path: "/cadastrar/",
        element: <Cadastrar />,
      },
      {

        path: "/precadastro/",
        element: <PreCadastro />,
      },
      {
        path: "/duvidas/",
        element: <Duvidas />,
      },
      {
        path: "/contato/",
        element: <Contato />,
      },
      {
        path: "/cadastrar-cupons/",
        element: <CadastrarCupons />,
      },
      {
        path: "/meus-cupons/",
        element: <MeusCupons />,
      },
      {
        path: "/minhas-metas/",
        element: <MinhasMetas />,
      },
      {
        path: "/alterar-senha/",
        element: <AlterarSenha />,
      },
      {
        path: "/meus-dados/",
        element: <MeusDados />,
      },
      {
        path: "/meus-premios/",
        element: <MeusPremios />,
      },
      {
        path: "/game/",
        element: <Gameficacao />,
      },
      {
        path: "/ganhadores/",
        element: <Ganhadores />,
      },
      {
        path: "/recuperar-senha/:token/",
        element: <RecuperarSenha />,
      },
      {
        path: "/excluir-dados/",
        element: <ExcluirDados />,
      },
      {
        path: "/redes-participantes/",
        element: <RedesParticipantes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ParallaxProvider>
      <RouterProvider router={router} />
    </ParallaxProvider>
  </React.StrictMode>
);
