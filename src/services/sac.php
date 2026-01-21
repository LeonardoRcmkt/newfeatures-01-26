<?php


require_once("src/models/modelConfig.php");
require_once("src/models/sendEmail.php");


function createSacService($body)
{
    $campaignInfo = readCampaignModel();
    if (!$campaignInfo) trigger_error("400: Campanha não existe!");

    // return sendEmail([
    //     "to" => $campaignInfo["email_sac"],
    //     "from_name" => $campaignInfo["nome_campanha"],
    //     "from_email" => $body["email"],
    //     "subject" => "SAC - " . $body["nome"],
    //     "html" => baseEmail(sacContactContentEmail(
    //         $body["nome"], $body["email"], $body["mensagem"], $body["telefone"]
    //     ), $campaignInfo["site_cliente"])
    // ]);

    return mailgrid([
        "to"         => $campaignInfo["email_sac"],
        "from_name"  => $campaignInfo["nome_campanha"],
        "from_email" => $body["email"],
        "subject"    => "SAC - " . $body["nome"],
        "html"       => baseEmail(
            sacContactContentEmail(
                $body["nome"], $body["email"], $body["mensagem"], $body["telefone"]
            ),
            $campaignInfo["site_cliente"]
        ),
    ]);
}
