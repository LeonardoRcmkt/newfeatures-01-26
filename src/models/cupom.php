<?php


function readAllTicketsModel($idcliente)
{
  $query = $GLOBALS["db"]()->prepare('
  SELECT codigo_cupom
  FROM cupom
  WHERE id_cliente = ?
  ;');

  $query->bindParam(1, $idcliente, typeBind("str"));

  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readAllTicketsModel");
  return array_column($result, 'codigo_cupom');
}

function readTotalNumerosSorte($idCliente)
{

  $query = $GLOBALS["db"]()->prepare('
  SELECT COUNT(id_cupom) as totalNumerosSorte
  FROM cupom
  WHERE id_cliente = ?
  ;');

  $query->bindParam(1, $idCliente, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readTotalNumerosSorte");
  return $result['totalNumerosSorte'];
}

function geraNumSorte($idCliente, $idPedido, $valorCompra)
{
  $limite = 500;
  $qtdNumSorte = floor($valorCompra / 100);
  $totalNumSorte = readTotalNumerosSorte($idCliente);

  if (($qtdNumSorte + $totalNumSorte) > $limite) {
    $qtdNumSorte = $qtdNumSorte - (($qtdNumSorte + $totalNumSorte) - $limite);
  }

  for ($i = 0; $i < $qtdNumSorte; $i++) {
    $validNumSorte = false;
    do {
      $numSorte = str_pad(random_int(0, 99999999), 8, '0', STR_PAD_LEFT);
      $query = $GLOBALS["db"]()->prepare('
      SELECT codigo_cupom
      FROM cupom
      WHERE codigo_cupom = ?
      ;');

      $query->bindParam(1, $numSorte, typeBind("str"));

      $query->execute();
      $validNumSorte = $query->rowCount() == 0;
    } while (!$validNumSorte);

    $query = $GLOBALS["db"]()->prepare("
    INSERT 
    INTO cupom (id_cliente, id_pedido, codigo_cupom) 
    VALUES (?, ?, ?)
    ");

    $query->bindParam(1, $idCliente, typeBind("str"));
    $query->bindParam(2, $idPedido, typeBind("str"));
    $query->bindParam(3, $numSorte, typeBind("str"));
    $query->execute();
  }

  return $qtdNumSorte;
}

function geraChances($idCliente, $qtdChances)
{
  $limite = 500;

  $query = $GLOBALS["db"]()->prepare('
  SELECT id_pedido_saldo, chances_disponiveis
  FROM pedido_saldo
  WHERE id_cliente = ?
  ;');

  $query->bindParam(1, $idCliente, typeBind("str"));

  $query->execute();

  $hasPedidoSaldo = $query->rowCount() > 0;

  $pedidoSaldo = $query->fetch(PDO::FETCH_ASSOC);

  $qtdChances = $qtdChances + ($hasPedidoSaldo ? $pedidoSaldo['chances_disponiveis'] : 0);

  if ($qtdChances > $limite) $qtdChances = $limite;

  if ($hasPedidoSaldo) {
    $query = $GLOBALS["db"]()->prepare('
    UPDATE pedido_saldo
    SET chances_disponiveis = ?
    WHERE id_cliente = ?
    ;');
  } else {
    $query = $GLOBALS["db"]()->prepare('
      INSERT INTO pedido_saldo 
      (chances_disponiveis, id_cliente) VALUES (?, ?);');
  }

  $query->bindParam(1, $qtdChances, typeBind("str"));
  $query->bindParam(2, $idCliente, typeBind("str"));

  $query->execute();

  return $qtdChances;
}
