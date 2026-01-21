<?php


require_once("src/services/coupon.php");

function readAllCouponsController($request)
{
    ["payload" => $payload] = $request;
    send_response(readAllCouponsService($payload->idcliente), 200);
}

function createCouponController($request)
{
    ["body" => $body, "payload" => $payload] = $request;


    $error = requestValidate($body, ["codigo"]);
    if ($error) send_response($error, 400);

    send_response(createCouponService($payload->idcliente, $body["codigo"]), 201);
}
