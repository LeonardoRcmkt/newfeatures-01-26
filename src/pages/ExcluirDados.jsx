import Container from "../Components/Container";
import api from '../../src/services/api.js'
import { Button } from '../Components/Button.jsx'
import { Title } from '../Components/Title.jsx'
import { triggerSwal } from '../functions/swal.js'

export const ExcluirDados = () => {
  async function handleDelete(e) {
    e.preventDefault()
    api
      .delete('/user')
      .then(() => {
        localStorage.clear()

        triggerSwal('Cadastro pessoal excluído!').then(
          () => (window.location.href = '/'),
        )
      })
      .catch((error) => console.error('Erro:', error.message))
  }

  return (
    <main
      id='excluir-senha'
      className={`main-internas`}
    >


      <Title titleImg={"/images/titles/excluir-dados.webp"} alt={'Excluir Dados'} />

      <Container>
        <form
          onSubmit={handleDelete}
          className='text-primary-500'
        >
          <h2 className='mb-4 uppercase text-border font-extrabold text-2xl text-error '>

            Atenção:
          </h2>
          <p className='text-left '>
            Prosseguir com a exclusão dos seus dados implica na interrupção do tratamento dos seus dados para fins de participação nesta promoção, incluindo a <strong className='font-extrabold'> invalidação das compras cadastradas, números da sorte, chances geradas, e prêmios atribuídos ao seu CPF </strong>que não poderão ser recuperados em nenhuma circunstância.
          </p>
          <p className='text-left mt-4 '>
            Seus dados permanecerão armazenados no banco de dados exclusivamente para o cumprimento de obrigações legais perante a SPA/MF (Secretaria de Prêmios e Apostas – Ministério Federal).
          </p>
          <h3 className='mb-4 uppercase text-border font-extrabold my-8 '>
            deseja realmente excluir?
          </h3>
          <div className='flex flex-col  items-center justify-between w-full gap-1 '>
            <Button
              link='/meus-dados/'
            >Manter meus dados</Button>
            <Button fill="outline" onClick={handleDelete} >Excluir meus DADOS</Button>
          </div>
        </form>
      </Container>

    </main>
  )
}
