<?php

ini_set('memory_limit', '-1');

// Make sure this script will keep on runing after we close the connection with it.
ignore_user_abort(TRUE);

// Limit of execution unlimited
set_time_limit(0);

ini_set('max_execution_time', '0'); // for infinite time of execution 

require_once("WinnerService.php");
require_once("Hub4PayIntegrationService.php");
require_once("WinnerProcessor.php");

function runIntegrationWithHub4PayService() {
    try {
        // Inicialize a conexão com o banco de dados
        $db = new PDO(...json_decode($_ENV["ENVIRONMENT"] == "development/test" ? $_ENV["HOMO_DB"] : $_ENV["PROD_DB"], true));
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Agora que $db está configurado, podemos passar para o WinnerService
        $winnerService = new WinnerService($db);
        $hubtopayService =  new Hub4PayIntegrationService();
        $winnerProcessor = new WinnerProcessor($winnerService, $hubtopayService);

        // Executa o processamento dos vencedores
        $winnerProcessor->processAllWinners();

        // Retorna uma resposta de sucesso
        return ["success" => true, "message" => "Finalizado o processo de insercao."];
    } catch (Exception $e) {
        // Caso ocorra um erro, retorna a mensagem de erro
        return ["success" => false, "error" => $e->getMessage()];
    }
}
