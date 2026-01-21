<?php


function format($data, $passwordHash = true)
{ // Formata os campos recebidos para inserção no banco de dados,  
  foreach ($data as $key => $value) { // No caso de campos relacionados a senha, o valor é "hasheado" sem formatação 
    if ($key == "password" || $key == "senha_acesso" || $key == "nova_senha_acesso") {
      if ($passwordHash) $data[$key] = password_hash($data[$key], PASSWORD_DEFAULT, ['cost' => 12]);
      continue;
    }

    // Demais campos passam por trim e capitalização
    $data[$key] = trim(strtoupper($value));

    // Formatação de campos relacionados a datas
    if (in_array($key, ["dt_nascimento", "birth"]))
      $data[$key] = date_format(new DateTime($data[$key]), "Y-m-d");

    // Formatação de campos que precisam ser unicamente numéricos
    if (in_array($key, ["document", "phone", "cep", "numero_documento", "cependereco", "telefone", "whatsapp", "codigo", "cpf_responsavel"]))
      $data[$key] = preg_replace('/[^0-9]/', '', $data[$key]);
  }

  return $data;
}


function formatCoupon($coupon)
{ // função para formatação e extração de dados via código de cupom fiscal
  $estados = [
    '11' => 'RO',
    '12' => 'AC',
    '13' => 'AM',
    '14' => 'RR',
    '15' => 'PA',
    '16' => 'AP',
    '17' => 'TO',
    '21' => 'MA',
    '22' => 'PI',
    '23' => 'CE',
    '24' => 'RN',
    '25' => 'PB',
    '26' => 'PE',
    '27' => 'AL',
    '28' => 'SE',
    '29' => 'BA',
    '31' => 'MG',
    '32' => 'ES',
    '33' => 'RJ',
    '35' => 'SP',
    '41' => 'PR',
    '42' => 'SC',
    '43' => 'RS',
    '50' => 'MS',
    '51' => 'MT',
    '52' => 'GO',
    '53' => 'DF'
  ];

  return [
    "codigo_nota" => $coupon,
    "codigo_estado" => substr($coupon, 0, 2),
    "ano_emissao" => "20" . substr($coupon, 2, 2),
    "mes_emissao" => substr($coupon, 4, 2),
    "cnpj" => substr($coupon, 6, 14),
    "modelo_nfe" => substr($coupon, 20, 2),
    "serie_nfe" => substr($coupon, 22, 3),
    "numero_nota" => substr($coupon, 25, 9),
    "tipo_emissao" => substr($coupon, 34, 1),
    "codigo_chave" => substr($coupon, 35, 8),
    "verificador_chave" => substr($coupon, 43, 1),
    "uf_estado" => isset($estados[substr($coupon, 0, 2)]) ? $estados[substr($coupon, 0, 2)] : null,
  ];
}

function adapter($object)
{
  $newObject = [];
  $noarray = false;
  while (!$noarray) {
    $noarray = true;
    foreach ($object as $key => $value) {
      if (is_array($value)) {
        $noarray = false;
        foreach ($value as $attr => $val) {
          $object = [...$object, "$key.$attr" => $val];
        }
        unset($object[$key]);
        continue;
      }
    }
  }

  foreach ($object as $key => $value) {
    switch ($key) {
      case 'cpf':
      case 'document_no':
        $newObject = [...$newObject, 'numero_documento' => $value];
        break;

      case 'nome_completo':
      case 'name':
        $newObject = [...$newObject, 'nome' => $value];
        break;

      case 'data_nascimento':
      case 'birth_date':
        $newObject = [...$newObject, 'dt_nascimento' => $value];
        break;

      case 'email':
        $newObject = [...$newObject, 'email' => $value];
        break;

      case 'phone':
        $newObject = [...$newObject, 'whatsapp' => $value];
        break;

      case 'genero':
      case 'gender':
        $newObject = [...$newObject, 'sexo' => $value];
        break;

      case 'cep':
      case 'address.postal_code':
        $newObject = [...$newObject, 'cependereco' => $value];
        break;

      case 'address.federative_unit':
        $newObject = [...$newObject, 'uf' => $value];
        break;

      case 'address.city':
        $newObject = [...$newObject, 'cidade' => $value];
        break;

      case 'address.neighborhood':
        $newObject = [...$newObject, 'bairro' => $value];
        break;

      case 'rua':
      case 'address.street':
        $newObject = [...$newObject, 'endereco' => $value];
        break;

      case 'numero':
      case 'address.number':
        $newObject = [...$newObject, 'numero_endereco' => $value];
        break;

      case 'address.complement':
      case 'ponto_referencia':
        $newObject = [...$newObject, 'complemento' => $value];
        break;

      case 'aceite_regulamento':
      case 'aceite_rctrade':
      case 'responsibility_term_accepted':
        $newObject = [...$newObject, 'leu_aceitou_regulamento' => $value];
        break;

      case 'aceite_privacidade':
      case 'promotion_term_accepted':
        $newObject = [...$newObject, 'politica_privacidade' => $value];
        break;

      case 'communication_accepted':
        $newObject = [...$newObject, 'receberMensagens' => $value];
        break;

      default:
        $newObject = [...$newObject, $key => $value];
        # code...
        break;
    }
  }

  return $newObject;
}

function converterDataCML($data, $hora, $min)
{
  // Array para mapear os meses abreviados em inglês para números
  $meses = [
    'JAN' => '01',
    'FEB' => '02',
    'MAR' => '03',
    'APR' => '04',
    'MAY' => '05',
    'JUN' => '06',
    'JUL' => '07',
    'AUG' => '08',
    'SEP' => '09',
    'OCT' => '10',
    'NOV' => '11',
    'DEC' => '12'
  ];

  // Dividir a data fornecida no formato `01-AUG-24` em partes
  list($dia, $mesAbreviado, $ano) = explode('-', $data);

  // Verificar se o ano é de dois dígitos e converter para quatro dígitos
  if (strlen($ano) == 2) {
    $ano = '20' . $ano;
  }

  // Obter o número do mês a partir do mês abreviado
  $mes = isset($meses[$mesAbreviado]) ? $meses[$mesAbreviado] : '01';

  // Formatar a data no formato `YYYY-MM-DD HH:MM:SS`
  $dataFormatada = $ano . '-' . $mes . '-' . $dia . ' 00:00:00';
  $dataFormatada = "$ano-$mes-$dia $hora:$min:00";

  return $dataFormatada;
}

function formatCpf($cpf)
{
    $cpf = preg_replace('/\D/', '', $cpf); // só números

    if (strlen($cpf) === 14 && str_starts_with($cpf, '000')) {
        $cpf = substr($cpf, 3);
    }

    // Garante que tem 11 dígitos
    if (strlen($cpf) !== 11) {
        return null;
    }

    return substr($cpf, 0, 3) . '.' .
           substr($cpf, 3, 3) . '.' .
           substr($cpf, 6, 3) . '-' .
           substr($cpf, 9, 2);
}
