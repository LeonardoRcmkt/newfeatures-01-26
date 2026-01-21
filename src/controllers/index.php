<?php

// debug
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// ini_set('error_reporting', E_ALL);


// faz a requisição de todos os arquivos *.php do diretório atual
$files_path = glob(__DIR__ . '/*.php');
if ($files_path !== false) {
    foreach ($files_path as $file) {
        require_once $file;
    }
}

// Validadores e dependências para os controladores  
require_once("src/helpers/Route.php");
require_once("src/helpers/validations.php");
require_once("src/helpers/format.php");
require_once("src/helpers/auth.php");

// Instanciação de objeto para controle dos controladores
$route = new Route($METHOD, $ROUTE);

// USER routes
$route->get("/user", "isAuthorized", "readUserController");
$route->post("/user", "isCampanhaActive", "createUserController");
$route->put("/user", "isAuthorized", "updateUserController");
$route->put("/password", "isAuthorized", "updatePasswordController");
$route->delete("/user", "isAuthorized", "deleteUserController");

// LOGIN routes
$route->get("/login", "readLoginController");
$route->post("/login", "loginController");

// RECOVERY routes
$route->post("/recovery", "recoveryEmailController");
$route->put("/recovery", "recoveryPinController");

// GAME routes
$route->get("/game", "isAuthorized", "readGameController");
$route->post("/game", "isAuthorized", "createGameController");

// COUPON routes
$route->get("/coupon", "isAuthorized", "readAllCouponsController");
$route->post("/coupon", "isAuthorized", "isCampanhaActive", "createCouponController");

// AWARD routes
$route->get("/award", "isAuthorized", "readAwardController");

// SAC routes
$route->post("/sac", "createSacController");

// FAQ routes
$route->get("/faq", "readFaqController");

// Campaign routes
$route->get("/campaign", "readCampaignController");

// Winner routes
$route->get("/winner", "readWinnerController");
$route->get("/winner-instant", "readInstantWinnerController");

// Products routes
$route->get("/products", "readProductsController");

// Industry routes
$route->get("/industry-brands", "readBuscaMarcaIndustria");
$route->get("/industry-banners", "readIndustryBannersController");

// Filiais routes
$route->get("/branches", "readBranchesController");

// Copercana routes
$route->get("/copercana", "readAllUsersCopercanaController");
$route->post("/copercana", "createUserCopercanaController");

// ComercialESP routes
$route->get("/comercialesp", "consultaChaveCMLController");
$route->post("/comercialesp", "fixCMLController");
$route->get("/brands", "readBrandsController");

$route->get("/cmlatacado", "updatePedidosController");

$route->get( '/marcas', 'readMarcasParticipantesController');

// Nao colocar o isCampanhaActive porque os premios sao debitados mesmo depois da campanha finalizada
$route->get("/integration-to-hub-to-pay", "runIntegrationWithHub4Pay");
$route->post("/hub", "hub4PayController");

// Resposta padrão para rota inexistente
send_response("Verifique o endpoint.", 404);
