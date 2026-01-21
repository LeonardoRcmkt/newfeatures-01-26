export const validaCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  let remainder;
  let i;
  for (i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  return true;
};

export const validaCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight--;
    if (weight < 2) {
      weight = 9;
    }
  }
  let verificationDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cnpj.charAt(12)) !== verificationDigit) return false;

  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight--;
    if (weight < 2) {
      weight = 9;
    }
  }
  verificationDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cnpj.charAt(13)) !== verificationDigit) return false;
  return true;
};

export const validaDoc = (doc) => {
  if (!validaCPF(doc)) return 'CPF inválido';
};

export const validaNome = (nome) => {
  // Remove todos os caracteres que não são letras, números, espaços ou apóstrofos
  const nomeLimpo = nome.replace(/[^A-Za-z0-9\s']/g, '');

  if (nomeLimpo.length <= 6) {
    return 'Insira o nome completo';
  }
  // Verifica se o nome contém apenas números
  if (/^\d+$/.test(nomeLimpo)) {
    return 'Nome inválido';
  }
};

export const validaTelefone = (telefone) => {
  const phone = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  // Verifica se o número de telefone tem 10 ou 11 dígitos
  if (phone.length !== 10 && phone.length !== 11) {
    return 'Telefone Invalido';
  }

  const ddd = phone.substring(0, 2);
  const dddsValidos = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '21',
    '22',
    '24',
    '27',
    '28',
    '31',
    '32',
    '33',
    '34',
    '35',
    '37',
    '38',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '51',
    '53',
    '54',
    '55',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '71',
    '73',
    '74',
    '75',
    '77',
    '79',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '91',
    '92',
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99',
  ];

  // Verifica se o DDD é válido
  if (!dddsValidos.includes(ddd)) {
    return 'Telefone Invalido';
  }

  let começoTelefone, finalTelefone;
  if (phone.length === 11) {
    começoTelefone = phone.substring(2, 7);
    finalTelefone = phone.substring(7, 11);
  } else {
    começoTelefone = phone.substring(2, 6);
    finalTelefone = phone.substring(6, 10);
  }

  // Verifica se o começo do número tem 4 ou 5 dígitos e o final tem 4 dígitos
  if (
    (começoTelefone.length !== 4 && começoTelefone.length !== 5) ||
    finalTelefone.length !== 4
  ) {
    return 'Telefone Invalido';
  }

  // Se passou por todas as verificações, o número é considerado válido
  return true;
};

export const validaDataNascimento = (dataNascimento) => {
  // Verifica se a data está no formato "dd/mm/aaaa"
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dataNascimento)) {
    return 'Data Inválida';
  }

  // Extrai dia, mês e ano
  const partesData = dataNascimento.split('/');
  const dia = parseInt(partesData[0], 10);
  const mes = parseInt(partesData[1], 10) - 1; // Os meses em JavaScript são indexados em 0
  const ano = parseInt(partesData[2], 10);

  // Cria um objeto Date com a data de nascimento
  const dataNasc = new Date(ano, mes, dia);

  // Verifica se a data de nascimento é válida
  if (
    dataNasc.getFullYear() !== ano ||
    dataNasc.getMonth() !== mes ||
    dataNasc.getDate() !== dia
  ) {
    return 'Data Inválida';
  }

  // Calcula a idade do usuário
  const hoje = new Date();
  const idade =
    hoje.getFullYear() -
    ano -
    (hoje.getMonth() < mes || (hoje.getMonth() === mes && hoje.getDate() < dia)
      ? 1
      : 0);

  // Verifica se a idade é maior ou igual a 18 anos

  if (idade >= 120 || idade < 0) {
    return 'Data Inválida';
  }
  if (idade >= 16) {
    return true;
  } else {
    return 'Menores de 16 não podem participar da promoção';
  }
};

export const validaSenha = (password) => {
  const maiorIgualOitoCaracteres = password.length >= 8;
  const letraMaiuscula = /[A-Z]/.test(password);
  const letraMinuscula = /[a-z]/.test(password);
  const conterNumero = /[0-9]/.test(password);

  if (
    !maiorIgualOitoCaracteres ||
    !letraMaiuscula ||
    !letraMinuscula ||
    !conterNumero
  ) {
    return 'Senha incorreta';
  }
};
