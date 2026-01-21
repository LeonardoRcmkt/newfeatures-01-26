<?php


function createLogModel($operation, $json = null, $result = null)
{
  $json = json_encode([
    "json" => $json,
    "ip" => $_SERVER['REMOTE_ADDR'],
    "user_agent" => $_SERVER["HTTP_USER_AGENT"]
  ]);

  $result = json_encode($result);

  $query = $GLOBALS["db"]()->prepare("
    INSERT 
    INTO tbl_aud_api (tp_operacao, json, retorno) 
    VALUES (?, ?, ?)
  ");

  $query->bindParam(1, $operation, typeBind("str"));
  $query->bindParam(2, $json, typeBind("str"));
  $query->bindParam(3, $result, typeBind("str"));

  $query->execute();

  $GLOBALS["metrics"]("createLogModel");
}

function createLogHub4PayModel($operation, $saldo_campanha, $json = null, $result = null)
{
  $json = json_encode([
    "json" => $json,
    "ip" => $_SERVER['REMOTE_ADDR'],
    "user_agent" => $_SERVER["HTTP_USER_AGENT"]
  ]);

  $result = json_encode($result);

  $query = $GLOBALS["db"]()->prepare("
    INSERT 
    INTO tbl_aud_api_hub4pay (tp_operacao, json, retorno, saldo_campanha) 
    VALUES (?, ?, ?, ?)
  ");

  $query->bindParam(1, $operation, typeBind("str"));
  $query->bindParam(2, $json, typeBind("str"));
  $query->bindParam(3, $result, typeBind("str"));
  $query->bindParam(4, $saldo_campanha, typeBind("str"));

  $query->execute();

  $GLOBALS["metrics"]("createLogModel");
}

function createRegistroTransferenciaModel($tipo, $descricao, $numero_documento, $customerId, $amount, $id_premio, $response, $status)
{
  $premio = null;

  if ($tipo === 'premio_instantaneo') {
    $premio = 'id_premio_instantaneo';
  } elseif ($tipo === 'premio_intermediario') {
    $premio = 'id_ganhador';
  }

  $query = $GLOBALS["db"]()->prepare("
    INSERT 
    INTO transferencias_hub4pay (descricao, numero_documento, customer_id, amount, $premio, response, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  ");

  $json = json_encode($response);

  $query->bindParam(1, $descricao, typeBind("str"));
  $query->bindParam(2, $numero_documento, typeBind("str"));
  $query->bindParam(3, $customerId, typeBind("str"));
  $query->bindParam(4, $amount, typeBind("str"));
  $query->bindParam(5, $id_premio, typeBind("str"));
  $query->bindParam(6, $json, typeBind("str"));
  $query->bindParam(7, $status, typeBind("str"));
  $query->execute();

  $GLOBALS["metrics"]("createRegistroTransferenciaModel");
}

function requestsTrafficLimit($ip)
{
  $path = "src/models/log/traffic.json";
  $timeLimitInSeconds = intval($_ENV["REQUEST_LIMIT_SECOND"]);
  $banTimeInseconds = intval($_ENV["REQUEST_BAN_SECOND"]);

  if (!file_exists($path)) file_put_contents($path, json_encode([]));
  $data = json_decode(file_get_contents($path), true);


  if (isset($data) && count($data) >= 1000) array_shift($data);
  if (isset($data[$ip]) && time() - $data[$ip] < $timeLimitInSeconds) sleep($banTimeInseconds);

  $data[$ip] = time();
  $json = json_encode($data);
  file_put_contents($path, $json);

  $GLOBALS["timeTrafficLimit"] = microtime(true); // métrica de performance p/ DB.
}
