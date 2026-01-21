<?php


require_once("src/services/sac.php");


function createSacController($request)
{ 
    ["body" => $body] = $request;

    $error = requestValidate($body, ["email", "telefone", "nome", "mensagem"]);
    if($error) send_response($error, 400);

    send_response(createSacService(format($body)), 201);
 }
