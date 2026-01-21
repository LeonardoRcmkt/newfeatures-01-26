<?php


function requestValidate($fields, $expectedFields = [])
{ // Valida se todos os campos esperados estão presentes, além de rodar a função "validade" em casa um desses campos
  // Array $expectedFields deve conter os campos obrigatórios para a validação

  $errors = array();

  $missingFields = array_diff_key(array_flip($expectedFields), $fields);
  if ($missingFields) foreach ($missingFields as $key => $value) {
    $errors[$key] = ["$key field is required!"];
  }

  foreach ($fields as $key => $value) {
    $error = validate($key, $value);
    if ($error) $errors[$key] = $error;
  }

  return $errors;
}


function validate($key, $value)
{ /* Validações por chave/valor. Erros devem ser adicionados ao array $error. No padrão atual,
  chaves de validações semelhantes podem ser adicionadas no mesmo padrão de testes
  validações positivas devem retornar o bool true, em caso de falha, o operador lógico || adiciona ao array de erros uma mensagem personalizada */

  $error = array();

  if ($key === "document" || $key === "numero_documento" || $key === "cpf_responsavel" || $key === "CPF" || $key === "CNPJ" || $key === "cpf" || $key === "cnpj") {
    $value = preg_replace('/\D/', '', $value);

    (strlen($value) == 11 || strlen($value) == 14) ||
      array_push($error, "$key must have 11 or 14 characters!");

    if (strlen($value) == 11) validateCPF($value) ||
      array_push($error, "invalid CPF!");

    if (strlen($value) == 14) validateCNPJ($value) ||
      array_push($error, "invalid CNPJ!");
  } elseif ($key === "name" || $key === "nome" || $key === "nome_completo") {
    strlen($value) >= 3 ||
      array_push($error, "$key must have 3 characters or more!");
  } elseif ($key === "birth" || $key === "dt_nascimento" || $key === "data_nascimento") {
    strlen($value) >= 6 ||
      array_push($error, "$key must have 6 characters or more!");

    try {
      new DateTime($value);
    } catch (\Throwable $th) {
      array_push($error, "$key is not a valid date!");
    }
  } elseif ($key === "gender" || $key === "sexo" || $key === "genero") {
    strlen($value) == 1 ||
      array_push($error, "$key must have 1 character!");

    (strtoupper($value) == "M" || strtoupper($value) == "F" || strtoupper($value) == "O") ||
      array_push($error, "$key must be 'M', 'F' or 'O'!");
  } elseif ($key === "phone" || $key === "telefone" || $key === "whatsapp") {
    is_numeric($value) ||
      array_push($error, "$key must be numeric!");

    (strlen($value) >= 10 && strlen($value) <= 11) ||
      array_push($error, "$key must have 10 or 11 numbers!");

    preg_match('/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/', $value) ||
      array_push($error, "'$value' is not a valid phone!");
  } elseif ($key === "email") {
    preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/i', $value) ||
      array_push($error, "'$value' is not a valid email!");
  } elseif ($key === "codigo") {
    strlen($value) == 44  ||
      array_push($error, "A chave de acesso deve ter 44 dígitos");

    if (strlen($value) == 44) {
      $coupon = formatCoupon($value);

      couponDigitChecker(substr($value, 0, 43), 1, 9, true) == $coupon["verificador_chave"] ||
        array_push($error, "O dígito verificador da chave de acesso está incorreto");

      $coupon["uf_estado"] ||
        array_push($error, "O UF da chave de acesso está incorreto");
    }
  } elseif ($key === "cep" || $key === "cependereco") {
    preg_match('/^\d{5}-?\d{3}$/', $value) ||
      array_push($error, "'$value' is not a valid zip code!");
  } elseif ($key === "mensagem" || $key === "address" || $key === "endereco" || $key === "rua" || $key === "endereco_sede" || $key === "nome_fantasia" || $key === "razao_social") {
    strlen($value) >= 3 || array_push($error, "$key must have 3 characters or more!");
  } elseif ($key === "number" || $key === "numero_endereco" || $key === "numero") {
    strlen($value) >= 1 || array_push($error, "$key must have 1 characters or more!");
  } elseif ($key === "complemento") {
    (strlen($value) >= 1 || strlen($value) == 0) || array_push($error, "$key must have 1 characters or more!");
  } elseif ($key === "bairro" || $key === "cidade" || $key === "uf") {
    strlen($value) >= 2 || array_push($error, "$key must have 2 characters or more!");
  } elseif ($key === "ponto_referencia") {
    (strlen($value) >= 2 || strlen($value) == 0) || array_push($error, "$key must have 2 characters or more!");
  } elseif ($key === "senha_acesso" || $key === "nova_senha_acesso") {
    strlen($value) >= 3 || array_push($error, "$key must have 3 characters or more!");
  } elseif ($key === "politica_privacidade" || $key === "leu_aceitou_regulamento" || $key === "aceite_regulamento" || $key === "aceite_privacidade" || $key === "aceite_rctrade") {
    is_bool($value) ||
      array_push($error, "$key must be a boolean value!");

    $value == true ||
      array_push($error, "$key must be true to be accepted!");
  } elseif ($key === "receberMensagens") {
    is_bool($value) ||
      array_push($error, "$key must be a boolean value!");
  } elseif ($key === "linkedin" || $key === "portfolio") {
    strlen($value) >= 3 || array_push($error, "$key must have 3 characters or more!");
  } elseif ($key === "career_id") {
    strlen($value) >= 3 || array_push($error, "$key must have 3 characters or more!");
  } elseif ($key === "pin") {
    strlen($value) >= 6 || array_push($error, "$key must have 6 characters or more!");
  } else array_push($error, "$key field is not expected!");

  return $error;
}


