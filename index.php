<?php


require_once("src/helpers/metrics.php"); // Variáveis Globais para calculo de tempo de execução

require_once("vendor/autoload.php"); // Carrega as dependências e variáveis de ambiente presente no arquivo .env na raiz
Dotenv\Dotenv::createImmutable(__DIR__)->load();

require_once("src/helpers/response.php"); // Funções para resposta padrão
require_once("src/helpers/error.php"); // Funções que gerencia exceções lançadas manualmente ou pelo runtime
require_once("src/helpers/headers.php"); // Headers da resposta requisição 
require_once("src/helpers/helmet.php"); // Funções para segurança da requisição
require_once("src/helpers/utils.php"); // Funções para segurança da requisição

require_once("src/controllers/index.php"); // Chama os controladores
