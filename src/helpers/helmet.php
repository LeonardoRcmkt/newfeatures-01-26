<?php

require_once("src/models/tblAudi.php");


$ROUTE = $_SERVER['REDIRECT_URL'];
$METHOD = $_SERVER["REQUEST_METHOD"];

// regras, pré-flight e limitações CORS.
if($METHOD == "OPTIONS") send_response();
if(!in_array($METHOD, ["GET", "POST", "PUT", "DELETE"])) send_response("Method Not Allowed", 405);


requestsTrafficLimit($_SERVER['REMOTE_ADDR']); // Limitador de 1 segundo para cada requisição por IP
