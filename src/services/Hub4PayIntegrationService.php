<?php


class Hub4PayIntegrationService
{

    private string $apiKey;
    private string $balanceTypeId;
    private string $baseUrl;
    private string $companyId;
    private string $companyBalanceId;

    public function __construct()
    {
        $this->apiKey = $_ENV["HUB4PAY_API_KEY"] ?: throw new Exception("API Key não configurada");
        $this->balanceTypeId = $_ENV["HUB4PAY_BALANCE_TYPE_ID"] ?: throw new Exception("Balance Type ID não configurado");
        $this->baseUrl = $_ENV["HUB4PAY_BASE_URL"] ?: throw new Exception("Base URL não configurada");
        $this->companyId = $_ENV["HUB4PAY_COMPANY_ID"] ?: throw new Exception("Company ID não configurado");
        $this->companyBalanceId = $_ENV["HUB4PAY_COMPANY_BALANCE_ID"] ?: throw new Exception("Company Balance ID não configurado");
    }


    public function findUserByCpfForIntegration(string $cpf): array
    {
        $url = $this->baseUrl . "/person?document=" . $cpf;
        return $this->makeApiCall($url, []);
    }

    public function transferBalance(array $transferPayload): array
    {
        $url = $this->baseUrl . "/transfer/balance";

        echo "\n 🔄 Realizando transferência de saldo na integração. Dados: ";
        echo $url . "\n";

        echo json_encode($transferPayload, JSON_PRETTY_PRINT);

        return $this->makeApiCall($url, $transferPayload);
    }

    public function preRegisterPerson($clientData, float $balanceData): array
    {

        $url = $this->baseUrl . "/person/pre-registration";

        echo "\n 🔄 Realizando pré-cadastro do cliente na integração.";
        echo $url . "\n";

        echo StringHelper::formatCPF($clientData["numero_documento"]) . "\n";

        $payload = $this->createPayload($clientData, $balanceData, $this->balanceTypeId);

        return $this->makeApiCall($url, $payload);
    }

    public function findBalanceAndCreatePayload($clientIntegration, $winner)
    {
        $clientIngrationData = json_decode(json_encode($clientIntegration), true);

        // Verifica se há saldos disponíveis
        if (empty($clientIngrationData["balanceGroup"]["balances"])) {
            throw new Exception("Usuário não possui nenhum saldo disponível para transferência.");
        }

        // Busca o saldo referente a "Marcas Campeãs"
        $balance = array_reduce($clientIngrationData["balanceGroup"]["balances"], function ($carry, $item) {
            return ($item["name"] === "Incentivo") ? $item : $carry;
        }, null);

        if (!$balance) {
            throw new Exception("Saldo referente a 'Incentivo' não encontrado para o usuário.");
        }

        // Se o saldo não for encontrado, lança uma exceção
        if (!$balance) {
            throw new Exception("Saldo referente a 'Incentivo' não encontrado para o usuário.");
        }

        // Monta o payload de transferência
        return [
            "amount" => intval($winner["desc_premio"] * 100),
            "from" => [
                "type" => "company",
                "id" => $this->companyId,
                "balanceId" => $this->companyBalanceId
            ],
            "to" => [
                "type" => "person",
                "id" => $clientIntegration["id"], // ID do usuário no Hubtopay
                "balanceId" => $balance["id"]
            ]
        ];
    }

    public function updatePreActivatedUserBalance($clientIntegration, float $balanceAmount): array
    {
        
        $url = $this->baseUrl . "/external/pre-registration/balance/" . $clientIntegration;

        echo "\n 🔄 Atualizando saldo do usuário pré-ativado. URL: " . $url . "\n";

        $payload = [
            "amount" => $balanceAmount // Convertendo para centavos, caso necessário
        ];

        return $this->makePutApiCall($url, $payload);
    }


    private function createPayload($clientData, $balanceData, $balanceTypeId)
    {
        return [
            "firstName" => $clientData["nome"],
            "lastName" => $clientData["nome"], // Se o lastName for o mesmo que o firstName
            "email" => $clientData["email"],
            "document" => StringHelper::formatCPF($clientData["numero_documento"]),
            "birthdate" => StringHelper::formatBirthdate($clientData["dt_nascimento"]),
            "phone" => StringHelper::formatPhone($clientData["telefone"]),
            "address" => [
                "street" => StringHelper::cleanObjectString(trim($clientData["endereco"])), // Certifique-se de que "endereco" é uma chave válida
                "number" => isset($clientData["numero_endereco"]) ? $clientData["numero_endereco"] : '',
                "complement" => isset($clientData["complemento"]) ? $clientData["complemento"] : "",
                "neighborhood" => StringHelper::cleanObjectString(trim($clientData["bairro"])),
                "postalCode" => isset($clientData["cependereco"]) ? preg_replace('/\D/', '', $clientData["cependereco"]) : '',
                "city" => StringHelper::cleanObjectString(trim($clientData["cidade"])),
                "state" => StringHelper::cleanObjectString(trim($clientData["uf"])),
                "country" => "BR",
            ],
            "balance" => StringHelper::formatBalance($balanceData, $balanceTypeId),
        ];
    }

    private function makeApiCall(string $url, $payload = []): array
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5); // Timeout de 5 segundos
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "x-api-key: " . $this->apiKey,
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
        }

        return [
            "success" => in_array($httpCode, [200, 201]),
            "http_code" => $httpCode,
            "response" => $responseData,
            "message" => $responseData["message"] ?? "Erro desconhecido na API"
        ];
    }

    private function makePutApiCall(string $url, array $payload): array
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_TIMEOUT, 5); // Timeout de 5 segundos

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "x-api-key: " . $this->apiKey,
            "Content-Type: application/json",
            "Accept: application/json"
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

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
        }

        return [
            "success" => in_array($httpCode, [200, 201]),
            "http_code" => $httpCode,
            "response" => $responseData,
            "message" => $responseData["message"] ?? "Erro desconhecido na API"
        ];
    }
}
