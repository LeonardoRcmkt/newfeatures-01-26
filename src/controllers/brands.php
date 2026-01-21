<?php

require_once("src/services/brands.php");


function readBrandsController() { send_response(readBrandsService(), 200); }
