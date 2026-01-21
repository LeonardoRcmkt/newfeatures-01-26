<?php


require_once("src/models/modelConfig.php");
require_once("src/models/sendEmail.php");


function readUserService($dbFlag, $payload)
{
  if ($dbFlag) return readUserModel($payload->idcliente);
  return $payload;
}


function createUserService($user)
{
  $existentUser = readUserModel($user["numero_documento"]);
  if ($existentUser) trigger_error("400: Usuário já cadastrado!");

  $campaignInfo = readCampaignModel();
  if (!$campaignInfo) trigger_error("400: Campanha não existe!");

  $preCadastroUser = readUserPreCadastroModel($user["numero_documento"]);

  if ($preCadastroUser) {
    updateUserModel($preCadastroUser["idcliente"], [...$user, "ativo" => 1, "dt_cadastro" => date('Y-m-d H:i:s')]);
    $newUserId = $preCadastroUser["idcliente"];
  } else {
    $newUserId = createUserModel($user);
  }

  if ($newUserId) {
    geraChances($newUserId, 1);

    // sendEmail([
    //   "to" => $user["email"],
    //   "from_name" => $campaignInfo["nome_campanha"],
    //   "from_email" => $campaignInfo["email_sac"],
    //   "subject" => "Bem Vindo a Promoção Marcas Campeãs  ",
    //   "html" => baseEmail(userRegisterContentEmail($user["nome"], $campaignInfo["site_cliente"]), $campaignInfo["site_cliente"])
    // ]);

    // mailgrid([
    //     "to"         => $user["email"],
    //     "from_name"  => $campaignInfo["nome_campanha"],
    //     "from_email" => $campaignInfo["email_sac"],
    //     "subject"    => "Bem Vindo a Promoção Marcas Campeãs  ",
    //     "html"       => baseEmail(
    //         userRegisterContentEmail(
    //             $user["nome"], $campaignInfo["site_cliente"]
    //         ),
    //         $campaignInfo["site_cliente"]
    //     ),
    // ]);
    unset($user["senha_acesso"]);
    $user["idcliente"] = $newUserId;
    return ["token" => encrypt($user)];
  } else trigger_error("Erro interno!");
}


function updateUserService($idcliente, $user)
{

  $updatedUser = updateUserModel($idcliente, $user);
  if (!$updatedUser) trigger_error("400: Nenhum dado foi atualizado!");

  $existentUser = readUserModel($idcliente);
  if (!$existentUser) trigger_error("400: Erro ao tentar localizar o usuário!");

  return ["token" => encrypt($existentUser)];
}


function updatePasswordService($idcliente, $body)
{
  $user = readUserPWModel($idcliente);
  if (!$user) trigger_error("400: Usuário não existe!");

  if (!password_verify($body["senha_acesso"], $user["senha_acesso"])) trigger_error("400: Senha atual incorreta!");

  $updatedUser = ["senha_acesso" => format($body)["nova_senha_acesso"]];

  $updatedUser = updateUserModel($idcliente, $updatedUser);
  if (!$updatedUser)  trigger_error("400: Nenhum dado foi atualizado!");

  $existentUser = readUserModel($idcliente);
  if (!$existentUser) trigger_error("400: Erro ao tentar localizar o usuário!");

  return ["token" => encrypt($existentUser)];
}


function deleteUserService($idcliente)
{
  $existentUser = readUserModel($idcliente);
  if (!$existentUser) trigger_error("400: Erro ao tentar localizar o usuário!");

  return deleteUserModel($idcliente);
}
