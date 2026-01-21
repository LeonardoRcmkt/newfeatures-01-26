<?php

require_once("src/services/copercana.php");

function readAllUsersCopercanaController($request)
{
    ["query" => $query] = $request;
    send_response(readAllUsersCopercanaService($query["page"]), 200);
}

function createUserCopercanaController($request)
{
    ["body" => $body] = $request;

    $body = adapter($body["dados_cliente"]);

    $error = requestValidate($body, ["numero_documento", "nome", "dt_nascimento", "email", "sexo", "cependereco", "uf", "cidade", "bairro", "endereco", "numero_endereco", "leu_aceitou_regulamento", "politica_privacidade"]);
    if ($error) send_response($error, 400);

    send_response(createUserCopercanaService(format($body)), 201);
}
