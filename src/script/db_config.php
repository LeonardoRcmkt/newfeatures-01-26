<?php
// Configurações do Banco de Dados

$db_host = '177.53.141.104'; // Endereço do servidor de banco de dados
$db_name = 'stmc25mmcapi_base'; // Nome do banco de dados
$db_user = 'stmc25mmcapi_user'; // Usuário do banco de dados
$db_password = '@Brspowd9123xp2e'; // Senha do banco de dados

// Configuração da conexão com PDO

try {
    $GLOBALS['db'] = function () use ($db_host, $db_name, $db_user, $db_password) {
        $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_PERSISTENT => false, // Definir como true para conexões persistentes, se necessário
        ];

        return new PDO($dsn, $db_user, $db_password, $options);
    };

    echo "Conexão com o banco de dados estabelecida com sucesso.\n";
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
