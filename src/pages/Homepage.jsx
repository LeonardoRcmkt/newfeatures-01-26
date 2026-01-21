import { MarcasParticipantes } from '../Components/home/MarcasParticipantes/MarcasParticipantes'
import { Video } from '../Components/home/Video'
import { ComoParticipar } from './../Components/home/ComoParticipar'
import { Hero } from '../Components/home/Hero'
import { Premios } from './../Components/home/Premios'
import { MarcasImpulsionadoras } from './../Components/home/MarcasImpulsionadoras'
import Swal from "sweetalert2";
import { useState, useEffect } from 'react'
import api from "../services/api";

export const Homepage = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    api
      .get("/campaign")
      .then((data) => {
        setData(data);
        const agora = new Date();
        const dtFimCampanha = data.data_fim_campanha
          ? new Date(data.data_fim_campanha.replaceAll("-", "/") + " 23:59:59")
          : null;
        const dtModalConfiraGanhadores = new Date(agora.getFullYear(), 3, 7, 0, 0, 0); // Mês é zero-based, então 7 representa agosto

        if (agora >= dtFimCampanha) {
          Swal.fire({
            showConfirmButton: false,
            background: "transparent",
            title: "",
            showCloseButton: true,
            html: `
       
        <img class="cursor-pointer mx-auto w-full" 
             src="/images/modal-campanhaEncerrada.png" 
             alt="Promoção Encerrada!" 
             onclick="document.querySelector('.swal2-close').click()">
          
         
      `,
            //       html: `
            //   <a href="/ganhadores/">
            //   <img class="cursor-pointer mx-auto w-full" 
            //        src="/images/modal-campanha encerrada-ganhadores.png" 
            //        alt="Promoção Encerrada!" 
            //        onclick="document.querySelector('.swal2-close').click()">

            //       </a>
            // `,
          });
        }
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);


  return (
    <main id='homepage' className='flex flex-col-reverse -space-y-20 '>
      <Video />
      <MarcasImpulsionadoras />
      <MarcasParticipantes />
      <Premios />
      <ComoParticipar />
      <Hero />
      {/* Div vazia para aplicar o espaçamento corretamente */}
      <div />
    </main>
  )
}
