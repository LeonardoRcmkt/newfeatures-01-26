<?php

require_once("src/models/mail/index.php");


function sendEmail($body)
{
    $data = array(
        "host" => $_ENV["MAIL_HOST"],
        "smtpauth" => $_ENV["MAIL_SMTP_AUTH"] ? true : false,
        "username" => $_ENV["MAIL_USERNAME"],
        "password" => $_ENV["MAIL_PASSWORD"],
        "smtpsecure" => $_ENV["MAIL_SMTP_SECURE"],
        "port" => $_ENV["MAIL_PORT"],
        "addaddress" => $body["to"],
        "setfrom_address" => $body["from_email"],
        "setfrom_name" => $body["from_name"],
        "ishtml" => $_ENV["MAIL_IS_HTML"] ? true : false,
        "subject" => $body["subject"],
        "body" => $body["html"]
    );

    $ch = curl_init($_ENV["MAIL_URL"]);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);

    curl_close($ch);

    $GLOBALS["metrics"]("sendEmail");
    return $response;
}

function sendEmailReq($body)
{
    $data = array(
        "host" => $_ENV["MAIL_REQ_HOST"],
        "smtpauth" => $_ENV["MAIL_REQ_SMTP_AUTH"] ? true : false,
        "username" => $_ENV["MAIL_REQ_USERNAME"],
        "password" => $_ENV["MAIL_REQ_PASSWORD"],
        "smtpsecure" => $_ENV["MAIL_REQ_SMTP_SECURE"],
        "port" => $_ENV["MAIL_REQ_PORT"],
        "addaddress" => $body["to"],
        "setfrom_address" => $_ENV["MAIL_REQ_FROM"],
        "setfrom_name" => $body["from_name"],
        "ishtml" => $_ENV["MAIL_REQ_IS_HTML"] ? true : false,
        "subject" => $body["subject"],
        "body" => $body["html"]
    );

    $ch = curl_init($_ENV["MAIL_REQ_URL"]);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);

    curl_close($ch);

    $GLOBALS["metrics"]("sendEmail");
    return $response;
}

function mailgrid(array $payload) {

    // Lê variáveis de ambiente (use Dotenv ou defina no ambiente do servidor)
    $apiUrl      = $_ENV['MAILGRID_API_URL'];
    $apiToken    = $_ENV['MAILGRID_TOKEN'];

    $hostSMTP    = $_ENV['SMTP_HOST'];
    $usuarioSMTP = $_ENV['SMTP_USER'];
    $senhaSMTP   = $_ENV['SMTP_PASS'];

    // Valida SMTP do .env
    foreach (['SMTP_HOST' => $hostSMTP, 'SMTP_USER' => $usuarioSMTP, 'SMTP_PASS' => $senhaSMTP] as $k => $v) {
        if (empty($v)) {
            return [
                'ok' => false,
                'error' => "Variável de ambiente {$k} não definida."
            ];
        }
    }

    // Campos vindos do payload
    $to         = $payload['to']         ?? null; // string|array
    $fromName   = $payload['from_name']  ?? '';
    $fromEmail  = $payload['from_email'] ?? '';
    $subject    = $payload['subject']    ?? '';
    $html       = $payload['html']       ?? '';

    // Valida payload mínimo
    if (empty($to) || empty($fromEmail) || empty($subject) || empty($html)) {
        return [
            'ok' => false,
            'error' => 'Campos obrigatórios faltando no payload: to, from_email, subject, html.'
        ];
    }

    // Normaliza destinatários como array
    if (is_string($to)) {
        $to = [$to];
    } elseif (!is_array($to)) {
        return ['ok' => false, 'error' => 'Campo "to" deve ser string ou array.'];
    }

    // Monta body conforme seu contrato
    $body = [
        'host_smtp'      => $hostSMTP,
        'usuario_smtp'   => $usuarioSMTP,
        'senha_smtp'     => $senhaSMTP,
        'emailRemetente' => $fromEmail,
        'nomeRemetente'  => $fromName,
        'emailDestino'   => array_values($to),
        'assunto'        => $subject,
        'mensagem'       => $html,
    ];

    // Init cURL
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Cabeçalhos
    $headers = ['Content-Type: application/json'];
    if (!empty($apiToken)) {
        // ajuste se a API do MailGrid exigir outro esquema (ex.: "Token xxxxx")
        $headers[] = 'Authorization: Bearer ' . $apiToken;
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body, JSON_UNESCAPED_UNICODE));

    // ⚠️ Em produção, mantenha as verificações de SSL ativas:
    // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
    // Se realmente precisar desabilitar em DEV, descomente:
    // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    $response = curl_exec($ch);
    $errno    = curl_errno($ch);
    $errstr   = curl_error($ch);
    $status   = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($errno) {
        return ['ok' => false, 'status' => $status, 'error' => "cURL error ({$errno}): {$errstr}"];
    }

    // Tenta decodificar JSON de resposta
    $decoded = json_decode($response, true);
    return [
        'ok'       => $status >= 200 && $status < 300,
        'status'   => $status,
        'response' => $decoded ?? $response
    ];

}