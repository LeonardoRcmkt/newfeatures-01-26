<?php

require_once("src/models/modelConfig.php");


function readBranchesService()
{
  $branches = readBranchesModel();

  $output = [];

  foreach ($branches as $item) {
    $branch = $item['rede'];

    if (!isset($output[$branch])) {
      $output[$branch] = [
        "branch" => $branch,
        "units" => []
      ];
    }

    $output[$branch]['units'][] = [
      "idfilial" => $item['idfilial'],
      "endereco" => $item['endereco'],
      "numero" => $item['numero'],
      "complemento" => $item['complemento'],
      "bairro" => $item['bairro'],
      "cidade" => $item['cidade'],
      "uf" => $item['uf'],
      "cep" => $item['cep'],
      "cnpj" => $item['cnpj_filial']
    ];
  }

  $response = ["branches" => array_values($output)];

  return $response;
}

function readFaqService()
{
  return readFaqModel();
}

function readCampaignService()
{
  return readCampaignModel();
}

function preRegisterPerson($clientData, $balanceData)
{
  $url = "https://api-cartoes-dev.hubpontos.com.br/api/external/person/pre-registration"; // Endpoint fornecido
  $apiKey = $_ENV["HUBTOPAY_API_KEY"]; // Chave de API fornecida

  // Construindo o payload
  $payload = [
    "firstName" => $clientData["nome"],
    "lastName" => $clientData["nome"],
    "email" => $clientData["email"],
    "document" => ltrim($clientData["numero_documento"], '0'), // CPF
    "birthdate" => $clientData["dt_nascimento"], // Data de nascimento
    "phone" => $clientData["telefone"],
    "address" => [
      "street" => remove_accent_from_word($clientData["endereco"]),
      "number" => remove_accent_from_word($clientData["numero_endereco"]),
      "complement" => remove_accent_from_word($clientData["complemento"]) ?? "",
      "neighborhood" => remove_accent_from_word($clientData["bairro"]),
      "postalCode" => remove_accent_from_word($clientData["cependereco"]),
      "city" => clean_object_string($clientData["cidade"]), // Limpeza adicional para `city`
      "state" => $clientData["uf"],
      "country" => "BR"
    ],
    "balance" => [
      "balanceTypeId" => $_ENV["HUBTOPAY_BALANCE_TYPE_ID"],
      "amount" => (float)$balanceData // Garantir que é um número
    ]
  ];

  // Configuração do cURL
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Accept: application/json",
    "x-api-key: " . $apiKey
  ]);

  // Executar a chamada e obter a resposta
  $response = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  return [
    "http_code" => $httpCode,
    "response" => json_decode($response, true)
  ];
}
