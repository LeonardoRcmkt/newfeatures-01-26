<?php

function readMarcasParticipantesService($impulsionador)
{
    $isImpulsionador = '';
    if ($impulsionador) {
        $isImpulsionador = "WHERE produto_participante = 'I'";
    }
    // Array de marcas participantes
    return readMarcasParticipantesModel($isImpulsionador);
}
