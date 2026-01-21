<?php

$GLOBALS["passCount"] = 1; // Contagem de passos para cada chamada
$GLOBALS["timeAPI"] = microtime(true); // tempo total API
$GLOBALS["timeModels"] = [];   
$GLOBALS["timeTrafficLimit"] = 0;

// Função p/ registrar tempo de execução desde o momento de chamada
$GLOBALS["metrics"] = function($var) {

    foreach ($GLOBALS["timeModels"] as $k => $v) {
        
    }

    // $GLOBALS["timeModels"]["connection"]
    $GLOBALS["timeModels"][$GLOBALS["passCount"]++."-".$var] = microtime(true);
};
