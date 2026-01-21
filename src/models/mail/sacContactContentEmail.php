<?php

function sacContactContentEmail($name, $email, $message, $phone)
{
    return "
    <tr>
    <td height='30' align='center'>
       <span class='texto_titulo'>Contato SAC</span>
    </td>
 </tr>
 <tr>
    <td height=15 align='center'></td>
 </tr>
 <tr>
    <td height='80' style={ display:flex; flex-direction: collum; } >
    <span class='texto_destaque'>Nome: $name
    </span> <br>
    <span class='texto_destaque'>Telefone: $phone
    </span> <br>
    <span class='texto_destaque'>Email: $email
    </span> <br>
    <span class='texto_destaque'>Mensagem: $message
    </span> 
    </td>
 </tr>
    ";
}
