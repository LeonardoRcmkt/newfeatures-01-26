<?php

require_once("src/services/user.php");


function readUserController($request)
{
  ["query" => $query, "payload" => $payload] = $request;
 
     $authToken = getAuthorizationToken();
    if (!$authToken) {
        // createLogModelVoucher("Consultando voucher - Token de autorização ausente", $body['customer_cpf'], null, $body);
    
        // send_response("Consultando voucher - Token de autorização ausente", 400);

        http_response_code(401);
        echo json_encode([
            "status" => "erro",
            "mensagem" => "Token de autorização não enviado"
        ]);
        exit;
    }


  send_response(readUserService(isset($query["db"]), $payload), 200);
}


function createUserController($request)
{
  ["body" => $user] = $request;

  $error = requestValidate($user, ["numero_documento", "nome", "dt_nascimento", "sexo", "telefone", "email", "cependereco", "endereco", "numero_endereco", "bairro", "cidade", "uf", "senha_acesso", "politica_privacidade", "leu_aceitou_regulamento"]);
  if ($error) send_response($error, 400);

  send_response(createUserService(format($user)), 201);
}


function updateUserController($request)
{
  ["body" => $user, "payload" => $payload] = $request;

  $error = requestValidate($user);
  if ($error) send_response($error, 400);

  send_response(updateUserService($payload->idcliente, format($user)), 200);
}


function updatePasswordController($request)
{
  ["body" => $user, "payload" => $payload] = $request;

  $error = requestValidate($user, ["senha_acesso", "nova_senha_acesso"]);
  if ($error) send_response($error, 400);

  send_response(updatePasswordService($payload->idcliente, $user), 200);
}


function deleteUserController($request)
{
  ["payload" => $payload] = $request;
  send_response(deleteUserService($payload->idcliente), 200);
}
