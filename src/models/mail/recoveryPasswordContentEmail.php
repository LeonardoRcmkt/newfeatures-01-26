<?php

function recoveryPasswordContentEmail($nome, $pin, $url)
{
    return "
    <tr>
                     <td height=15 align='center'></td>
                  </tr>
                  <tr>
                     <td height='30' align='center'>
                        <span class='texto_titulo'>Olá $nome, </span>
                     </td>
                  </tr>
                  <tr>
                     <td height=15 align='center'></td>
                  </tr>
                  <tr>
                     <td height='80' align='center'>
                        <span class='texto_principal'>Foi realizada uma solicitação para recuperação da senha na Promoção <br>
                        <span class='texto_destaque'>Marcas Campeãs. </span>.<br><br><br>
                        Clique abaixo para cadastrar uma nova senha:<br>
                        </span>
                     </td>
                  <tr>
                  <tr>
                     <td height=20 align='center'></td>
                  </tr>
                  <td height='50' align='center'>
                     <a href='{$url}/recuperar-senha/$pin' target='_blank'>
                     <img style='width:35%' src='{$url}/arquivos/btn-recuperar-senha.png' border='0' alt='Acesse: {$url}' title='Acesse: {$url}'>
                     </a>
                  </td>
                  </tr>
                  <tr>
                     <td height=32 align='center'></td>
                  </tr>
                  <td align='center'>
                     <span class='texto_principal'>
                     Ou copie e cole o endereço abaixo no seu navegador de internet: <br><br>
                     {$url}/recuperar-senha/$pin
                     <br><br>
                     Caso não tenha solicitado a recuperação de senha, por favor ignore este e-mail. 
                     </span>
                  </td>
                  </tr>
                  <tr>
                     <td height=32 align='center'></td>
                  </tr>
    ";
}
