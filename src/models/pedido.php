<?php
function readAllOrdersModel($idcliente)
{
  $query = $GLOBALS["db"]()->prepare('
    SELECT pd.id_pedido as id, pd.cnpj_filial, pd.codigo_pedido as codigo, pd.valor_total_compra as valor_total, pd.dt_emissao, pd.ic_situacao as status, pd.dt_cadastro, fl.nome_fantasia as nome_filial,
    COUNT(c.id_cupom) as num_sorte,
     (SELECT IFNULL(ROUND(SUM(qtd_comprada)), 0) FROM pedido_produto WHERE id_pedido = pd.id_pedido AND produto_participante IN ("S")) AS total_produtos_participantes,
     (SELECT IFNULL(ROUND(SUM(qtd_comprada)), 0) FROM pedido_produto WHERE id_pedido = pd.id_pedido AND produto_participante IN ("I")) AS total_produtos_impulsionadores
    FROM pedido as pd
    LEFT JOIN filiais as fl
    ON fl.cnpj_filial = pd.cnpj_filial
    LEFT JOIN cupom as c
    ON c.id_pedido = pd.id_pedido
    WHERE pd.id_cliente = ?
    GROUP BY pd.id_pedido
    ;');

  $query->bindParam(1, $idcliente, typeBind("str"));

  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readAllOrdersModel");

  return $result;
}

function readSaldoModel($idcliente)
{
  $query = $GLOBALS["db"]()->prepare('
    SELECT 
      IFNULL(COUNT(p.id_pedido), 0) AS cupons_cadastrados,
      IFNULL(ps.chances_disponiveis - (SELECT COUNT(r.id_roleta) FROM roleta r WHERE r.id_cliente = ?), 0) AS chances,
      ps.produto_participante_saldo,
      ps.produto_impulsionador_saldo,

      ps.valor_saldo AS saldo
    FROM clientes c
    LEFT JOIN 
      pedido p ON p.id_cliente = c.idcliente
    LEFT JOIN 
      pedido_saldo ps ON ps.id_cliente = c.idcliente
    WHERE 
      c.idcliente = ?
    ;');

  $query->bindParam(1, $idcliente, typeBind("str"));
  $query->bindParam(2, $idcliente, typeBind("str"));


  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readAllOrdersModel");

  return $result;
}

function readAllStoresModel($idcliente)
{

  $query = $GLOBALS["db"]()->prepare('
    SELECT 
     pf.qtd_pedido, f.nome_fantasia
    FROM pedido_fidelizacao pf
    LEFT JOIN 
      filiais f ON f.cnpj_filial = pf.cnpj_pedido
    WHERE 
      pf.id_cliente = ?
    ;');

  $query->bindParam(1, $idcliente, typeBind("str"));



  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readAllOrdersModel");

  return $result;
}

function createOrdersModel($idcliente, $coupons)
{
  $db = $GLOBALS["db"]();

  $valor = 0;

  foreach ($coupons as $coupon) {
    $valor += $coupon['valor_total'];

    if (!isset($coupon['id'])) {
      // Cupom não cadastrado
      $date = $coupon['dt_emissao']->format('Y-m-d');
      $query = $db->prepare("
      INSERT 
      INTO pedido (id_cliente, codigo_pedido, valor_total_compra, dt_emissao) 
      VALUES (?, ?, ?, ?)
      ");

      $query->bindParam(1, $idcliente, typeBind("str"));
      $query->bindParam(2, $coupon['codigo'], typeBind("str"));
      $query->bindParam(3, $coupon['valor_total'], typeBind("str"));
      $query->bindParam(4, $date, typeBind("str"));
      $query->execute();
    }
  }

  // geraNumSorte($idcliente, $valor);
  // geraChances($idcliente, $valor);

  // return true;
}

function createOrder($idcliente, $order, $cnpj)
{
  $db = $GLOBALS["db"]();


  // Insert pedido
  $query = $db->prepare("
    INSERT 
    INTO pedido (id_cliente, codigo_pedido, cnpj_filial) 
    VALUES (?, ?, ?)
  ");

  $query->bindParam(1, $idcliente, typeBind("int"));
  $query->bindParam(2, $order, typeBind("str"));
  $query->bindParam(3, $cnpj, typeBind("str"));
  $query->execute();

  $idPedido = $db->lastInsertId();

  createLogModel('Pedido cadastrado com sucesso', $order, null, $order);
  return $idPedido;
}

function readOrdersByIdModel($idClient)
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT id_pedido, cnpj_filial
    FROM pedido
    WHERE id_cliente = ? AND
    ic_situacao = 'A'
    ORDER BY dt_cadastro DESC
    LIMIT 1
    ;");

  $query->bindParam(1, $idClient, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readOrdersByIdModel");
  return $result;
}

function readOrdersByCodeModel($code)
{
  $query = $GLOBALS["db"]()->prepare('
    SELECT id_pedido
    FROM pedido
    WHERE codigo_pedido = :code
    ;');

  $query->bindValue(":code", $code, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readOrdersByCodeModel");
  return $result;
}

function readTotalValueOrdersByIdModel($idCliente)
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT SUM(valor_total_compra) AS valor_total_compras
    FROM pedido
    WHERE id_cliente = ? AND
    ic_situacao = 'A'
    ;");

  $query->bindParam(1, $idCliente, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readOrdersByIdModel");
  return $result["valor_total_compras"];
}

function readChanceModel($idClient)
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT 
    (SELECT IFNULL(SUM(chances_disponiveis), 0) FROM pedido_saldo WHERE id_cliente = :id_client)
    -
    (SELECT IFNULL(COUNT(id_roleta), 0) FROM roleta WHERE id_cliente = :id_client)
    AS chances_disponiveis
    ;");

  $query->bindValue(":id_client", $idClient, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readChanceModel");
  return $result;
}

function readFirstTryModel($idClient)
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT IF(COUNT(c.id_cupom) = 0, 1, 0) AS first_try  FROM cupom c WHERE c.id_cliente = :id_client
  ;");

  $query->bindValue(":id_client", $idClient, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readFirstTryModel");
  return $result;
}

function countOrdersPerDayModel($idClient)
{
  $query = $GLOBALS["db"]()->prepare('
    SELECT IFNULL(COUNT(id_cliente), 0) as pedidos_hoje
    FROM pedido
    WHERE id_cliente = :id_client AND DATE_FORMAT(dt_cadastro, "%Y-%m-%d") = :dateToday
    ;');

  $query->bindValue(":id_client", $idClient, typeBind("str"));
  $query->bindValue(":dateToday", date('Y-m-d'), typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("countOrdersPerDayModel");
  return $result;
}
