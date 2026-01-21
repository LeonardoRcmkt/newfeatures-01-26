<?php

class Route
{

  protected $method;
  protected $route;


  // Construção do objeto
  public function __construct($method, $route)
  {
    $this->method = $method;
    $this->route = $route;
  }


  // Método para retorno de informações do requisitante
  private function request()
  {
    $request = [
      "query" => [],
      "body" => json_decode(file_get_contents('php://input'), true),
      "payload" => decrypt()
    ];

    parse_str($_SERVER['QUERY_STRING'], $request["query"]);

    $request["query"] = array_filter($request["query"], function ($element) {
      return $element !== "";
    });

    return $request;
  }


  // Método que roda as funções recebidas
  private function roll($callbacks)
  {
    foreach ($callbacks as $callback) {
      $callback($this->request());
    }
  }

  // Métodos para cada verbo http permitido, recebe a rota e as funções que deve rodar sequencial
  public function get($route, ...$callbacks)
  {
    if ($this->method == "GET" && $this->route == $route) $this->roll($callbacks);
  }
  public function post($route, ...$callbacks)
  {
    if ($this->method == "POST" && $this->route == $route) $this->roll($callbacks);
  }
  public function put($route, ...$callbacks)
  {
    if ($this->method == "PUT" && $this->route == $route) $this->roll($callbacks);
  }
  public function delete($route, ...$callbacks)
  {
    if ($this->method == "DELETE" && $this->route == $route) $this->roll($callbacks);
  }
}
