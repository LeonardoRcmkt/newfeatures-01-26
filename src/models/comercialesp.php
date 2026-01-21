<?php
function readOrderCML($coupon)
{

    die("testde");
    $dboracle = oci_connect(...json_decode($_ENV['CML_DB'], true));

    $sql_text = "
    SELECT * FROM view_campanha_lojas WHERE CHAVESAT = '$coupon' 
    ";
    $oci_query = oci_parse($dboracle, $sql_text);
    oci_execute($oci_query);


    $numero_linhas = oci_fetch_all($oci_query, $coupon, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

    if ($numero_linhas > 0) {
        $response = [
            "codigo_pedido" => $coupon[0]['CHAVESAT'],
            "cnpj_filial" => $coupon[0]['CNPJ_FILIAL'],
            "operador_pdv" => $coupon[0]['PDV'],
            "dt_emissao" => new DateTime(converterDataCML($coupon[0]["DTSAIDA"], $coupon[0]["HORALANC"], $coupon[0]["MINUTOLANC"])),
            "valor_total_compra" => $coupon[0]['VLTOTAL'],
            "api_response" => $coupon[0],
        ];

        return $response;
    }

    return false;
}
