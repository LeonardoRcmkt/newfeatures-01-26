<?php


function readUserModel($param)
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT idcliente, numero_documento, nome, dt_nascimento, sexo, whatsapp, telefone, email, cependereco, endereco, numero_endereco, complemento, bairro, cidade, uf, receberMensagens
    FROM clientes 
    WHERE idcliente = ? AND ativo = 1 OR numero_documento = ? AND ativo = 1 OR email = ? AND ativo = 1 OR pin_recupera_senha = ? AND ativo = 1");

  for ($i = 1; $i <= 4; $i++) {
    $query->bindParam($i, $param, typeBind("str"));
  }

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readUserModel");
  return $result;
}

function readUserPreCadastroModel($param)
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT idcliente, numero_documento, nome, dt_nascimento, sexo, whatsapp, telefone, email, cependereco, endereco, numero_endereco, complemento, bairro, cidade, uf, receberMensagens
    FROM clientes 
    WHERE numero_documento = ? AND ativo = 2");

  $query->bindParam(1, $param, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readUserPreCadastroModel");
  return $result;
}

function readRecoveryPinUserModel($param)
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT idcliente, numero_documento, nome, dt_nascimento, sexo, whatsapp, telefone, email, cependereco, endereco, numero_endereco, complemento, bairro, cidade, uf, receberMensagens
    FROM clientes 
    WHERE pin_recupera_senha = ? AND ativo = 1");

  $query->bindParam(1, $param, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readUserModel");
  return $result;
}

function readAllUsersModel()
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT idcliente, numero_documento
    FROM clientes 
    WHERE ativo = 1");

  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readAllUserModel");
  return $result;
}

function readUserPWModel($param)
{
  // Login Usuário e Senha
  $query = $GLOBALS["db"]()->prepare("
    SELECT idcliente, numero_documento, nome, dt_nascimento, sexo, whatsapp, telefone, email, cependereco, endereco, numero_endereco, complemento, bairro, cidade, uf, senha_acesso, confirmar_senha_acesso, receberMensagens
    FROM clientes 
    WHERE (idcliente = ? OR numero_documento = ? OR email = ?) AND ativo = 1");


  for ($i = 1; $i <= 3; $i++) {
    $query->bindParam($i, $param, typeBind("str"));
  }

  // Login Token
  // $query = $GLOBALS["db"]()->prepare("
  //   SELECT idcliente, numero_documento, nome, dt_nascimento, sexo, whatsapp, telefone, email, cependereco, endereco, numero_endereco, complemento, bairro, cidade, uf, senha_acesso, confirmar_senha_acesso, receberMensagens
  //   FROM clientes 
  //   WHERE token = :token AND ativo = 1");

  // $query->bindValue(":token", $param, typeBind("str"));

  $query->execute();
  $result = $query->fetch(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readUserPWModel");
  return $result;
}


function createUserModel($user)
{
  $db = $GLOBALS["db"]();

  $fields = "";
  $values = "";

  foreach ($user as $k => $v) {
    $fields .= "$k, ";
    $values .= ":$k, ";
  }

  $fields = rtrim($fields, ', ');
  $values = rtrim($values, ', ');

  $query = $db->prepare("INSERT INTO clientes ($fields) VALUES ($values);");

  foreach ($user as $key => $value) {
    $query->bindValue(":$key", $value, typeBind($key));
  }

  $query->execute();

  $GLOBALS["metrics"]("createUserModel");
  return $db->lastInsertId();
}


function updateUserModel($idcliente, $user)
{
  $fields = "";

  foreach ($user as $k => $v) {
    if ($k != "idcliente") $fields .= "$k = :$k, ";
  }

  $fields = rtrim($fields, ', ');

  $query = $GLOBALS["db"]()->prepare("UPDATE clientes SET $fields WHERE idcliente = " . $idcliente);

  foreach ($user as $key => $value) {
    if ($key != "idcliente") $query->bindValue(":$key", $value, typeBind($key));
  }

  $query->execute();
  $result = $query->rowCount();

  $GLOBALS["metrics"]("updateUserModel");
  return $result;
}


function deleteUserModel($idcliente)
{
  $query = $GLOBALS["db"]()->prepare("
    UPDATE clientes
    SET ativo = 0
    WHERE idcliente = ?");

  $query->bindParam(1, $idcliente, typeBind("str"));
  $query->execute();
  $result = $query->rowCount();

  $GLOBALS["metrics"]("deleteUserModel");
  return $result;
}
