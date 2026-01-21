<?php

require_once("src/services/products.php");


function readProductsController(): void { send_response(readProductsService(), 200); }
