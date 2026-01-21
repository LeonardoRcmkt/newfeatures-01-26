<?php


function readCampaignModel()
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT *
    FROM configuracao_campanha
    ;");

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readCampaignModel");
  return $result;
}

function readFilialDB($cnpjfilial)
{
  $query = $GLOBALS["db"]()->prepare('
    SELECT cnpj_filial
    FROM filiais
    WHERE cnpj_filial = ?
    ;');

  $query->bindParam(1, $cnpjfilial, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readFilialDB");
  return $result;
}

function readCodigoPedido($coupon)
{
  $query = $GLOBALS["db"]()->prepare('
                                SELECT id_pedido
                                FROM pedido
                                WHERE codigo_pedido = ?
                                ;');

  $query->bindParam(1, $coupon, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readCodigoPedido");
  return $result;
}

function createSaldo($clienteID, $total_chances_da_compra_com_prod_participante)
{


  $query = $GLOBALS["db"]()->prepare('
                                  SELECT chances_disponiveis
                                  FROM pedido_saldo
                                  WHERE id_cliente = ?
                                  ;');

  $query->bindParam(1, $clienteID, typeBind("str"));

  $query->execute();
  $resultsaldochances = $query->fetch(PDO::FETCH_ASSOC);

  if (isset($resultsaldochances['chances_disponiveis'])) {

    $atualizar_chances = $resultsaldochances['chances_disponiveis'] + $total_chances_da_compra_com_prod_participante;

    $query = $GLOBALS["db"]()->prepare("
                                  UPDATE 
                                    pedido_saldo
                                  SET 
                                    chances_disponiveis = ?
                                  WHERE 
                                    id_cliente = ?
                                ");

    $query->bindParam(1, $atualizar_chances, typeBind("str"));
    $query->bindParam(2, $clienteID, typeBind("str"));

    $query->execute();
  } else {

    $query = $GLOBALS["db"]()->prepare("
                                  INSERT 
                                  INTO pedido_saldo 
                                    (id_cliente, chances_disponiveis) 
                                  VALUES 
                                    (?, ?)
                              ");

    $query->bindParam(1, $clienteID, typeBind("str"));
    $query->bindParam(2, $total_chances_da_compra_com_prod_participante, typeBind("str"));

    $query->execute();
  }
}

function totalprodutosParticipantes($pedidoID, $tipoproduto)
{


  $query = $GLOBALS["db"]()->prepare('
                                      SELECT COUNT(qtd_comprada) as totalProdutosParticipantes 
                                      FROM pedido_produto
                                      WHERE id_pedido = ?
                                      AND produto_participante = ?
                                    ;');

  $query->bindParam(1, $pedidoID, typeBind("str"));
  $query->bindParam(2, $tipoproduto, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("produtosParticipantes");

  return $result;
}


function gerarNumerosSorte($clienteID, $pedidoID, $total_num_sorte_para_gerar)
{

  //  Busando o limite de numeros da sorte para gerar
  $campaign = readCampaignModel();
  $limiteNumerosdaSorte_gerar = $campaign["limitador_numero_sorte"];


  //  Configuracao da serie do numero da sorte
  for ($i = 00; $i <= 99; $i++) {
    $series[] = $i;
  }


  for ($i = 0; $i < $total_num_sorte_para_gerar; $i++) {

    // ROTINA PARA GERAR O CÓDIGO
    do {

      $break = false;

      // BUSCANDO O TOTAL DE NUMEROS DA SORTE DO CLIENTE
      $query = $GLOBALS["db"]()->prepare('
          SELECT codigo_cupom
          FROM cupom
          WHERE id_cliente = ?
          ;');

      $query->bindParam(1, $clienteID, typeBind("str"));

      $query->execute();
      $buscaCupomCadastrados = $query->rowCount();
      // $resultNumeroSorteExiste = $query->fetch(PDO::FETCH_ASSOC);

      // VERIFICANDO SE TEM MAIS DE 300 NÚMEROS CADASTRADOS
      if ($buscaCupomCadastrados <= $limiteNumerosdaSorte_gerar) {

        //  gerando codigo da sorte
        $codigo = geraCodigosLoteriaSerieAleatoria($series);

        // BUSCANDO CUPOM CADASTRADOS
        $query = $GLOBALS["db"]()->prepare('
              SELECT codigo_cupom
              FROM cupom
              WHERE codigo_cupom = ?
              ;');

        $query->bindParam(1, $codigo, typeBind("str"));

        $query->execute();
        $buscaCupomCadastrados1 = $query->rowCount();
        // $resultNumeroSorteExiste = $query->fetch(PDO::FETCH_ASSOC);


        // VERIFICANDO SE O CÓDIGO NÃO EXISTE
        if ($buscaCupomCadastrados1 == 0) {

          // ENCERRANDO O DOWHILE
          $break = true;

          // CADASTRANDO CÓDIGO PARA O CLIENTE
          $query = $GLOBALS["db"]()->prepare("
                  INSERT 
                  INTO cupom (id_cliente, id_pedido, codigo_cupom) 
                  VALUES (?, ?, ?)
                ");

          $query->bindParam(1, $clienteID, typeBind("str"));
          $query->bindParam(2, $pedidoID, typeBind("str"));
          $query->bindParam(3, $codigo, typeBind("str"));

          $query->execute();
        }
      } else { // TEM MAIS DE NÚMEROS

        // QUBRANDO TODA EXECUÇÃO DO SCRIPT
        $break = true;
        // $i = $buscaSaldoPedido->total_numeros_sorte;
      }
    } while ($break == false);
  }
}

function apenasNumeros($str)
{
  return preg_replace('/[^0-9]/', '', $str);
}
