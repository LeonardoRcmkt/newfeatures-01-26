<?php

require_once("src/services/cmlatacado.php");

function updatePedidosController()
{
    send_response(updatePedidosService(), 200);
}
