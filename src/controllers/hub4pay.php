<?php

require_once("src/services/hub4pay.php");

function hub4PayController($request) {
    ["body" => $body] = $request;
    $value = $body['valor'];
    $id_premio = $body['id_premio'];
    send_response(createTransferencia($body, $id_premio, $value), 200);
} 