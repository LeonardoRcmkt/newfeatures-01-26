<?php
require_once("src/models/modelConfig.php");


function createUserCopercanaService($body)
{
    $campaignInfo = readCampaignModel();
    if (!$campaignInfo) trigger_error("400: Campanha não existe!");

    $user = readUserModel($body['numero_documento']);
    $accessToken = geraCodigos(40, true, true, true, false);

    $body = array(...$body, 'token' => $accessToken);

    if (!$user) {
        $response = array("message" => "Dados do usuário inseridos com sucesso.", "token" => $accessToken);
        createUserModel($body);
        createLogModel("Cadastro via APP Merca Fácil", 0, $body, $response);
    } else {
        $response = array("message" => "Dados do usuário alterados com sucesso.", "token" => $accessToken);
        updateUserModel($user['idcliente'], $body);
        createLogModel("Cadastro via APP Merca Fácil", 0, $body, $response);
    }

    return $response;
}

function readAllUsersCopercanaService($page)
{
    $lastPage = $page * 5;
    $firstPage = $page * 5 - 4;
    $usersCopercana = [];
    for ($i = $firstPage; $i <= $lastPage; $i++) {
        $usersCopercana = array_merge($usersCopercana, readAllUsersCopercanaModel($i));
    }

    foreach ($usersCopercana as $value) {
        try {
            if ($value["leu_aceitou_regulamento"]) {
                $user = readUserModel($value['numero_documento']);
                if (!$user) {
                    createUserModel(format($value));
                } else {
                    updateUserModel($user['idcliente'], format($value));
                }
            }
        } catch (\Throwable $th) {
            createLogModel("Erro no cadastro via API Merca Fácil", 0, format($value), "");
        }
    }

    $response = array("message" => ["Dados dos usuários das páginas $firstPage - $lastPage inseridos com sucesso."]);

    createLogModel("Cadastro via API Merca Fácil | Páginas $firstPage - $lastPage", 0, "", $response);

    return $response;
}
