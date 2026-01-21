<?php

function readSaldoCampanha()
{
    $baseUrl = $_ENV["HUB4PAY_BASE_URL"];

    $url = $baseUrl . "/company";

    $response = apiHub4PayCall($url, []);

    $saldo_campanha = $response["balance"]["value"] / 100;

    // createLogHub4PayModel("Lendo saldo da campanha", $saldo_campanha, $response, null);

    return $saldo_campanha;
}

function readUserByDocument($cpf)
{
    $baseUrl = $_ENV["HUB4PAY_BASE_URL"];

    $cpf = preg_replace('/\D/', '', $cpf); // só números

    if (strlen($cpf) === 14 && str_starts_with($cpf, '000')) {
        $cpf = substr($cpf, 3);
    }

    $url = $baseUrl . "/person?document=" . $cpf;

    $response = apiHub4PayCall($url, []);

    $saldo_campanha = readSaldoCampanha();

    createLogHub4PayModel("Buscando usuário por cpf", $saldo_campanha, $response, $cpf);

    return $response["data"][0]["id"] ?? null;
}

// function readUserCardVirtual($personId)
// {
//     $baseUrl = $_ENV["HUB4PAY_BASE_URL"];

//     $url = $baseUrl . "/card/virtual?personId=" . $personId;

//     $response = apiHub4PayCall($url, []);

//     $saldo_campanha = readSaldoCampanha();

//     createLogHub4PayModel("Buscando cartão virtual do usuário", $saldo_campanha, $personId, $response);

//     return $response["data"][0]["id"] ?? null;
// }

function createTransferencia($payload, $id_premio, $value)
{
    createLogHub4PayModel("Inicio processo transferência", null);

    $baseUrl = $_ENV["HUB4PAY_BASE_URL"];

    $user = readUserByDocument($payload['numero_documento']);
    if(!$user) {
        $user = registerPerson($payload, $value);
        return $user;
    }

    $url = $baseUrl . "/transfer/balance";

    $transferPayload = [
        "customerId"     => $user,
        "balanceTypeId"  => $_ENV["HUB4PAY_BALANCE_TYPE_ID"],
        "description"    => "Prêmio R$" . ($value/100) . " - Promoção Marcas Campeãs",
        "campaignId"     => $_ENV["HUB4PAY_COMPANY_ID"],
        "amount"         => $value,
    ];

    $response = apiHub4PayCall($url, $transferPayload);

    $saldo_campanha = (readSaldoCampanha() - $transferPayload['amount']);

    createLogHub4PayModel("Realizando transferência para o usuário", $saldo_campanha, $response, $user);

    createRegistroTransferenciaModel(
        $payload['tipo'],
        'Prêmio R$' . ($value/100), 
        $payload['numero_documento'], 
        $transferPayload['customerId'], 
        ($transferPayload['amount']/100), 
        $id_premio, 
        $response, 
        $response['status'] ?? null);

    return $response;
}

function registerPerson($payload, $value)
{
    try {
        $baseUrl        = $_ENV["HUB4PAY_BASE_URL"];
        $balanceTypeId  = $_ENV["HUB4PAY_BALANCE_TYPE_ID"];

        $url = $baseUrl . "/person";


        $dadosCreateUser = [
            "firstName" => $payload["nome"],
            // "lastName" => $clientData["nome"] ?? '',
            "email" => $payload["email"],
            "document" => formatCpf($payload["numero_documento"]),
            "balance" => [
                "balanceTypeId" => $balanceTypeId,
                "amount" => $value,
            ],
        ];

        $response = apiHub4PayCall($url, $dadosCreateUser);

        $saldo_campanha = readSaldoCampanha();

        createLogHub4PayModel('Registrando pessoa e enviando saldo', $saldo_campanha, $response, $dadosCreateUser);

        createRegistroTransferenciaModel(
        $payload['tipo'],
        'Prêmio R$' . ($value/100), 
        $payload['numero_documento'], 
        $response['id'], 
        ($value/100), 
        $payload['id_premio'],
        $response, 
        $response['status'] ?? null);

        return $response;
    } catch (Exception $e) {
        createLogHub4PayModel('Erro ao registrar pessoa', 0, $e->getMessage(), $payload["numero_documento"]);
        throw new Exception("Erro ao registrar pessoa: " . $e->getMessage());
    }
}

function apiHub4PayCall(string $url, array $payload): array
{
    $apiKey = $_ENV["HUB4PAY_API_KEY"];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5); // Timeout de 5 segundos
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "x-api-key: " . $apiKey,
        "Content-Type: application/json",
        "Accept: application/json"
    ]);

    if (!empty($payload)) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        throw new Exception("Erro na requisição CURL: " . $curlError);
    }
    $responseData = json_decode($response, true);

    if (!is_array($responseData)) {
        throw new Exception("Resposta inválida da API: " . $response);
    } elseif ($httpCode < 200 || $httpCode >= 300) {
        $errorMessage = $responseData['message'] ?? 'Erro desconhecido';
        throw new Exception("Erro na API Hub4Pay: " . $errorMessage);
    }
    
    return $responseData;
}
