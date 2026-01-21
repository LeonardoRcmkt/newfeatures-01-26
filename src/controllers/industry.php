<?php

require_once("src/services/industry.php");


function readIndustryBannersController(): void { send_response(readIndustryBannersService(), 200); }
