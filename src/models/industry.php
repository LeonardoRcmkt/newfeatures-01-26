<?php


function readIndustryBannersModel()
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT ib.nome_arquivo, ib.marca, ib.caminho_arquivo, ib.layout, ib.posicao_exibe, ib.data_inicio_exibe_site, ib.data_fim_exibe_site, ib.status_exibicao
    FROM tbl_slides_industria as ib
    ORDER BY RAND()
    ;");

  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readIndustryBannersModel");
  return $result;
}
