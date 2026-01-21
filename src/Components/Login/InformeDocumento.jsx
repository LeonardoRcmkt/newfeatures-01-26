import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { form } from '../../config/forms/formInformeDocumento'
import api from '../../services/api'
import { Form } from '../Form/Form'
import { Subtitle } from '../Subtitle'
import { Title } from '../Title'

export const InformeDocumento = ({ setUser = null }) => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    setFormData(form)
  }, [])

  async function handleSubmit(formData) {
    await api
      .get(`/login?numero_documento=${formData.numero_documento}`)
      .then((data) => {
        if (data.precadastrado) {
          localStorage.setItem("user", JSON.stringify(data.precadastrado));
          navigate("/precadastro/");
          return true;
        }
        if (!data.cadastrado) {
          localStorage.setItem('documento', formData.numero_documento)
          navigate('/cadastrar/')
          return true
        }

        if (typeof setUser == 'function') {
          setUser({
            documento: formData.numero_documento,
          })
        }

        // triggerSwal('Usuário cadastrado, efetue o login.', '', 'error');
      })
      .catch((error) => console.error('Erro:', error))
  }

  return (
    <main className=' main-internas '>
      <Title titleImg={typeof setUser != 'function' ? "/images/titles/cadastrar.webp" : "/images/titles/entrar.webp"} alt={typeof setUser != 'function' ? 'Cadastrar' : 'Entrar'} text={typeof setUser != 'function' ? 'Cadastre-se' : 'Login'} />


      <div className=' items-center justify-center flex w-full '>
        {Object.keys(formData).length > 0 && (
          <Form
            label={typeof setUser != 'function'
              ? 'Se você ainda não é cadastrado, informe seu CPF:'
              : 'Informe o CPF com que realizou os seus pedidos:'}
            data={formData}
            handleSubmit={handleSubmit}
            button={[
              {
                title:
                  typeof setUser != 'function' ? 'Cadastrar' : 'Participar',
                fullWidth: true,
              },
            ]}
          />
        )}
      </div>
    </main>
  )
}
