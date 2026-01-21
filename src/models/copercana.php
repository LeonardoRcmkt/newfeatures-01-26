<?php


function readAllUsersCopercanaModel($page)
{
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.mercafacil.com/v1/users?page=$page",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2M2I1OWUwNjViMTExMjdhODIzMjVkMWUiLCJhZG1pbiI6ZmFsc2UsIm5hbWUiOiJFbXB0eSBHZW5lcmF0b3IifQ.BM0Knu7LWpY__HVmN3udA2Xe3VJ58jbenikhkS7vKaY',
            'Content-Type: application/json'
        ),
    ));

    $response = json_decode(curl_exec($curl), true);

    curl_close($curl);

    $users = [];

    foreach ($response["users"] as $value) {
        $user = adapter($value);
        $user["politica_privacidade"] = $user["leu_aceitou_regulamento"];
        unset($user["person_type"]);
        unset($user["created_at"]);
        unset($user["updated_at"]);
        unset($user["has_password"]);
        unset($user["points.total"]);
        $users = [...$users, $user];
    }

    return $users;
}
