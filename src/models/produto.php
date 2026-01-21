<?php
function isProdutoParticipante($ean)
{
    $queryProd = $GLOBALS["db"]()->prepare('
    SELECT produto_participante
    FROM produtos_participantes 
    WHERE ean = ?
    ORDER BY RAND()
    ');
    $queryProd->bindParam(1, $ean, typeBind("str"));
    $queryProd->execute();
    $result = $queryProd->fetch(PDO::FETCH_ASSOC);

    $GLOBALS["metrics"]("verificaprodutosParticipante");

    return isset($result['produto_participante']) ? $result['produto_participante'] : 'N';;
}

function readProductsModel()
{
    // A consulta e buscar todas os produtos.
    $query = $GLOBALS["db"]()->prepare('
    SELECT pp.id_produto, pp.categoria, pp.marca, pp.produto, pp.ean, pp.produto_participante
    FROM produtos_participantes as pp
    ORDER BY RAND()
    ');

    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    $GLOBALS["metrics"]("readProductsModel");

    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https" : "http";
    $baseUrl = $protocol . "://" . $_SERVER['HTTP_HOST'] . "/";

    foreach ($result as $key => $value) {
        if (is_file("public/products/$value[ean].jpg")) {
            $result[$key]['img'] = $baseUrl . "public/products/$value[ean].jpg";
        }
    }

    usort($result, function ($a, $b) {
        // Verificar a existência da chave "img" nos dois arrays
        $hasImgA = array_key_exists("img", $a);
        $hasImgB = array_key_exists("img", $b);

        // Arrays com "img" devem vir primeiro
        if ($hasImgA == $hasImgB) {
            return 0; // Não altera a ordem relativa se ambos têm ou não têm "img"
        }

        return $hasImgA ? -1 : 1; // Move os arrays com "img" para o início
    });

    return $result;
}


function readBuscaMarcaIndustriaModel($marcas) {
    // Verifica se a lista de marcas está vazia
    if (empty($marcas)) {
        return [];
    }
    // Monta placeholders dinâmicos para a consulta
    $placeholders = implode(',', array_fill(0, count($marcas), '?'));

    // Consulta para buscar produtos pelas marcas fornecidas
    $query = $GLOBALS["db"]()->prepare("
        SELECT pp.id_produto, pp.categoria, pp.marca, pp.produto, pp.ean, pp.produto_participante
        FROM produtos_participantes as pp
        WHERE pp.marca IN ($placeholders)
        ORDER BY RAND()
    ");

    // Bind dos parâmetros dinamicamente
    foreach (array_values($marcas) as $index => $marca) {
        $query->bindValue($index + 1, $marca, typeBind("str"));
    }

    // Executa a consulta
    $query->execute();

    // Obtém os resultados
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    // Métricas de monitoramento (se aplicável)
    $GLOBALS["metrics"]("readBuscaMarcaIndustriaModel");

    // Retorna os resultados
    return $result;
}


function readMarcasParticipantesModel($impulsionador)
{
    $queryProd = $GLOBALS["db"]()->prepare("
    SELECT marca
    FROM produtos_participantes 
    $impulsionador
    GROUP BY marca
    ");
    $queryProd->execute();
    $result = $queryProd->fetchAll(PDO::FETCH_ASSOC);

    $GLOBALS["metrics"]("verificaMarcaParticipante");

    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https" : "http";
    $baseUrl = $protocol . "://" . $_SERVER['HTTP_HOST'] . "/";

    foreach ($result as $key => $value) {
        $marcaNome = trim($value['marca']);
        $marcaFormatada = str_replace(' ', '_', $marcaNome);

        $path = "public/marcas/{$marcaFormatada}.jpg";

        if (is_file($path)) {
            $result[$key]['img'] = $baseUrl . $path;
        }
    }

    usort($result, function ($a, $b) {
        // Verificar a existência da chave "img" nos dois arrays
        $hasImgA = array_key_exists("img", $a);
        $hasImgB = array_key_exists("img", $b);

        // Arrays com "img" devem vir primeiro
        if ($hasImgA == $hasImgB) {
            return 0; // Não altera a ordem relativa se ambos têm ou não têm "img"
        }

        return $hasImgA ? -1 : 1; // Move os arrays com "img" para o início
    });

    return $result;
}
