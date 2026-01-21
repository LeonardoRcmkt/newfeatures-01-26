<?php

function readBrandsModel()
{
    // A consulta agora vai buscar todas as marcas, sem a necessidade de filtrar pelo cliente.
    $query = $GLOBALS["db"]()->prepare("SELECT * FROM marcas;");

    // Execute a consulta.
    $query->execute();
    
    // Busque os resultados como um array associativo.
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    // Chame a métrica para essa operação.
    $GLOBALS["metrics"]("readBrandsModel");

    return $result;
}
