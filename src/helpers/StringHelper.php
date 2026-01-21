<?php

class StringHelper
{
    public static function removeAccentFromWord(string $word): string
    {
        if (!is_string($word)) {
            return '';
        }

        $word = preg_replace('/[áàãâä]/ui', 'a', $word);
        $word = preg_replace('/[éèêë]/ui', 'e', $word);
        $word = preg_replace('/[íìîï]/ui', 'i', $word);
        $word = preg_replace('/[óòõôö]/ui', 'o', $word);
        $word = preg_replace('/[úùûü]/ui', 'u', $word);
        $word = preg_replace('/[ç]/ui', 'c', $word);
        return $word;
    }

    public static function formatCPF($cpf)
    {
        // Remove caracteres não numéricos
        $cpf = preg_replace('/\D/', '', $cpf);

        // Se o CPF tiver mais de 11 dígitos, mantém apenas os 11 últimos
        if (strlen($cpf) > 11) {
            $cpf = substr($cpf, -11);
        }

        // Garante que o CPF tenha exatamente 11 dígitos
        $cpf = str_pad($cpf, 11, "0", STR_PAD_LEFT);

        return $cpf;
    }

    public static function  cleanObjectString(string $input): string
    {
        if (!is_string($input)) {
            return '';
        }
        return preg_replace('/[^a-zA-Z0-9 ]/', '', $input);
    }

    public static function removeZeroOnFrontOfString(string $str): string
    {
        // Remove os zeros à esquerda
        $str = ltrim($str, '0');

        // Preenche com zeros à esquerda até ter 11 caracteres
        return str_pad($str, 11, '0', STR_PAD_LEFT);
    }

    // Funções adicionadas para formatação
    public static function formatPhone($phone)
    {
        return "+55" . preg_replace('/\D/', '', $phone); // Remove não numéricos
    }

    public static function formatAddress($address, $neighborhood, $city, $state)
    {
        // Verifica se o parâmetro $address é um array e se contém os índices necessários


        return [];
    }



    public static function formatBalance($balanceData, $balanceTypeId)
    {
        return [
            "balanceTypeId" => $balanceTypeId,
            "amount" => intval($balanceData * 100), // Converte para centavos
        ];
    }

    public static function formatBirthdate($birthdate)
    {
        return date("Y-m-d\TH:i:s.v\Z", strtotime($birthdate));
    }
}
