<?php

require_once("src/services/lpindustria.php");

function readBuscaMarcaIndustria(): void 
{
    // Obtém a(s) marca(s) do query parameter
    $marcas = isset($_GET['marca']) ? $_GET['marca'] : null;

    // Valida se a marca foi fornecida
    if (!$marcas) {
        send_response(["error" => "O parâmetro 'marca' é obrigatório."], 400);
        return;
    }

    // Garante que $marcas seja um array
    if (!is_array($marcas)) {
        $marcas = [$marcas];
    }

    // Chama o serviço para buscar os dados
    $result = readBuscaMarcaIndustriaService($marcas);

    // Retorna a resposta com os dados encontrados
    send_response($result, 200);
}
