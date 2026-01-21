<?php
function userRegisterContentEmail($name, $url)
{
   return "
    <tr>
    <td height=15 align='center'></td>
 </tr>
 <tr>
    <td height='20' align='center'>
       <span class='texto_titulo'>Olá, " . $name . "</span> <br><br>
    </td>
 </tr>
 <tr>
 <td height='26' align='center' style='padding: 0 32px; text-align: center'>
    <span class='texto_principal'>Obrigado por se cadastrar na  </span>
 <span class='texto_destaque'> Promoção Marcas Campeãs!
 </span> </span><br><br>
<span class='texto_principal'>Participe e concorra a <span class='texto_destaque'> centenas de prêmios!</span></span>
<br><br>
 </td>
 </tr>
 <tr>
 <td height='40' align='center'>
    <a href='{$url}/' target='_blank'>
       <img style='width:90%' src='{$url}/arquivos/mecanica.png' border='0' alt='Acesse: {$url}' title='Acesse: {$url}'>
    </a><br><br>
 </td>
 </tr>
 <tr>
  <td  align='center' style='padding: 0 32px; text-align: center'>
    <span class='texto_principal'>Cadastre seu cupom para participar!</span> <br><br>
      <a href='{$url}/' target='_blank'  style=' text-align: center'>
       <img style='width:40%' src='{$url}/arquivos/btn-cadastrar-cupom.png' border='0' alt='Acesse: {$url}' title='Acesse: {$url}'>
    </a> <br><br>
 </td>
</tr>
    ";
}
