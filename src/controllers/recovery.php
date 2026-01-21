<?php


require_once("src/services/recovery.php");


function recoveryEmailController($request)
{
  ["body" => $body] = $request;
  
  $error = requestValidate($body, ["numero_documento"]);
  if($error) send_response($error, 400);
  
  send_response(recoveryEmailService(format($body)), 201);
}


function recoveryPinController($request)
{
  ["body" => $body] = $request;

  $error = requestValidate($body, ["pin", "senha_acesso"]);
  if($error) send_response($error, 400);

  send_response(recoveryPinService(format($body)), 200);
}
