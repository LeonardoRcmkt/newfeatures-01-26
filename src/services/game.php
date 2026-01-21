<?php

require_once("src/models/modelConfig.php");
require_once("src/models/sendEmail.php");
require_once("src/models/modal/processImg.php");


function readGameService($idClient)
{
    return readChanceModel($idClient);
}


function createGameService($idClient)
{
    $campaignInfo = readCampaignModel();
    if (!$campaignInfo) trigger_error("400: Campanha não existe!");

    $user = readUserModel($idClient);
    if (!$user) trigger_error("400: Usuário não existe!");

    $chances = readChanceModel($idClient)["chances_disponiveis"];
    if (!$chances || $chances <= 0) trigger_error("400: Sem chances disponíveis!");

    $firstTry = readFirstTryModel($idClient)["first_try"] == 1;
    // $firstTry = true;
    if ($firstTry) {
        $rouletteToken = bin2hex(random_bytes(4));
        $idRoulette = createRouletteModel($idClient, null, $rouletteToken);
        $response = [
            "premio" => false,
            "chances_disponiveis" => $chances - 1,
        ];

        createLogModel("Tentativa Gamificação Final Campanha - $idRoulette", $idClient, $response);
        $response['modal'] = base64_encode(file_get_contents("src/models/modal/loose.png"));
        return $response;
    };


    $orders = readOrdersByIdModel($idClient);
    if (!$orders) trigger_error("400: Usuário não tem cupons cadastrados!");

    $idAward = createGameModel($orders["id_pedido"], $orders["cnpj_filial"], $idClient);

    if ($idAward) {
        while (true) {
            $voucher = "9" . rand(100000, 999999);
            if (!readVoucherModel($voucher)) {
                if (!updateVoucherModel($voucher, $idAward)) continue;

                $voucherValue = readVoucherModel($voucher);
                $filial = readFilialModel($orders["cnpj_filial"]);
                $loja = !$filial ? "" : "$filial[nome_fantasia] | $filial[endereco], $filial[numero] - $filial[bairro], $filial[cidade] - $filial[uf]";
                // sendEmailReq([
                //     "to" => $user["email"],
                //     "from_name" => $campaignInfo["nome_campanha"],
                //     "subject" => "Parabéns você ganhou! – Promoção Marcas Campeãs ",
                //     "html" => baseEmail(gameAwardAlertContentEmail($user["nome"], $voucherValue["desc_premio"], $campaignInfo["site_cliente"], $loja), $campaignInfo["site_cliente"])
                // ]);

                // mailgrid([
                // "to"         => $user["email"],                 // pode ser string ou array
                // "from_name"  => $campaignInfo["nome_campanha"],
                // "from_email" => $campaignInfo["email_sac"],
                // "subject"    => "Parabéns você ganhou! – Promoção Marcas Campeãs",
                // "html"       => baseEmail(
                //                     gameAwardAlertContentEmail(
                //                     $user["nome"],
                //                     $voucherValue["desc_premio"],
                //                     $campaignInfo["site_cliente"], 
                //                     $loja
                //                     ),
                //                     $campaignInfo["site_cliente"]
                //                 ),
                // ]);

                break;
            }
        }
    }

    $rouletteToken = bin2hex(random_bytes(4));
    $idRoulette = createRouletteModel($idClient, $idAward, $rouletteToken);
    $desc = "";
    if ($idAward) {
        updateRouletteModel($idRoulette, $idAward);
        $voucherValue = readVoucherModel($voucher);
        $desc = $voucherValue["desc_premio"];
        createTransferencia($user, $idAward, ($desc * 100));
    };

    $response = [
        "premio" => $idAward ? $idAward : false,
        "chances_disponiveis" => $chances - 1,
    ];

    createLogModel("Tentativa Gamificação - $idRoulette", $idClient, $response);
    $response['modal'] = isset($idAward) ? base64_encode(file_get_contents("src/models/modal/$desc.png")) : base64_encode(file_get_contents("src/models/modal/loose.png"));
    return $response;
}
