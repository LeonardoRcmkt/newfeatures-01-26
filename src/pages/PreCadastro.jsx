import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import { Title } from "../Components/Title";

export const PreCadastro = () => {
  const navigate = useNavigate();

  async function handleClick(precadastro) {
    const user = JSON.parse(localStorage.getItem("user"));
    let documento = user.numero_documento;
    if (documento <= 99999999999 && documento.length > 11) {
      documento = documento.substring(3);
    }

    localStorage.setItem("documento", documento);

    if (!precadastro) {
      localStorage.removeItem("user");
    }

    navigate("/cadastrar/");
    return true;
  }

  return (
    <main className="main-internas
     ">
      <Title titleImg={"/images/titles/entrar.webp"} alt={'Entrar'} />
      <Container

      >
        <span className="text-center text-md md:text-xl   text-primary-500 max-w-2xl ">
          Você participou da promoção
          <span className=" font-extrabold whitespace-nowrap ">
            {" "}
            Marcas  Campeãs
            2025
          </span>
          .  Quer utilizar os
          mesmos {" "}
          dados para
          cadastro?
        </span>
        <div className="w-full flex flex-col-reverse  items-center gap-2 mt-4">
          <Button
            className="w-full"
            fill="outline"

            onClick={() => handleClick(false)}
          > Cadastrar todos os dados manualmente</Button>
          <Button
            className="w-full"

            onClick={() => handleClick(true)}
          >Reutilizar dados</Button>
        </div>
      </Container>
    </main>
  );
};
