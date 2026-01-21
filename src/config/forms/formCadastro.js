export const form = [
  {
    name: 'documento',
    type: 'text',
    label: 'CPF',
    disabled: true,
    columns: {
      xs: 12,
      md: 6,
    },
  },
  {
    name: 'nome',
    type: 'text',
    label: 'Nome Completo',
    columns: {
      xs: 12,
      md: 6,
    },
  },
  {
    name: 'nascimento',
    type: 'text',
    label: 'Data de Nascimento',
    columns: {
      xs: 12,
      md: 6,
    },
  },
  {
    name: 'genero',
    type: 'select',
    label: 'Gênero',
    defaultOption: 'Selecione seu Gênero',
    options: [
      {
        text: 'Masculino',
        value: 'M',
      },
      {
        text: 'Feminino',
        value: 'F',
      },
      {
        text: 'Outros',
        value: 'O',
      },
    ],
    columns: {
      xs: 12,
      md: 6,
    },
  },
  {
    name: 'cep',
    type: 'text',
    label: 'CEP',
    columns: {
      xs: 12,
      md: 4,
    },
  },

  {
    name: 'endereco',
    type: 'text',
    label: 'Endereço',
    columns: {
      xs: 12,
      md: 8,
    },
  },
  {
    name: 'bairro',
    type: 'text',
    label: 'Bairro',
    columns: {
      xs: 12,
      md: 6,
    },
  },
  {
    name: 'numero',
    type: 'text',
    label: 'Número',
    columns: {
      xs: 6,
      md: 3,
    },
  },
  {
    name: 'complemento',
    type: 'text',
    label: 'Complemento',
    columns: {
      xs: 6,
      md: 3,
    },
  },
  {
    name: 'uf',
    type: 'select',
    label: 'Estado',
    defaultOption: 'Selecione seu Estado',
    options: [
      {
        text: 'AC',
        value: 'AC',
      },
      {
        text: 'AL',
        value: 'AL',
      },
      {
        text: 'AP',
        value: 'AP',
      },
      {
        text: 'AM',
        value: 'AM',
      },
      {
        text: 'BA',
        value: 'BA',
      },
      {
        text: 'CE',
        value: 'CE',
      },
      {
        text: 'DF',
        value: 'DF',
      },
      {
        text: 'ES',
        value: 'ES',
      },
      {
        text: 'GO',
        value: 'GO',
      },
      {
        text: 'MA',
        value: 'MA',
      },
      {
        text: 'MT',
        value: 'MT',
      },
      {
        text: 'MS',
        value: 'MS',
      },
      {
        text: 'MG',
        value: 'MG',
      },
      {
        text: 'PA',
        value: 'PA',
      },
      {
        text: 'PB',
        value: 'PB',
      },
      {
        text: 'PR',
        value: 'PR',
      },
      {
        text: 'PE',
        value: 'PE',
      },
      {
        text: 'PI',
        value: 'PI',
      },
      {
        text: 'RJ',
        value: 'RJ',
      },
      {
        text: 'RN',
        value: 'RN',
      },
      {
        text: 'RS',
        value: 'RS',
      },
      {
        text: 'RO',
        value: 'RO',
      },
      {
        text: 'RR',
        value: 'RR',
      },
      {
        text: 'SC',
        value: 'SC',
      },
      {
        text: 'SP',
        value: 'SP',
      },
      {
        text: 'SE',
        value: 'SE',
      },
      {
        text: 'TO',
        value: 'TO',
      },
    ],
    columns: {
      xs: 6,
      md: 3,
    },
  },
  {
    name: 'cidade',
    type: 'text',
    label: 'Cidade',
    columns: {
      xs: 6,
      md: 9,
    },
  },
  {
    name: 'telefone',
    type: 'text',
    label: 'Telefone',
    columns: {
      xs: 12,
      md: 12,
    },
  },
  {
    name: 'email',
    type: 'text',
    label: 'E-mail',
    columns: {
      xs: 12,
      md: 6,
    },
  },
  {
    name: 'confirmarEmail',
    type: 'text',
    label: 'Confirmar Email',
    columns: {
      xs: 12,
      md: 6,
    },
  },

  {
    name: 'senha',
    type: 'password',
    label: 'Senha',
    columns: {
      xs: 12,
      md: 6,
    },
  },
  {
    name: 'confirmarSenha',
    type: 'password',
    label: 'Confirmar Senha',
    columns: {
      xs: 12,
      md: 6,
    },
  },
  {
    name: 'regulamento',
    type: 'checkbox',
    label: 'Li e aceito o ',
  },
  {
    name: 'politica',
    type: 'checkbox',
    label: 'Li e aceito a ',
  },
  {
    name: 'mailing',
    type: 'checkbox',
    label:
      'Aceito receber mensagens e promoções através de e-mail, SMS e WhatsApp.',
  },
];
