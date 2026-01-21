<?php


require_once("src/services/game.php");


function readGameController($request)
{
  ["payload" => $payload] = $request;

  send_response(readGameService($payload->idcliente), 200);
}


function createGameController($request)
{
  ["payload" => $payload] = $request;

  send_response(createGameService($payload->idcliente), 201);
}
