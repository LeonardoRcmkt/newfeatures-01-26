<?php
function couponApprovedContentEmail($name, $url)
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
    Seu cupom foi aprovado!
    <br><br>
    Acesse o site para verificar seus números da sorte e suas chances para a premiação instantâneos.

    </span>
    <br><br>
     <a href='$url' target='_blank'>
       <img style='width:40%' src='$url/arquivos/btn-ver-meus-numeros.png' border='0' alt='Acesse: $url' title='Acesse: $url'>
    </a>
     <br><br>
    <p class='texto_principal'>Continue participando e cadastrando suas compras para concorrer a milhares de prêmios de<span class='texto_destaque'> R$500,00 </span>e<span class='texto_destaque'> diversos prêmios </span>na hora. <br>
    E ainda está concorrendo a <span class='texto_destaque'>1 casa, 1 carro, 8 motos e 8 smartphones</span> no sorteio final!</p>
 </td>
 </tr>
 <tr>
 <td height='40' align='center'>
   
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
