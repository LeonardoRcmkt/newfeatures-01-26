<?php

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;


function encrypt($payload = [])
{ // Encripta o array passado com validade de 24 horas
  return JWT::encode(array("payload" => array(...$payload, "session" => time()), "exp" => time() + 3600 * 24), $_ENV["JWT_SECRET"], 'HS256');
}


function decrypt()
{ // Tenta realizar a descriptografia do token recebido via header, em caso de falha, retorna um array vazio 
  try {
    return JWT::decode(getallheaders()['authorization'] ?? getallheaders()['Authorization'] ?? "", new Key($_ENV["JWT_SECRET"], "HS256"))->payload;
  } catch (Exception) {
    return [];
  }
}


function isAuthorized()
{ 
  
  // Testa se o token recebido é valido, caso não, dispara um erro de acesso negado
  if (!decrypt()) trigger_error("401: Acesso negado!");
}

function isCampanhaActive()
{ // Testa se a campanha ainda está ativa

  // Obtém os dados campanha
  $campaignInfo = readCampaignModel();
  // Define data de início e fim da campanha
  $inicioCampanha = $campaignInfo["data_inicio_campanha"];
  $fimCampanha = $campaignInfo["data_fim_campanha"];

  // Obtém a data e hora atual
  $dataAtual = date('Y-m-d H:i:s');

  // Converte as datas para o formato DateTime
  $inicioCampanhaObj = new DateTime($inicioCampanha);
  $fimCampanhaObj = new DateTime($fimCampanha);
  $dataAtualObj = new DateTime($dataAtual);

  // Verifica se a data e hora atual está entre as datas de início e fim
  if (!($dataAtualObj >= $inicioCampanhaObj && $dataAtualObj <= $fimCampanhaObj)) {
    trigger_error("400: Campanha finalizada!");
  }
}

function authorizationToken()
{

    $token = getToken();

    if ($token == $_ENV["ARIUS_TOKEN"] || $token == $_ENV["PLURIX_TOKEN"]) {
        $GLOBALS["user_token"] = $token == $_ENV["ARIUS_TOKEN"] ? "ARIUS" : "PLURIX";
        return true;
    };

    // LOG pedido
    createLogModel("API Avenida - acesso negado", null, null);

    trigger_error("401: Acesso negado!!");
}

function getAuthorizationToken()
{
  if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    return trim($_SERVER['HTTP_AUTHORIZATION']);
  }

  // Algumas configurações de servidor (ex: Apache com CGI) colocam no ALL_HTTP
  if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    return trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
  }

  // Como fallback, pode tentar com getallheaders()
  if (function_exists('getallheaders')) {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
      return trim($headers['Authorization']);
    } elseif (isset($headers['authorization'])) {
      return trim($headers['authorization']);
    }
  }

  return null;
}


function verificarTokenAutorizacao(): void
{
    // 🔍 Tentativa 1: pelo $_SERVER['HTTP_AUTHORIZATION']
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $token = trim($_SERVER['HTTP_AUTHORIZATION']);
    }
    // 🔍 Tentativa 2: redirecionamento (usado em alguns servidores)
    elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $token = trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
    }
    // 🔍 Tentativa 3: pegar via getallheaders (caso anterior falhe)
    elseif (function_exists('getallheaders')) {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? $headers['authorization'] ?? null;
        $token = trim($token);
    } else {
        $token = null;
    }

    // ✅ Token válido
    if ($token && ($token === $_ENV["VMIX_TOKEN"] || $token === $_ENV["PLURIX_TOKEN"])) {
        $GLOBALS["user_token"] = $token === $_ENV["VMIX_TOKEN"] ? "VMIX" : "PLURIX";
        return; // válido → permite continuar a execução
    }

    // ❌ Token inválido ou ausente
    createLogModel("API Avenida - acesso negado", null, $token ?? 'nenhum token');
    
    // http_response_code(401);
    // echo json_encode([
    //     "status" => "erro",
    //     "mensagem" => "Acesso negado! Token ausente ou inválido."
    // ]);
    trigger_error("401: Acesso negado! Token ausente ou inválido.");

    exit; // 🔒 Interrompe a execução do script imediatamente
}