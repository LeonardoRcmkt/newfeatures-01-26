<?php


require_once("src/services/info.php");


function readBranchesController() { send_response(readBranchesService(), 200); }

function readFaqController() { send_response(readFaqService(), 200); }

function readCampaignController() { send_response(readCampaignService(), 200); }

