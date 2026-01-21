<?php
require_once("src/models/modelConfig.php");

function updatePedidosService()
{
    $users = readAllUsersModel();

    foreach ($users as $user) {
        createCouponsService($user['idcliente'], $user['numero_documento']);
    }

    createLogModel("Atualização programada de pedidos");

    return true;
}
