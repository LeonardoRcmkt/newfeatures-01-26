import axios from 'axios';

export function formatDate(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Check if the Date object is valid (avoid errors)
  if (isNaN(date.getTime())) {
    return 'Invalid date format';
  }

  // Extract day, month, and year with zero-padding
  const day = String(date.getDate() + 1).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  // Return the formatted date string
  return `${day}/${month}/${year}`;
}

export const ocultaDocumento = (documento) => {
  const tamanho = documento.length;
  const documentoAlterado = documento.replace('000', '');

  if (documento.substr(0, 3) == '000') {
    return (
      'XXX.XXX.' +
      documentoAlterado.substr(-5, 3) +
      '-' +
      documentoAlterado.substr(-2)
    );
  } else if (tamanho == 14) {
    return (
      documentoAlterado.substr(0, 3) +
      'XX.XXX.XXX' +
      documentoAlterado.substr(-2)
    );
  } else {
    return 'Documento inválido.';
  }
};

export const buscarEnderecoPorCep = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;
    if (!data.erro) {
      // Se não houver erro na resposta, retorna o endereço
      return {
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      };
    } else {
      // Se houver erro na resposta, retorna null
      return null;
    }
  } catch (error) {
    // Em caso de erro na requisição, retorna null
    console.error('Erro ao buscar endereço por CEP:', error);
    return null;
  }
};
