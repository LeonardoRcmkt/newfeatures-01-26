<?php

$GLOBALS["db"] = function () {
    if (!isset($GLOBALS["timeModels"]["DataBase"])) $GLOBALS["timeModels"]["DataBase"] = microtime(true);
    if (!isset($GLOBALS["PDO"])) $GLOBALS["PDO"] = new PDO(...json_decode($_ENV["ENVIRONMENT"] == "development/test" ? $_ENV["HOMO_DB"] : $_ENV["PROD_DB"], true));

    return $GLOBALS["PDO"];
};

// $GLOBALS["db"] = function () {
//     if (!isset($GLOBALS["timeModels"]["DataBase"])) {
//         $GLOBALS["timeModels"]["DataBase"] = microtime(true);
//     }

//     if (!isset($GLOBALS["PDO"])) {
//         // Certifique-se de que json_decode retorna um array
//         $dbConfig = json_decode(
//             $_ENV["ENVIRONMENT"] == "development/test" ? $_ENV["HOMO_DB"] : $_ENV["PROD_DB"],
//             true // Força o retorno como array
//         );

//         if (!is_array($dbConfig)) {
//             throw new Exception("Erro ao decodificar as configurações do banco de dados. Certifique-se de que o JSON está correto.");
//         }

//         $GLOBALS["PDO"] = new PDO(...$dbConfig); // Agora $dbConfig é um array válido
//     }


//     return $GLOBALS["PDO"];
// };



function typeBind($key)
{
    switch ($key) {
        case 'str':
            return PDO::PARAM_STR;
        case 'nome':
            return PDO::PARAM_STR;
        case 'sexo':
            return PDO::PARAM_STR;
        case 'email':
            return PDO::PARAM_STR;
        case 'dt_nascimento':
            return PDO::PARAM_STR;
        case 'dt_cadastro':
            return PDO::PARAM_STR;
        case 'complemento':
            return PDO::PARAM_STR;
        case 'endereco':
            return PDO::PARAM_STR;
        case 'bairro':
            return PDO::PARAM_STR;
        case 'cidade':
            return PDO::PARAM_STR;
        case 'uf':
            return PDO::PARAM_STR;
        case 'senha_acesso':
            return PDO::PARAM_STR;
        case 'politica_privacidade':
            return PDO::PARAM_BOOL;
        case 'leu_aceitou_regulamento':
            return PDO::PARAM_BOOL;
        case 'receberMensagens':
            return PDO::PARAM_BOOL;
        case 'number':
            return PDO::PARAM_INT;
        case 'numero_endereco':
            return PDO::PARAM_INT;
        case 'cep':
            return PDO::PARAM_INT;
        case 'cependereco':
            return PDO::PARAM_INT;
        case 'numero_documento':
            return PDO::PARAM_INT;
        case 'int':
            return PDO::PARAM_INT;
        case 'bool':
            return PDO::PARAM_BOOL;
        case 'ativo':
            return PDO::PARAM_BOOL;
        case 'null':
            return PDO::PARAM_NULL;
        case 'id':
            return PDO::PARAM_INT;
        case 'career_id':
            return PDO::PARAM_INT;
        case 'name':
            return PDO::PARAM_STR;
        case 'idPedido':
            return PDO::PARAM_INT;
        case 'cnpjFilial':
            return PDO::PARAM_INT;
        case 'idClient':
            return PDO::PARAM_INT;
        case 'phone':
            return PDO::PARAM_STR;
        case 'whatsapp':
            return PDO::PARAM_STR;
        case 'telefone':
            return PDO::PARAM_STR;
        case 'email':
            return PDO::PARAM_STR;
        case 'linkedin':
            return PDO::PARAM_STR;
        case 'portfolio':
            return PDO::PARAM_STR;
        case 'resume':
            return PDO::PARAM_STR;
        case 'company':
            return PDO::PARAM_STR;
        case 'department':
            return PDO::PARAM_STR;
        case 'subject':
            return PDO::PARAM_STR;
        case 'pin_recupera_senha':
            return PDO::PARAM_STR;
        case 'dt_envio_email_redefinicao_senha':
            return PDO::PARAM_STR;
        case 'hora_envio_email_redefinicao_senha':
            return PDO::PARAM_STR;
        case 'token':
            return PDO::PARAM_STR;
        case 'nome_fantasia':
            return PDO::PARAM_STR;
        case 'cpf_responsavel':
            return PDO::PARAM_INT;
        case 'endereco_sede':
            return PDO::PARAM_STR;
        case 'razao_social':
            return PDO::PARAM_STR;

        default:
            return PDO::PARAM_NULL;
    }
}


$files_path = glob(__DIR__ . '/*.php');
if ($files_path !== false) {
    foreach ($files_path as $file) {
        require_once $file;
    }
}
