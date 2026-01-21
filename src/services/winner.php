<?php

require_once("src/models/modelConfig.php");


function readWinnerService()
{ 
    $winners = readWinnerModel();

    for ($i=0; $i<count($winners); $i++) { 
        $winners[$i]["numero_documento"] = preg_replace('/(\d{3})\d+(\d{2}|\d{3})(\d{2})/', '$1xxxxxxx$3', $winners[$i]["numero_documento"]);
    }

    return $winners;
}

function readInstantWinnerService()
{ 
    $winners = readInstantWinnerModel();

    for ($i=0; $i<count($winners); $i++) { 
        $winners[$i]["numero_documento"] = preg_replace('/(\d{3})\d+(\d{2}|\d{3})(\d{2})/', '$1xxxxxxx$3', $winners[$i]["numero_documento"]);
    }

    return $winners;
}

function readAwardService($idclient) { return readAwardModel($idclient); }
