<?php


function send_response($response = null, $status = 204, $showMetrics = false)
{
  // Condição para exibição dos resultados métricos 
  if(!$showMetrics) $showMetrics = (isset($_ENV["ENVIRONMENT"]) && $_ENV["ENVIRONMENT"] != "production") ? true : false;
  

  // Lógica para formatação dos tempos
  $timeDB = isset($GLOBALS["timeModels"]["DataBase"]) ? microtime(true) - $GLOBALS["timeModels"]["DataBase"] : 0;
  $API = (microtime(true) - $GLOBALS["timeAPI"]) - $timeDB;

  // Status de resposta
  http_response_code($status);

  // Resposta padrão para todas as requisições
  $defaultResponse = array(
    "success" => $status >= 400 ? false : true,
    "data" => $response,
  );

  // Resposta com métricas
  $timesMetrics = $showMetrics ? ["times" => array(
      "Total" => number_format(microtime(true) - $GLOBALS["timeAPI"], 6),
      "API" => number_format($API, 6),
      "TrafficLimit" => number_format($GLOBALS["timeTrafficLimit"] - $GLOBALS["timeAPI"], 6),
      ...$GLOBALS["timeModels"]
    )] : [];


    // merge de arrays de resposta
  echo json_encode([...$defaultResponse, ...$timesMetrics], JSON_UNESCAPED_UNICODE);


  die();
}
