<?php

require_once __DIR__ . '/../helpers/StringHelper.php';

class WinnerProcessor
{
    private $winnerService;
    private $hubtopayService;

    public function __construct(WinnerService $winnerService, Hub4PayIntegrationService $hubtopayService)
    {
        $this->winnerService = $winnerService;
        $this->hubtopayService = $hubtopayService;
    }
    public function processWinner(array $winner): void
    {
        try {
            $timestamp = date('Y-m-d H:i:s');
            echo "\n 📌 Iniciando processamento para o cliente ID: {$winner['id_cliente']} em {$timestamp} \n";

            $clientData = $this->getClientData($winner['id_cliente']);
            $cpf = StringHelper::removeZeroOnFrontOfString($clientData['numero_documento']);

            $clientIntegration = $this->findUser($cpf);
            $integrationData = $clientIntegration['response']['data'] ?? [];

            if (empty($integrationData)) {
                echo "\n🔍 Cliente não encontrado. Iniciando pré-cadastro...";
                $this->preRegisterUser($clientData, $winner);
                return;
            }

            echo "\n✅ Cliente já pré-cadastrado!";
            $clientIntegrationData = $integrationData[0];

            switch ($clientIntegrationData['status']) {
                case 'PreRegistered':
                    echo "\n🔄 Transferência de saldo pendente para o cliente ID: {$winner['id_cliente']} - Prêmio: {$winner['desc_premio']}";
                    $this->updateActiveUserBalance($integrationData, $winner);
                    break;

                case 'Active':
                    echo "\n💰 Processando transferência de saldo para cliente ativo.";
                    $this->processBalanceTransfer($clientIntegrationData, $winner);
                    break;

                default:
                    throw new Exception("❌ Status do cliente '{$clientIntegrationData['status']}' não é válido para processamento.");
            }
        } catch (Throwable $e) {
            echo "\n ⚠️ Erro ao processar cliente ID: {$winner['id_cliente']} - {$e->getMessage()}";
            $this->logError($winner['id_premio_instantaneo'], $e->getMessage());
        }
    }


    private function getClientData($clientId)
    {
        $clientData = $this->winnerService->getClientData($clientId);
        if (!$clientData) {
            throw new Exception("❌ Dados do cliente não encontrados para o ID: $clientId");
        }
        return $clientData;
    }

    private function findUser($cpf)
    {
        $clientIntegration = $this->hubtopayService->findUserByCpfForIntegration($cpf);

        return $clientIntegration;
    }

    private function updateActiveUserBalance($clientData, $winner)
    {   
        try {
            $clientDataIntegration = $clientData[0];
    
            $clientIntegration = $this->winnerService->getUpdatedUserBalance($winner['id_cliente']);
    
            $balanceToUpdate = ((float) $clientIntegration['total'] + (float) $winner['desc_premio']) * 100;
    
            echo "\n🔄 Atualizando saldo do cliente em Pre-cadastro com o ID: {$winner['id_cliente']} - Saldo: {$balanceToUpdate}\n";
    
            echo "\n🔄 ID do cliente na hub4pay: {$clientDataIntegration['id']} \n";
            
            $clientIntegration = $this->hubtopayService->updatePreActivatedUserBalance($clientDataIntegration['id'], $balanceToUpdate);
            
            echo "\n✅ Saldo de pre-cadastro atualizado com sucesso!";

            $this->updateWinnerStatus($winner['id_premio_instantaneo']);
            
        } catch (Throwable $e) {
            echo "\n ⚠️ Erro ao atualizar saldo do cliente ID: {$winner['id_cliente']} - {$e->getMessage()}";
            throw new Exception($e->getMessage());
        }
    }

    private function preRegisterUser($clientData, $winner)
    {
        $balanceData = (float)$winner['desc_premio'];

        $integrationResult = $this->hubtopayService->preRegisterPerson($clientData, $balanceData);

        if (!$integrationResult['success']) {
            throw new Exception("Falha no pré-cadastro: " . json_encode($integrationResult['message']));
        }

        echo "\n Pré-cadastro realizado com sucesso!";

        $this->updateWinnerStatus($winner['id_premio_instantaneo']);
        $this->logSuccess($winner['id_premio_instantaneo']);
    }

    private function processBalanceTransfer($clientIntegration, $winner)
    {
        try {
            $balanceGroup = $clientIntegration['balanceGroup'];

            echo "\n 🔄 Iniciando transferência de saldo para o cliente ID: " . $winner['id_cliente']
                . " - Prêmio: " . $winner['desc_premio'] . "\n";

            // echo "\n Dados do cliente " . json_encode($clientIntegration, JSON_PRETTY_PRINT);

            if ($balanceGroup['status'] !== 'Active') {
                throw new Exception("❌  Balance Group inativo.");
            }

            $balance = $this->getActiveBalance($balanceGroup['balances']);

            if (!$balance['id']) {
                throw new Exception("❌  Usuário não possui saldo disponível para transferência.");
            }

            $transferPayload = $this->hubtopayService->findBalanceAndCreatePayload($clientIntegration, $winner);

            $transferResult = $this->hubtopayService->transferBalance($transferPayload);

            if ($transferResult['http_code'] !== 201) {
                throw new Exception("Falha na transferência de saldo: " . json_encode($transferResult['message']));
            }

            echo "\n✅ Transferência de saldo realizada com sucesso!";

            $this->updateWinnerStatus(prizeId: $winner['id_premio_instantaneo']);
        } catch (Throwable $e) {
            echo "\n ⚠️ Erro ao processar transferência de saldo para o cliente ID: {$winner['id_cliente']} - {$e->getMessage()}";
            throw new Exception($e->getMessage());
        }
    }

    private function getActiveBalance(array $balances)
    {
        foreach ($balances as $balance) {
            if ($balance['name'] === 'Incentivo' && $balance['status'] === 'Active') {
                return $balance;
            }
        }
        return null;
    }

    private function updateWinnerStatus($prizeId)
    {
        $updateStatus = $this->winnerService->updateParticipationStatus($prizeId);
        if ($updateStatus <= 0) {
            throw new Exception("Falha ao atualizar status do prêmio ID: $prizeId");
        }
    }

    private function logSuccess($prizeId)
    {
        $this->winnerService->logIntegrationResult($prizeId, [
            "success" => true,
            "message" => "Transferência de saldo realizada com sucesso!"
        ]);
        echo "\n Transferência de saldo realizada com sucesso!";
    }

    private function logError($prizeId, $message)
    {
        $timestamp = date('Y-m-d H:i:s');
        echo "\n❌  Erro: $message";
        $this->winnerService->logIntegrationResult($prizeId, [
            "success" => false,
            "message" => $message
        ]);
    }

    public function processAllWinners(): array
    {
        $timestamp = date('Y-m-d H:i:s');
        $winners = $this->winnerService->getWinnersToReceive();

        if (empty($winners)) {
            return ["success" => false, "message" => " ⚠️ Nenhum vencedor pendente para processamento."];
        }

        echo "\n 🚀 Iniciando o processamento de " . count($winners) . " ganhadores.\n";

        foreach ($winners as $winner) {
            $this->processWinner($winner);
        }

        return [
            "message" => " ⚠️ Processamento de vencedores concluído."
        ];
    }
}
