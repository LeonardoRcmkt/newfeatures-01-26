<?php
function couponRegisterContentEmail($name, $url)
{
   return "
    <tr>
    <td height=15 align='center'></td>
 </tr>
 <tr>
    <td height='30' align='center'>
       <span class='texto_titulo'>Olá, " . $name . "</span>
    </td>
 </tr>
 <tr>
    <td height='30' align='center' style='padding: 0 32px; text-align: center' >
    <span class='texto_principal' >
    Sua compra foi cadastrada com sucesso!
    <br><br>
    Acesse o site para consultar suas chances <br>na Raspadinha Digital e seus números da sorte!
    </span>
    <br><br>
    <p class='texto_principal'>Você pode ganhar até <span class='texto_destaque'> R$500,00 </span>e<span class='texto_destaque'> diversos prêmios </span>na hora. <br>
    E ainda está concorrendo a <span class='texto_destaque'>1 casa, 1 carro e a prêmios incríveis toda semana </span> !</p>
 </td>
 </tr>
 <tr>
 <td height='40' align='center'>
    <a href='$url' target='_blank'>
       <img style='width:40%' src='$url/arquivos/btn-meus-cupons.png' border='0' alt='Acesse: $url' title='Acesse: $url'>
    </a> <br>
     <span class='texto_titulo'> Boa Sorte!<span/>
 </td>
 <td>

 </td>
</tr>
 <tr>
    <td height=32 align='center'></td>
 </tr>
    ";
}
