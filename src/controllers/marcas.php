<?php

require_once("src/services/marcas.php");


function readMarcasParticipantesController($request)
{
    ["query" => $query] = $request;
    send_response(
        readMarcasParticipantesService($query['impulsionador'] ?? null),
        200
    );
}
