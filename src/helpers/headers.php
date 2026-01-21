<?php

date_default_timezone_set('America/Sao_Paulo');

header("Access-Control-Allow-Origin: " . $_ENV["ALLOW_ORIGIN"]);
header("Access-Control-Allow-Headers: Authorization, authorization, content-type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('content-type: application/json; charset=utf-8');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('X-Content-Type-Options: nosniff');
