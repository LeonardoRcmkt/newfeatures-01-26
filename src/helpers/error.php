<?php


// Funções de captura de erros e exceções
set_error_handler("errorHandler");
set_exception_handler("errorHandler");


function errorHandler($errno, $errstr = false, $errfile = false, $errline = false)
{
  // Pega o tipo do erro/exceção
  $errorIsObj = gettype($errno) == "object";

  // Formata a resposta em razão do erro/exceção
  $errorMessage = array(
    "code" => $errorIsObj ? $errno->getCode() : $errno,
    "message" => $errorIsObj ? $errno->getMessage() : $errstr,
    "file" => $errorIsObj ? $errno->getFile() : $errfile,
    "line" => $errorIsObj ? $errno->getLine() : $errline,
  );
  
  // No caso de disparo manual de erro, formata a resposta e status code pela mensagem do erro
  if(preg_match('/^(\d+):/', $errorIsObj ? $errno->getMessage() : $errstr, $matches))
  $errorMessage["message"] = substr($errorMessage["message"], 5);
 
  // Responde a requisição com o erro/exceção tratado em mensagem e status.
  send_response($errorMessage, isset($matches[1]) ? $matches[1] : 500);
}
