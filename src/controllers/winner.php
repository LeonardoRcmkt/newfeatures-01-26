<?php


require_once("src/services/winner.php");


function readWinnerController() { send_response(readWinnerService(), 200); }

function readInstantWinnerController() { send_response(readInstantWinnerService(), 200); }

function readAwardController($request)
{ 
    ["payload" => $payload] = $request;
    send_response(readAwardService($payload->idcliente), 200);
}
