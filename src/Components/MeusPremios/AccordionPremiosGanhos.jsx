import { Button } from "../../Components/Button"
import api from "../../../src/services/api"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import { Accordion } from "../Accordion"
import { useState, useEffect } from "react"
import "../../CSS/meus-premios.css"

export const AccordionPremiosGanhos = ({ open, onClick }) => {
  const [titlePremiosGanhos, setTitlePremiosGanhos] = useState(
    "Você ainda não tem prêmios",
  )
  const [qtdPremios, setQtdPremios] = useState(0)
  const [cardsPremios, setCardsPremios] = useState([])

  const returnPremioCard = (descPremio) => {
    let cardInfo;
    switch (descPremio.toString()) {
      case "100":
        cardInfo = {
          title: "prêmio instantâneo",
          img: "/images/telas-internas/meus-premios/premio-100.webp",
        }
        break
      case "300":
        cardInfo = {
          title: "prêmio instantâneo",
          img: "/images/telas-internas/meus-premios/premio-300.webp",
        }
        break
      case "500":
        cardInfo = {
          title: "prêmio instantâneo",
          img: "/images/telas-internas/meus-premios/premio-500.webp",
        }
        break
      case "400":
        cardInfo = {
          title: "prêmio instantâneo",
          img: "/images/telas-internas/meus-premios/premio-400.webp",
        }
        break
      case "1":
        cardInfo = {
          title: "casa",
          img: "/images/telas-internas/meus-premios/premio-casa.webp",
        }
        break

      case "2":
        cardInfo = {
          title: "carro",
          img: "/images/telas-internas/meus-premios/premio-carro.webp",
        }
        break
      case "3":
        cardInfo = {
          title: "tv",
          img: "/images/telas-internas/meus-premios/premio-tv.webp",
        }
        break
      case "4":
        cardInfo = {
          title: "smartphone",
          img: "/images/telas-internas/meus-premios/premio-smartphone.webp",
        }
        break
      case "5":
        cardInfo = {
          title: "videogame",
          img: "/images/telas-internas/meus-premios/premio-videogame.webp",
        }
        break
      default:
        break
    }
    return cardInfo
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get("/award")

        const allCardsPremios = []
        if (data && Array.isArray(data)) {
          data.forEach((e) => {
            const card = returnPremioCard(e.desc_premio)
            if (card) {
              allCardsPremios.push(card)
            }
          })

          const qtdPremios = allCardsPremios.length
          setQtdPremios(qtdPremios)
          setTitlePremiosGanhos(
            `Você já ganhou ${qtdPremios === 1 ? "1 prêmio" : `${qtdPremios} prêmios`
            }`,
          )
          setCardsPremios(allCardsPremios)
        } else {
          setCardsPremios([])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {cardsPremios.length > 0 ? (
        // Caso haja prêmios
        <div className="flex flex-col items-center justify-center gap-4 text-white text-xl " >
          <Accordion titleButton='Você já ganhou!' open={open} onClick={onClick} headerClass="meus-premios-header"
            className="meus-premios-accordion" >
            <section id='meus-premios' className={`h-auto flex flex-col mt-6`}>
              <Swiper
                modules={[Navigation, Autoplay]}
                rewind={true}
                spaceBetween={-10}
                slidesPerView={1.5}
                slidesPerGroup={1}
                navigation={{
                  prevEl: "mx-auto w-full #meus-premios .swiper-button-prev",
                  nextEl: "mx-auto w-full #meus-premios .swiper-button-next",
                }}
                breakpoints={{
                  520: {
                    slidesPerView: 1.8,
                    slidesPerGroup: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 1.8,
                    slidesPerGroup: 1,
                  },
                  1400: {
                    slidesPerView: 1.8,
                    slidesPerGroup: 1,
                    spaceBetween: -30,
                  },
                }}
              >
                {cardsPremios.map((card, index) => (
                  <SwiperSlide key={index} className='flex items-left'>
                    {/* Ajustar classes */}

                    <img
                      className='w-[40%] h-auto '
                      src={card.img}
                      alt={card.title}
                    />

                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </Accordion>
          <p> <span className="font-extrabold text-accent-500">Resgate seus vale-compras</span> através da <span className="font-extrabold text-accent-500">carteira digital hub4pay</span>. </p>
          <Button
            title='Cadastrar'
            color="secondary"
            className='!w-full'
            link='https://card.linkpremiocard.com/login'> Resgatar vale-compras</Button>
        </div>
      ) : (
        // Caso não haja prêmios
        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <p className='text-white  text-xl text-center  '>
            Parece que você ainda não tem prêmios...{" "}

          </p>

        </div>
      )}

    </>
  )
}
