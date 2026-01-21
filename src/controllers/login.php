<?php


require_once("src/services/login.php");


function readLoginController($request)
{
  ["query" => $query] = $request;

  $error = requestValidate($query, ["numero_documento"]);
  if ($error) send_response($error, 400);

  send_response(readLoginService(format($query)), 200);
}


function loginController($request)
{
  ["body" => $body] = $request;

  $error = requestValidate($body, ["numero_documento", "senha_acesso"]);
  if ($error) send_response($error, 400);

  send_response(loginService($body), 200);
}