function couponDigitChecker($dado, $numDig, $limMult, $x10)
{ // Valida digito de cupom fiscal
  if (!$x10) $numDig = 1;
  for ($n = 0; $n < $numDig; $n++) {
    $soma = 0;
    $mult = 2;
    for ($i = strlen($dado) - 1; $i >= 0; $i--) {
      $soma += $mult * intval($dado[$i]);
      $mult = ($mult == $limMult) ? 2 : $mult + 1;
    }
    if ($x10) $dig = ($soma * 10) % 11 % 10;
    else {
      $dig = $soma % 11;
      if ($dig == 10) $dig = "X";
    }
    $dado .= strval($dig);
  }
  return substr($dado, -$numDig);
}


function validateCPF($cpf)
{
  if (strlen($cpf) != 11) return false;
  if (preg_match('/(\d)\1{10}/', $cpf)) return false;
  for ($t = 9; $t < 11; $t++) {
    for ($d = 0, $c = 0; $c < $t; $c++) {
      $d += $cpf[$c] * (($t + 1) - $c);
    }
    $d = ((10 * $d) % 11) % 10;
    if ($cpf[$c] != $d) return false;
  }

  return true;
}


function validateCNPJ($cnpj)
{
  if (strlen($cnpj) != 14) return false;
  if (preg_match('/(\d)\1{13}/', $cnpj)) return false;
  $size = strlen($cnpj) - 2;
  $numbers = substr($cnpj, 0, $size);
  $digits = substr($cnpj, $size);
  $sum = 0;
  $pos = $size - 7;
  for ($i = $size; $i >= 1; $i--) {
    $sum += $numbers[$size - $i] * $pos--;
    if ($pos < 2) $pos = 9;
  }
  $result = $sum % 11 < 2 ? 0 : 11 - $sum % 11;
  if ($result != $digits[0]) return false;
  $size += 1;
  $numbers = substr($cnpj, 0, $size);
  $sum = 0;
  $pos = $size - 7;
  for ($i = $size; $i >= 1; $i--) {
    $sum += $numbers[$size - $i] * $pos--;
    if ($pos < 2) $pos = 9;
  }
  $result = $sum % 11 < 2 ? 0 : 11 - $sum % 11;
  if ($result != $digits[1]) return false;

  return true;
}


function getHeader($header)
{
    if (isset(getallheaders()[strtolower($header)])) return getallheaders()[strtolower($header)];
    elseif (isset(getallheaders()[ucfirst($header)])) return getallheaders()[ucfirst($header)];
}


function getToken()
{
    if (isset(getallheaders()['authorization'])) return getallheaders()['authorization'];
    elseif (isset(getallheaders()['Authorization'])) return getallheaders()['Authorization'];

    // if (isset($_SERVER['HTTP_AUTHORIZATION'])) return $_SERVER['HTTP_AUTHORIZATION'];
}

// CRIANDO UMA FUNÇÃO PARA GERAR UMA RANDOM STRING
function generateRandomString($length = 12)
{
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}

