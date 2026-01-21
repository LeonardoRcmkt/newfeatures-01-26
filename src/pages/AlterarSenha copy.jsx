import { useEffect, useState } from 'react';
import { Form } from '../Components/Form/Form.jsx';
import { Title } from '../Components/Title.jsx';
import api from '../services/api.js';
import { triggerSwal } from '../functions/swal.js';
import { form } from '../config/forms/formAlterarSenha';

export const AlterarSenha = () => {
  const [formData, setFormData] = useState({});
  const button = [
    {
      title: 'Alterar Senha',
      width: '100%',
    },
  ];

  useEffect(() => {
    setFormData(form);
  }, []);

  async function handleSubmit(formData) {
    delete formData.confirmar_senha_acesso;
    formData.nova_senha_acesso = formData.senha_acesso;
    formData.senha_acesso = formData.senhaAtual;
    delete formData.senhaAtual;

    await api
      .put('/password', formData)
      .then((data) => {
        localStorage.clear();
        localStorage.setItem('token', data.token);

        triggerSwal('Senha atualizada com sucesso!').then(() =>
          window.location.reload()
        );
      })
      .catch((error) => console.error('Erro:', error.message));
  }

  return (
    <>
      <main
        id='alterar-senha'
        className={`flex flex-col justify-center items-center overflow-hidden  relative  bg-cover bg-no-repeat bg-center pb-8`}
      >
        <div className=' mb-8'>
          <Title text='Alterar Senha'  />
        </div>
        <div className='max-w-xl px-8 w-full'>
          {Object.keys(formData).length > 0 && (
            <Form data={formData} handleSubmit={handleSubmit} button={button} />
          )}
        </div>
      </main>
    </>
  );
};
