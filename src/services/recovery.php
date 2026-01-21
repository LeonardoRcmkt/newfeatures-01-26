<?php

require_once("src/models/modelConfig.php");
require_once("src/models/sendEmail.php");

function recoveryEmailService($body)
{
  $user = readUserModel($body["numero_documento"]);
  if (!$user) trigger_error("400: Usuário não localizado!");

  $campaignInfo = readCampaignModel();
  if (!$campaignInfo) trigger_error("400: Campanha não existe!");

  $user["pin_recupera_senha"] = bin2hex(random_bytes(4));
  $user["dt_envio_email_redefinicao_senha"] = date('Y-m-d');
  $user["hora_envio_email_redefinicao_senha"] = date('H:i:s');

  $updatedUser = updateUserModel($user["idcliente"], $user);
  if (!$updatedUser) trigger_error("400: Erro ao tentar atualizar o usuário!");

  // sendEmailReq([
  //   "to" => $user["email"],
  //   "from_name" => $campaignInfo["nome_campanha"],
  //   "subject" => "Recuperação de Senha – Promoção Marcas Campeãs",
  //   "html" => baseEmail(recoveryPasswordContentEmail(
  //     $user["nome"],
  //     $user["pin_recupera_senha"],
  //     $campaignInfo["site_cliente"]
  //   ), $campaignInfo["site_cliente"])
  // ]);

  mailgrid([
    "to"         => $user["email"],                 // pode ser string ou array
    "from_name"  => $campaignInfo["nome_campanha"],
    "from_email" => $campaignInfo["email_sac"],
    "subject"    => "Recuperação de Senha – Promoção Marcas Campeãs",
    "html"       => baseEmail(
        recoveryPasswordContentEmail(
            $user["nome"],
            $user["pin_recupera_senha"],
            $campaignInfo["site_cliente"]
        ),
        $campaignInfo["site_cliente"]
    ),
  ]);

  return substr($user["email"], 0, 4) . "xxxxx@xxx";
}


function recoveryPinService($body)
{
  $user = readRecoveryPinUserModel($body["pin"]);
  if (!$user) trigger_error("401: Usuário não existe ou não solicitou troca de senha.");

  $user["senha_acesso"] = $body["senha_acesso"];
  $user["pin_recupera_senha"] = null;
  $user["dt_envio_email_redefinicao_senha"] = null;
  $user["hora_envio_email_redefinicao_senha"] = null;

  $updatedUser = updateUserModel($user["idcliente"], $user);
  if (!$updatedUser) trigger_error("400: Erro ao tentar atualizar o usuário!");

  return $updatedUser;
}
