<?php


function createRouletteModel($idClient, $idAward, $token)
{
    $db = $GLOBALS["db"]();

    $query = $db->prepare('
    INSERT
    INTO roleta (id_cliente, id_premio, token)
    VALUES (?, ?, ?);');

    $query->bindParam(1, $idClient, typeBind("str"));
    $query->bindParam(2, $idAward, typeBind("str"));
    $query->bindParam(3, $token, typeBind("str"));

    $query->execute();

    $GLOBALS["metrics"]("createRouletteModel");
    return $db->lastInsertId();
}
