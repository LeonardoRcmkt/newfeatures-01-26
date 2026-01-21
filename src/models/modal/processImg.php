<?php

function processImg($win = false, $text = "",)
{
    $image = imagecreatefrompng($win ? "src/models/modal/win.png" : "src/models/modal/loose.png");
    $textColor = imagecolorallocatealpha($image, 0, 0, 0, 100);
    $fontPath = "src/models/modal/comic.ttf";
    $fontSize = 12;

    $imageWidth = imagesx($image);
    $imageHeight = imagesy($image);

    $textBox = imagettfbbox($fontSize, 70, $fontPath, $text);

    $textWidth = $textBox[2] - $textBox[0];
    $textHeight = $textBox[1] - $textBox[7];
    
    $x = (int)($imageWidth * (2 / 3) - $textWidth - 10);
    $y = (int)($imageHeight / 3 + $textHeight); 


    imagettftext($image, $fontSize, 0, $x, $y, $textColor, "src/models/modal/comic.ttf", $text);

    $watermarkModalPath = "src/models/modal/temp_modal.png";

    imagepng($image, $watermarkModalPath);
    imagedestroy($image);
    
    $GLOBALS["metrics"]("processImg");
    return 'data:image/png;base64,'.base64_encode(file_get_contents($watermarkModalPath));
}
