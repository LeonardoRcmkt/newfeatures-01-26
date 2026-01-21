<?php


function readWinnerModel()
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT TRIM(LEADING '0' FROM numero_documento) as numero_documento, nome, numero_da_sorte, dt_premio, filial, cnpj_filial, nome_premio
    FROM premio_ganhadores
    INNER JOIN premio_categoria
    ON premio_ganhadores.id_premio_categoria = premio_categoria.id
    ;");

  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readWinnerModel");
  return $result;
}


function readInstantWinnerModel()
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT clientes.nome, TRIM(LEADING '0' FROM clientes.numero_documento) as numero_documento, horarios_premios_instantaneos.dt_saida_premio, horarios_premios_instantaneos.desc_premio, filiais.nome_fantasia
    FROM horarios_premios_instantaneos
    INNER JOIN clientes
    ON horarios_premios_instantaneos.id_cliente = clientes.idcliente
    INNER JOIN filiais
    ON horarios_premios_instantaneos.cnpj_loja = filiais.cnpj_filial
    WHERE horarios_premios_instantaneos.premio_utilizado = 1
    ORDER BY dt_saida_premio
    ;");

  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readInstantWinnerModel");
  return $result;
}


function readAwardModel($idclient)
{
  $query1 = $GLOBALS["db"]()->prepare("
  SELECT horarios_premios_instantaneos.desc_premio, clientes.nome
  FROM horarios_premios_instantaneos
  JOIN clientes
  ON clientes.idcliente = horarios_premios_instantaneos.id_cliente
  WHERE clientes.idcliente = ?
  ;");

  $query1->bindParam(1, $idclient, typeBind("str"));

  $query1->execute();
  $result1 = $query1->fetchAll(PDO::FETCH_ASSOC);

  $query2 = $GLOBALS["db"]()->prepare("
    SELECT premio_ganhadores.id_premio_categoria as desc_premio,  
               clientes.nome
        FROM premio_ganhadores
        JOIN clientes 
            ON clientes.numero_documento = premio_ganhadores.numero_documento
        WHERE clientes.idcliente = ?
  ;");

  $query2->bindParam(1, $idclient, typeBind("str"));

  $query2->execute();
  $result2 = $query2->fetchAll(PDO::FETCH_ASSOC);

  $mergedResult = array_merge($result1, $result2);

  // Retorna o resultado combinado
  
  $GLOBALS["metrics"]("readAwardModel");
  return $mergedResult;
}


function createGameModel($idPedido, $cnpjFilial, $idClient)
{
  $db = $GLOBALS["db"]();

  $query = $db->prepare('
    SELECT
      premios_permitidos.desc_premio
    FROM
      (SELECT 
        desc_premio,
      CASE 
            WHEN desc_premio = 10 THEN 20
            ELSE 1 
        END AS qtd
      FROM 
        horarios_premios_instantaneos
      GROUP BY
        desc_premio
      ) premios_permitidos
    LEFT JOIN 
      (SELECT 
        desc_premio, 
        COUNT(id_premio_instantaneo) AS qtd
      FROM 
        horarios_premios_instantaneos 
      WHERE 
        id_cliente = :idClient 
      GROUP BY 
        desc_premio) 
    AS premios_clientes ON premios_permitidos.desc_premio = premios_clientes.desc_premio
    WHERE
      IFNULL(premios_clientes.qtd, 0) < premios_permitidos.qtd;
  ');
  $query->bindValue(":idClient", $idClient, typeBind("idClient"));

  $query->execute();

  $prizes = $query->fetchAll(PDO::FETCH_COLUMN);

  array_push($prizes, 'default');

  foreach ($prizes as $key => $value) {
    $prizes[$key] = "'$value'";
  }

  $prizes = implode(',', $prizes);

  $query = "UPDATE horarios_premios_instantaneos
    SET premio_utilizado = 1, id_pedido = :idPedido, cnpj_loja = IF(cnpj_loja IS NULL, :cnpjFilial, cnpj_loja), id_cliente = :idClient, dt_saida_premio = NOW()
    WHERE id_premio_instantaneo = (
      SELECT x.* FROM (
        SELECT @update_id := id_premio_instantaneo
        FROM horarios_premios_instantaneos
        WHERE premio_utilizado IS NULL
        AND data_hora_premio < CURRENT_TIMESTAMP()
        AND (cnpj_loja IN (SELECT cnpj_filial FROM pedido p WHERE id_cliente = :idClient GROUP BY cnpj_filial) OR cnpj_loja IS NULL)
        AND desc_premio IN ($prizes)
        ORDER BY data_hora_premio ASC
        LIMIT 1
        ) x
      )
    ;
  ";

  $query = $db->prepare($query);

  $query->bindValue(":idPedido", $idPedido, typeBind("idPedido"));
  $query->bindValue(":cnpjFilial", $cnpjFilial, typeBind("cnpjFilial"));
  $query->bindValue(":idClient", $idClient, typeBind("idClient"));

  $query->execute();

  $query = $db->prepare('
  SELECT IFNULL(@update_id, NULL) AS id_premio_instantaneo
  ');

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("createGameModel");
  return $result['id_premio_instantaneo'];
}


function getAwardModel()
{

  $query = $GLOBALS["db"]()->prepare('
  SELECT IFNULL(@update_id, NULL) AS id_premio_instantaneo
  ');


  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("getAwardModel");
  return $result;
}


function readVoucherModel($voucher)
{
  $query = $GLOBALS["db"]()->prepare("
  SELECT id_premio_instantaneo, desc_premio
  FROM horarios_premios_instantaneos
  WHERE vale_compras = ?
  ;");

  $query->bindParam(1, $voucher, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readVoucherModel");
  return $result;
}


function updateVoucherModel($voucher, $idAward)
{
  $query = $GLOBALS["db"]()->prepare("
  UPDATE horarios_premios_instantaneos
  SET vale_compras = ?
  WHERE id_premio_instantaneo = ?
  ;");

  $query->bindParam(1, $voucher, typeBind("str"));
  $query->bindParam(2, $idAward, typeBind("str"));

  $query->execute();
  $result = $query->rowCount();

  $GLOBALS["metrics"]("createVoucherModel");
  return $result;
}


function updateRouletteModel($rouletteID, $clientID)
{
  $query = $GLOBALS["db"]()->prepare("
  UPDATE horarios_premios_instantaneos
  SET id_roleta = ?
  WHERE id_premio_instantaneo = ?
  ;");

  $query->bindParam(1, $rouletteID, typeBind("str"));
  $query->bindParam(2, $clientID, typeBind("str"));

  $query->execute();
  $result = $query->rowCount();

  $GLOBALS["metrics"]("updateRouletteModel");
  return $result;
}
