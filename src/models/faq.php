<?php


function readFaqModel()
{
  $query = $GLOBALS["db"]()->prepare("
    SELECT faq.ds_pergunta, faq.ds_resposta, faq_categoria.ds_nome_categoria
    FROM faq
    LEFT JOIN faq_categoria ON faq_categoria.id_faq_categoria = faq.id_faq_categoria
    ;");
  
  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  $GLOBALS["metrics"]("readFaqModel");
  return $result;
}
