<?php
function readCMLUserModel($numero_documento)
{
    $dboracle = oci_connect(...json_decode($_ENV['CML_DB'], true));
    $numero_documento_formatado = sprintf(
        '%s.%s.%s/%s-%s',
        substr($numero_documento, 0, 2),
        substr($numero_documento, 2, 3),
        substr($numero_documento, 5, 3),
        substr($numero_documento, 8, 4),
        substr($numero_documento, 12, 2)
    );

    $sql_text = "
    SELECT view_cadastro_clientes.*
    FROM view_campanha_atacado
    LEFT JOIN view_cadastro_clientes on view_cadastro_clientes.codcli = view_campanha_atacado.codcli
    WHERE dtsaida >= '26-AUG-24' AND dtsaida <= '27-AUG-24'
    ";
    $oci_query = oci_parse($dboracle, $sql_text);
    oci_execute($oci_query);


    $numero_linhas = oci_fetch_all($oci_query, $user, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    var_dump($user);
    if ($numero_linhas > 0) {
        $response = [
            "razao_social" => $user[0]['CLIENTE'],
            "nome_fantasia" => $user[0]['FANTASIA'],
            "cependereco" => $user[0]['CEPENT'],
            "endereco" => $user[0]['ENDERENT'],
            "cidade" => $user[0]['MUNICENT'],
            "uf" => $user[0]['ESTENT'],
            "api_response" => $user[0],
        ];

        return $response;
    }

    return false;
}

function readUserCouponsCMLModel($numero_documento)
{
    $dboracle = oci_connect(...json_decode($_ENV['CML_DB'], true));
    $numero_documento_formatado = sprintf(
        '%s.%s.%s/%s-%s',
        substr($numero_documento, 0, 2),
        substr($numero_documento, 2, 3),
        substr($numero_documento, 5, 3),
        substr($numero_documento, 8, 4),
        substr($numero_documento, 12, 2)
    );

    $sql_text = "
    SELECT chavenfe, vltotal, dtsaida
    FROM view_campanha_atacado 
    LEFT JOIN view_cadastro_clientes on view_cadastro_clientes.codcli = view_campanha_atacado.codcli
    WHERE cgcent = '$numero_documento_formatado' AND dtsaida >= '01-AUG-24' AND dtsaida <= '22-AUG-24'
    ";
    $oci_query = oci_parse($dboracle, $sql_text);
    oci_execute($oci_query);

    $numero_linhas = oci_fetch_all($oci_query, $coupons, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    $response = [];
    foreach ($coupons as $value) {
        array_push($response, [
            "codigo" => $value["CHAVENFE"],
            "dt_emissao" => new DateTime(converterDataCML($value["DTSAIDA"], '00', '00')),
            "valor_total" => $value["VLTOTAL"],
            "produtos" => [],
            "api_response" => $value
        ]);
    }


    return $response;
}
