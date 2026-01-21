<?php


function readBranchModel($cnpj)
{
  $query = $GLOBALS["db"]()->prepare("
  SELECT idfilial
  FROM filiais
  WHERE cnpj_filial = ?
  ;");

  $query->bindParam(1, $cnpj, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readBranchModel");
  return $result;
}

function readBranchesModel()
{
  $query = $GLOBALS["db"]()->prepare("
  SELECT 
    idfilial,
    rede,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    cep,
    cnpj_filial
  FROM 
    filiais
  ;");

  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readBranchesModel");
  return $result;
}

function readFilialModel($cnpj)
{
  $query = $GLOBALS["db"]()->prepare("
  SELECT *
  FROM filiais
  WHERE cnpj_filial = ?
  ;");

  $query->bindParam(1, $cnpj, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readFilialhModel");
  return $result;
}
