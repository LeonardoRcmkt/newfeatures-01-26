<?php
function readOrderDataTelhanorte($idcliente)
{

  $user = readUserModel($idcliente);
  $documento = ltrim($user['numero_documento'], 0);

  if (strlen($documento) <= 11) {
    $data = ["tipo" => "cpf", "value" => substr($user['numero_documento'], 3)];
  } else {
    $data = ["tipo" => "cnpj", "value" => $user['numero_documento']];
  }

  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://apisgd.telhanorte.com.br/vendas?documento=" . $data['value'] . "&tipo=" . $data['tipo'] . "",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      'X-API-User: RCTRADE',
      'X-API-Key: 17cff867-dzxr-4079-e5an-e66630c98e58',
      'X-API-Brand: telhanorte',
      'Cookie: ARRAffinity=92ca53ad8db4fbb93d4d3b7d8ab54dcf8ffecb2d731f25b0e91ad575d7534c3f; ARRAffinitySameSite=92ca53ad8db4fbb93d4d3b7d8ab54dcf8ffecb2d731f25b0e91ad575d7534c3f'
    ),
  ));
  $response = curl_exec($curl);
  curl_close($curl);
  $retorno = json_decode($response);

  createLogModel('Integração com Cliente Telhanorte', $data, $retorno);

  var_dump($retorno);
  die();

  $query = $GLOBALS["db"]()->prepare('
    SELECT pd.id_pedido, pd.cnpj_filial, pd.codigo_pedido, pd.valor_total_compra, pd.dt_emissao, pd.ic_situacao, pd.dt_cadastro, fl.nome_fantasia as nome_fantasia,
    (SELECT IFNULL(ROUND(SUM(qtd_comprada)), 0) FROM pedido_produto WHERE id_pedido = pd.id_pedido AND produto_participante IN ("S", "I")) AS totalMarcasParticipantes
    FROM pedido as pd
    JOIN filiais as fl
    ON fl.cnpj_filial = pd.cnpj_filial
    WHERE pd.id_cliente = ?
    ;');

  $query->bindParam(1, $idcliente, typeBind("str"));


  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readAllOrdersModel");

  return $result;
}
