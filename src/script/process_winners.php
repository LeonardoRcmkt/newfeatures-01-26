<?php

require_once("db_config.php");

function remove_accent_from_word($word)
{
    // Verifica se $word é uma string válida
    if (!is_string($word)) {
        return ''; // Retorna uma string vazia ou outro valor padrão
    }

    $word = preg_replace('/[áàãâä]/ui', 'a', $word);
    $word = preg_replace('/[éèêë]/ui', 'e', $word);
    $word = preg_replace('/[íìîï]/ui', 'i', $word);
    $word = preg_replace('/[óòõôö]/ui', 'o', $word);
    $word = preg_replace('/[úùûü]/ui', 'u', $word);
    $word = preg_replace('/[ç]/ui', 'c', $word);
    return $word;
}

function clean_object_string($city)
{
    if (!is_string($city)) {
        return ''; // Retorna vazio caso o valor não seja uma string
    }
    return preg_replace('/[^a-zA-Z0-9 ]/', '', $city); // Remove tudo que não seja letra, número ou espaço
}

// Funções
function getWinnersToReceive()
{
    $query = $GLOBALS["db"]()->prepare("SELECT 
        h.id_premio_instantaneo, 
        h.id_cliente, 
        h.desc_premio
    FROM 
        horarios_premios_instantaneos h 
    WHERE 
        h.premio_enviado = 0 AND
        h.premio_utilizado = 1;");

    $query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function getClientData($userId)
{
    $query = $GLOBALS["db"]()->prepare("SELECT 
        c.nome,
        c.email,
        c.numero_documento,
        c.dt_nascimento,
        c.telefone,
        c.endereco,
        c.numero_endereco,
        c.complemento,
        c.bairro,
        c.cependereco,
        c.cidade,
        c.uf
    FROM clientes c
    WHERE c.idcliente = :user_id;");

    $query->bindParam(":user_id", $userId, PDO::PARAM_INT);
    $query->execute();
    return $query->fetch(PDO::FETCH_ASSOC);
}

function updateParticipationStatus($premio_instantaneo)
{
    $query = $GLOBALS["db"]()->prepare("UPDATE 
        horarios_premios_instantaneos
    SET 
        premio_enviado = 1
    WHERE 
        id_premio_instantaneo = :premio_instantaneo;");

    $query->bindParam(":premio_instantaneo", $premio_instantaneo, PDO::PARAM_INT);
    $query->execute();
    return $query->rowCount();
}

function findUserByCpfForIntegration($cpf)
{
    $url = "https://api-cartoes-dev.hubpontos.com.br/api/external/person?document=" . $cpf; // Endpoint fornecido
    $apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ZjM3MTEzMy02MjllLTQzYjMtOTM5NS0xMmU2YzI3MDQyZGEiLCJjb21wYW55SWQiOiJjNWVhZGNkMy05ZWNjLTQ1MDEtOGYz";

    // Configuração do cURL para config de request GET
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . $apiKey
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

function preRegisterPerson($clientData, $balanceData)
{
    $url = "https://api-cartoes-dev.hubpontos.com.br/api/external/person/pre-registration"; // Endpoint fornecido
    $apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ZjM3MTEzMy02MjllLTQzYjMtOTM5NS0xMmU2YzI3MDQyZGEiLCJjb21wYW55SWQiOiJjNWVhZGNkMy05ZWNjLTQ1MDEtOGYzZC0wMDAxNTBjZGQ2YjIiLCJpYXQiOjE3MzY4NjAwODh9.83J4sid-ZPHbQEYckUhG1Gy41m7iVH-WfO-4Ys2HWW0"; // Chave de API fornecida

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
            "balanceTypeId" => "4be89fa4-24fd-4fbe-8032-9627e003dccb",
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

function integrateWithHubtopay($clientData, $prizeDescription)
{
    // Validar se o usuario tem um cadastro
    $response = findUserByCpfForIntegration($clientData["numero_documento"]);

    if (empty($response['data'])) {
        // Chamada ao endpoint para o pré-registro da pessoa
        $result = preRegisterPerson($clientData, $prizeDescription);

        // Verificando o resultado
        if ($result["http_code"] === 200) {
            return [
                "success" => true,
                "message" => "Pre-registration successful",
                "data" => $result["response"]
            ];
        }
    } else {
        $userData = $response['data'][0];
        
        // insertBalance($userData);
    }

    // Caso ocorra erro na integração
    return [
        "success" => false,
        "message" => "Error during pre-registration: " . json_encode($result["response"]),
        "http_code" => $result["http_code"]
    ];
}

function logIntegrationResult($id_premio_instantaneo, $result)
{

    $message = json_encode($result["message"]);

    $query = $GLOBALS["db"]()->prepare("
        INSERT INTO integration_logs (id_premio_instantaneo, success, response)
        VALUES (:id_premio_instantaneo, :success, :response)
    ;");

    $query->bindParam(":id_premio_instantaneo", $id_premio_instantaneo, PDO::PARAM_INT);
    $query->bindParam(":success", $result["success"], PDO::PARAM_BOOL);
    $query->bindParam(":response", $message, PDO::PARAM_STR);

    $query->execute();
}

function processWinner($winner)
{
    try {
        echo "\nIniciando processamento para o cliente ID: " . $winner['id_cliente'];

        // Obtendo dados do cliente
        $clientData = getClientData($winner['id_cliente']);
        if (!$clientData) {
            throw new Exception("Dados do cliente não encontrados para o ID: " . $winner['id_cliente']);
        }

        echo "\nDados do winner encontrados: " . $winner;

        // Simulação do valor a ser integrado
        $balanceData = $winner['desc_premio'];

        // Integração com Hubtopay
        echo "\nIntegrando com Hubtopay para o cliente: " . $clientData['nome'];
        $integrationResult = integrateWithHubtopay($clientData, $balanceData);

        if (!$integrationResult['success']) {
            throw new Exception("Falha na integração com Hubtopay: " . $integrationResult['message']);
        }

        echo "\nIntegração realizada com sucesso para o cliente: " . $clientData['nome'];

        // Atualizando status do prêmio
        $updateStatus = updateParticipationStatus($winner['id_premio_instantaneo']);
        if ($updateStatus > 0) {
            echo "\nStatus atualizado com sucesso para o prêmio ID: " . $winner['id_premio_instantaneo'];
        } else {
            throw new Exception("Falha ao atualizar status do prêmio ID: " . $winner['id_premio_instantaneo']);
        }
    } catch (Exception $e) {
        echo "\nErro: " . $e->getMessage();
    }
}

// Processo principal
function processAllWinners()
{
    $winners = getWinnersToReceive();

    if (empty($winners)) {
        echo "\nNenhum vencedor pendente para processamento.";
        return;
    }

    echo "\nIniciando o processamento de " . count($winners) . " vencedores.";

    foreach ($winners as $winner) {
        processWinner($winner);
    }

    echo "\nProcessamento concluído.";
}

// Execução do script
processAllWinners();
