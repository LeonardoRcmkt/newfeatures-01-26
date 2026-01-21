export const documento = (value) => {
  value = value.substring(0);
  // mascara quando for um CNPJ
  // if (value.length > 14) {
  //   value = value.substr(0, 18);
  //   value = value.replace(/\D/g, '');
  //   value = value.replace(/(\d{2})(\d)/, '$1.$2');
  //   value = value.replace(/(\d{3})(\d)/, '$1.$2');
  //   value = value.replace(/(\d{3})(\d{4})/, '$1/$2');
  //   value = value.replace(/(\d{4})(\d)/, '$1-$2');

  //   return value;
  // } else {
  // mascara quando for um CPF
  value = value.substr(0, 14);
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return value;
  // }
};

export const documentoEntrar = documento;

export const telefone = (phone) => {
  const regex = /[^\d]+/g;
  const phoneNumber = phone.replace(regex, '');

  // Verifica o comprimento do número de telefone
  if (phoneNumber.length >= 11) {
    // Se o número tiver pelo menos 11 dígitos, considera-se um número de celular
    return phoneNumber.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (phoneNumber.length >= 10) {
    // Se o número tiver pelo menos 10 dígitos, considera-se um número de telefone fixo
    return phoneNumber.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
  } else {
    // Caso contrário, retorna o número de telefone original sem formatação
    return phoneNumber;
  }
};

export const nascimento = (date) => {
  if (date.length <= 10) {
    let formattedDate = date.replace(/\D/g, '');
    formattedDate = formattedDate.replace(/(\d{2})(\d)/, '$1/$2');
    formattedDate = formattedDate.replace(/(\d{2})(\d)/, '$1/$2');
    return formattedDate;
  }
};

export const cep = (cep) => {
  if (cep.length <= 9) {
    let formattedCep = cep.replace(/\D/g, '');
    formattedCep = formattedCep.replace(/(\d{5})(\d)/, '$1-$2');
    return formattedCep;
  }
};

export const chaveAcesso = (chaveAcesso) => {
  const regex = /[A-Za-z]+/g;
  chaveAcesso = chaveAcesso.replace(regex, '');

  chaveAcesso = chaveAcesso.substr(0, 54);
  chaveAcesso = chaveAcesso.replace(/\D/g, '');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');
  chaveAcesso = chaveAcesso.replace(/(\d{4})(\d)/, '$1 $2');

  chaveAcesso = chaveAcesso.toUpperCase();
  return chaveAcesso;
};

export const pincode = (pincode) => {
  pincode = pincode.replace(/[^A-Za-z]/g, '');
  pincode = pincode.substr(0, 17);
  pincode = pincode.toUpperCase();

  return pincode;
};

export const numeroPedido = (numeroPedido) => {
  const regex = /[A-Za-z]+/g;
  numeroPedido = numeroPedido.replace(regex, '');

  numeroPedido = numeroPedido.substr(0, 15);
  numeroPedido = numeroPedido.replace(/\D/g, '');

  numeroPedido = numeroPedido.toUpperCase();
  return numeroPedido;
};

export const email = (email) => {
  return email.replace(/\s/g, "");
}