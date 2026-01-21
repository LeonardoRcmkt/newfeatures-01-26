<?php

require_once("src/models/modelConfig.php");


function readLoginService($query)
{
  $userExist = readUserModel($query["numero_documento"]);
  $userPreCadastro = readUserPreCadastroModel($query["numero_documento"]);

  return array(
    "cadastrado" => $userExist || false,
    "precadastrado" => $userPreCadastro ? $userPreCadastro : false,
    "funcionario" => false,
    "bloqueado" => false,
  );
}


function loginService($body)
{
  // Login Documento + Senha
  $user = readUserPWModel(preg_replace('/[^0-9]/', '', $body["numero_documento"]));
  if (!$user) return readLoginService($body);
  if (!password_verify($body["senha_acesso"], $user["senha_acesso"])) trigger_error("400: Senha Inválida");
  unset($user["senha_acesso"], $user["confirmar_senha_acesso"], $user["confirma_email"]);

  // Login com token
  // $user = readUserPWModel($body["token"]);
  // $user = [...$user, "token" => NULL];
  // updateUserModel($user['idcliente'], $user);

  return ["token" => encrypt($user)];;
}
