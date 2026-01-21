import QrScanner from "qr-scanner";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "../../Components/Button.jsx";
import { Input } from "../../Components/Form/Input.jsx";
import * as masks from "../../functions/form/masks";
import { validate } from "../../functions/form/validation";
import { triggerSwal } from "../../functions/swal.js";
import api from "../../services/api.js";
import Container from "../Container.jsx";

export const CupomForm = () => {
  const [chaveAcesso, setChaveAcesso] = useState("");

  const loadQR = async () => {
    Swal.fire({
      html: '<video width="100%" height="400px" id="videoElem"></video>',
      showCancelButton: true,
      cancelButtonColor: "primary",
      showConfirmButton: false,
      cancelButtonText: "Digitar Manualmente",
    })
      .then(() => {
        qrScanner.stop();
        Swal.close();
      })
      .then(() => {
        document.getElementById("chaveAcesso").focus();
      });

    const qrScanner = new QrScanner(
      videoElem,
      ({ data }) => {
        const codigo = data.split("|")[0].replace(/\D/g, "");
        setChaveAcesso(
          codigo.replace(
            /^(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4}).*/,
            "$1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11"
          )
        );
        Swal.close();
        qrScanner.stop();
      },
      { highlightScanRegion: true }
    );

    qrScanner.start();
  };

  async function submitEvent(e) {
    e.preventDefault();
    const validacao = await validate("chaveAcesso", chaveAcesso);

    if (validacao !== true) {
      document.getElementById("chaveAcesso").focus();
      return;
    }

    await handleSubmit();
  }

  async function handleSubmit() {
    const formData = chaveAcesso.replaceAll(" ", "");

    const loading = Swal.fire({


      background: 'rgba(255,255,255,0.9)',
      color: '#fff',
      html: ` <div> <h3 class="text-primary-500 text-3xl font-black"> Aguarde...</h3> <p> </p>  <div>`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      await api.post("/coupon", { codigo: formData });
      triggerSwal("Cupom em análise!", "A análise será realizada em até 72h, após a aprovação você receberá seus números da sorte e chances para o balão premiado", "success", "", "<a href='/meus-cupons/'>Ver Cupons</a>");
    } catch (err) {
      console.error("Erro ao enviar:", err);
    }
  }

  return (
    <div className='flex flex-col gap-6 text-primary-500  max-w-3xl'>
      <Container secondary className="" >
        <form onSubmit={submitEvent} className="flex flex-col gap-8 md:w-full items-center justify-center w-full">
          <div className="flex flex-col gap-4 w-full">
            {/* <p>Informe abaixo a chave de acesso do seu cupom fiscal</p> */}
            <p className="text-lg md:text-xl w-full md:w-auto -mt-2 text-center font-black text-primary-500">
              CHAVE DE ACESSO
            </p>
            <Input
              name="chaveAcesso"
              type="text"
              label="Chave de Acesso"
              onInput={(e) => setChaveAcesso(masks["chaveAcesso"](e.target.value))}
              value={chaveAcesso}
            />
          </div>

          <Button
            title="ESCANEAR QR CODE"
            className="lg:hidden"
            onClick={loadQR}
            color="secondary"
          >ESCANEAR QR CODE</Button>
          {/*Outline*/}
          <Button title="" onCLick={submitEvent} >CADASTRAR CUPOM</Button> {/*Solid*/}

        </form>

      </Container>
      <p>*Apenas <b>pedidos maiores que R$10,00</b> serão considerados para promoção. <b> Sua nota pode demorar até 72h para ser efetivada </b> após a realização do pedido.</p>
    </div>
  );
};
