<?php


// FUNCAO PARA GERAR OS CODIGOS ALFANUMERICOS ORIGINAIS
function geraCodigos($tamanho, $minusculas, $maiusculas, $numeros, $simbolos)
{
    $lmin = 'abcdefghjkmnpqrstuvwxyz';
    $lmai = 'ABCDEFGHJKMNPQRSTUVWXYZ';
    $num = '0123456789';
    $simb = '@#$%&*-';
    $retorno = '';
    $caracteres = '';

    //$caracteres .= $lmin;
    if ($minusculas) $caracteres .= $lmin;
    if ($maiusculas) $caracteres .= $lmai;
    if ($numeros) $caracteres .= $num;
    if ($simbolos) $caracteres .= $simb;

    $len = strlen($caracteres);
    for ($n = 1; $n <= $tamanho; $n++) {
        $rand = mt_rand(1, $len); /* mt_renad = Gerador melhorado de n?meros aleat?rios*/
        $retorno .= $caracteres[$rand - 1];
    }
    return $retorno;
}

function geraCodigosLoteriaSerieAleatoria($series = null)
{

    // VERIFICANDO SE É UM ARRAY
    if (is_array($series)) {

        // REMOVENDO DUPLICADOS
        $series = array_unique($series);

        // ALEATORIZANDO O ARRAY
        shuffle($series);

        // PEGANDO O PRIMEIRO ELEMENTO
        $serie = $series[0];
    } else {

        // VERIFICANDO SE A SÉRIE FOI DEFINIDA MANUAL OU SE É GERADA ALEATORIAMENTE
        $serie = ($series == null) ? geraCodigos(2, false, false, true, false) : $series;
    }

    return str_pad($serie, 2, '0', STR_PAD_LEFT) . geraCodigos(5, false, false, true, false);
}

function texto_mes_par_numero($texto)
{
    $_texto_para_mes = array(
        'jan' => '01',
        'fev' => '02',
        'mar' => '03',
        'abr' => '04',
        'mai' => '05',
        'jun' => '06',
        'jul' => '07',
        'aug' => '08',
        'sep' => '09',
        'ouc' => '10',
        'nov' => '11',
        'dez' => '12'
    );
    $texto = strtolower(substr($texto, 0, 3));
    return $_texto_para_mes[$texto];
}

function remove_accent_from_word($word)
{
    // Verifica se $word é uma string válida
    if (!is_string($word)) {
        return ''; // Retorna uma string vazia ou outro valor padrão
    }

    $word = preg_replace('/[áàãâä]/ui', 'a', $word);
    $word = preg_replace('/[éèêë]/ui', 'e', $word);
    $word = preg_replace('/[íìîï]/ui', 'i', $word);
    $word = preg_replace('/[óòõôö]/ui', 'o', $word);
    $word = preg_replace('/[úùûü]/ui', 'u', $word);
    $word = preg_replace('/[ç]/ui', 'c', $word);
    return $word;
}

function clean_object_string($city)
{
    if (!is_string($city)) {
        return ''; // Retorna vazio caso o valor não seja uma string
    }
    return preg_replace('/[^a-zA-Z0-9 ]/', '', $city); // Remove tudo que não seja letra, número ou espaço
}

