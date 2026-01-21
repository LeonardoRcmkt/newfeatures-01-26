import { useState } from "react"
import "../../../CSS/games/balao-premiado.css"
import Swal from "sweetalert2"

export const BalaoPremiado = ({ handleGamificacao, chances }) => {
  const [balao, setBalao] = useState(false)

  function selecionaBalao(e) {
    setBalao(e)
    const selectedBalao = document.querySelector(
      `.floating:nth-of-type(${e}) img`,
    )
    document.getElementById("audio-enchendo").play()
    selectedBalao.classList.remove("scale-125")
    selectedBalao.classList.add("scale-150")

    setTimeout(() => {
      document.getElementById("audio-explodindo").play()
      selectedBalao.classList.add("invisible")
      selectedBalao.classList.remove("scale-150")
      e == 2 && selectedBalao.classList.add("scale-125")
      Swal.fire({
        toast: true,
        showConfirmButton: false,
        showCloseButton: false,
        icon: "info",
        title: `Aguarde...`,
      })
    }, 1000)
    setTimeout(() => {
      handleGamificacao().then((data) => {
        Swal.fire({
          showConfirmButton: false,
          showCloseButton: true,
          html: `<img class="mx-auto cursor-pointer" onclick="document.querySelector('.swal2-close').click()" src="data:image/png;base64,${data.modal}" alt="" />`,
          customClass: { popup: "!bg-transparent" },
        }).then(() => {
          if (data.premio) {
            window.location.href = "/meus-premios/"
          }
          selectedBalao.classList.remove("invisible")
          setBalao(false)
        })
      })
    }, 2000)
  }

  return (
    <div className='w-full relative mb-12 mt-20 md:mt-24'>
      <div className='grid grid-cols-3 z-10'>
        <div className='relative cursor-pointer z-10 left-4 floating !m-0'>
          <img
            onClick={
              chances > 0 && balao == false ? () => selecionaBalao(1) : () => {}
            }
            className={`transition duration-1000 -rotate-12 ${
              chances < 1 && "grayscale"
            }`}
            src='/gameficacao/balão/balao-1.png'
            alt='Balão Rosa'
          />
        </div>
        <div className='relative cursor-pointer z-20 -top-8 floating balao-premiado-central !m-0'>
          <img
            onClick={
              chances > 0 && balao == false ? () => selecionaBalao(2) : () => {}
            }
            className={`transition duration-1000 scale-125 ${
              chances < 1 && "grayscale"
            }`}
            src='/gameficacao/balão/balao-2.png'
            alt='Balão Roxo'
          />
        </div>
        <div className='relative cursor-pointer z-10 right-4 floating !m-0'>
          <img
            onClick={
              chances > 0 && balao == false ? () => selecionaBalao(3) : () => {}
            }
            className={`transition duration-1000 rotate-12 ${
              chances < 1 && "grayscale"
            }`}
            src='/gameficacao/balão/balao-3.png'
            alt='Balão Verde'
          />
        </div>
      </div>
      <audio
        className='hidden'
        id='audio-enchendo'
        src='/gameficacao/balão/balao-enchendo.mp3'
      ></audio>
      <audio
        className='hidden'
        id='audio-explodindo'
        src='/gameficacao/balão/balao-explodindo.mp3'
      ></audio>
    </div>
  )
}
