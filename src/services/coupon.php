<?php

require_once("src/models/modelConfig.php");


function readAllCouponsService($idcliente)
{
    // Consulta cupons ao entrar em meus cupons
    // $user = readUserModel($idcliente);
    // createCouponsService($idcliente, $user['numero_documento']);

    return [
        "saldo" => readSaldoModel($idcliente),
        "valor_total_pedidos" => readTotalValueOrdersByIdModel($idcliente),
        "cupons" => readAllOrdersModel($idcliente),
        "sorte" => readAllTicketsModel($idcliente),
        "lojas_fidelizadas" => readAllStoresModel($idcliente),
        "premios" => readAwardModel($idcliente),
    ];
}

function createCouponsService($idcliente, $numero_documento)
{
    $couponsCML = readUserCouponsCMLModel($numero_documento); // Integração CML ATACADO
    $couponsAtuais = readAllOrdersModel($idcliente); // Pegando cupons cadastrados

    // Criação da váriavel coupons com: 
    // Cupons cadastrados + Cupons vindos da integração
    $coupons = [];

    foreach ($couponsCML as $coupon) {
        $coupons[$coupon['codigo']] = $coupon;
    }

    foreach ($couponsAtuais as $coupon) {
        if (isset($coupons[$coupon['codigo']])) {
            $coupons[$coupon['codigo']] = array_merge($coupons[$coupon['codigo']], $coupon);
        } else {
            $coupons[$coupon['codigo']] = $coupon;
        }
    }

    $newOrder = createOrdersModel($idcliente, $coupons);
    if (!$newOrder) trigger_error("500: Houve um erro, tente novamente!");

    $response = array("message" => ["Compras atualizadas com sucesso!"], "insertId" => $idcliente);
    createLogModel("Atualização compras cliente - $idcliente", $coupons, null);

    return $response;
}

function createCouponService($idcliente, $coupon)
{

    $campaignInfo = readCampaignModel();
    if (!$campaignInfo) trigger_error("400: Campanha não existe!");

    $user = readUserModel($idcliente);
    if (!$user) trigger_error("400: Usuário não existe!");

    $order = readOrdersByCodeModel($coupon);
    if ($order) trigger_error("400: Nota já cadastrada!");


    $orders = countOrdersPerDayModel($idcliente);
    if ($orders["pedidos_hoje"] >= $_ENV["LIMIT_ORDERS_PER_DAY"]) trigger_error("400: Limite de cadastros diários atingido!");

    $chave = formatCoupon($coupon);
    $branch = readBranchModel($chave["cnpj"]);
    if (!$branch) trigger_error("400: A nota cadastrada não pertence a uma loja participante!");

    $newOrder = createOrder($idcliente, $coupon, $chave["cnpj"]);
    if (!$newOrder) trigger_error("500: Houve um erro, tente novamente!");

    $response = array("message" => ["Cupom cadastrado com sucesso!"], "insertId" => $newOrder);
    createLogModel("Cadastro NF - $newOrder", $order, null);

    // mailgrid([
    //     "to"         => $user["email"],                 // pode ser string ou array
    //     "from_name"  => $campaignInfo["nome_campanha"],
    //     "from_email" => $campaignInfo["email_sac"],
    //     "subject"    => "Cupom Cadastrado – Promoção Marcas Campeãs",
    //     "html"       => baseEmail(
    //         couponRegisterContentEmail(
    //             $user["nome"],
    //             $campaignInfo["site_cliente"]
    //         ),
    //         $campaignInfo["site_cliente"]
    //     ),
    // ]);

    return $response;
}
