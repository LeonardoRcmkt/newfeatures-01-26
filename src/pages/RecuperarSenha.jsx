import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../src/services/api";
import { Form } from "../Components/Form/Form";
import { Title } from "../Components/Title";
import { form } from "../config/forms/formRecuperarSenha";
import { triggerSwal } from "../functions/swal";

export const RecuperarSenha = () => {
  const { token } = useParams();
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    setDataForm(form);
  }, []);

  async function handleSubmit(formData) {
    delete formData.confirmar_senha_acesso;
    await api
      .put(`/recovery`, { ...formData, pin: token })
      .then(() => {
        triggerSwal("Senha atualizada com sucesso!").then(
          () => (window.location.href = "/login/")
        );
      })
      .catch((error) => console.error("Erro:", error.message));
  }

  return (
    <main className="main-internas ">
      <Title titleImg={"/images/titles/recuperar-senha.webp"} alt={'Recuperar Senha'} />



      {Object.keys(dataForm).length > 0 && (
        <Form
          label={" Crie uma nova senha para o seu acesso:"}
          data={dataForm}
          handleSubmit={handleSubmit}
          button={[{ title: "Cadastrar Senha" }]}
        />
      )}

    </main>
  );
};
