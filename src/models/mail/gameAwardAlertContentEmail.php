<?php
function gameAwardAlertContentEmail($name, $voucher, $url)


{


    return "
   
    <tr>
        <td align='center' style='padding-top: 24px'>
            <span class='texto_titulo'>Olá, $name</span>
        </td>
    </tr>
    
    <tr>
        <td align='center'>
            <span class='texto_titulo'>Parabéns, você ganhou<br><br></span>
        </td>
    </tr>

    <tr>
        <td align='center'>
            <img style='width: 40%' src='$url/arquivos/" . $voucher . ".png' border='0' alt='$url' title='$url'>
        </td>
    </tr>

    <tr>
        <td align='center'>
            <p class='texto_destaque'>Você ganhou R$$voucher no cartão virtual!</p><br>
            <p class='texto_principal'>*Entregues através do cartão virtual da Hub4Pay. Sem função de saque.</p>
        </td>
    </tr>

    <tr>
        <td align='center'>
            <p class='texto_principal'>Seu prêmio será enviado em seu e-mail em até 30 dias. Após receber o e-mail contendo o seu Cartão Virtual da Hub4pay, acesse o site, realize o cadastro pessoal e adicione os dados de seu cartão. Você poderá fazer a gestão do seu saldo e utilizar o seu Prêmio CARD em qualquer estabelecimento, na função crédito e em compras online! <br>
        </td>
    </tr>
          <td height='50' align='center'>
                     <a href='https://card.linkpremiocard.com/onboarding' class='texto_destaque' target='_blank'>
                     <img style='width:35%' src='{$url}/arquivos/btn-acessar-site.png' border='0' alt='Acesse: {$url}' title='Acesse: {$url}'>
                     </a>
                  </td>
                      <tr>
        <td align='center'>
            <p class='texto_principal'>Em caso de dúvidas, entre em contato com o SAC da promoção pelo numero <span style='font-weight: 800'> (11) 2626-3437</span>. Continue participando! Você ainda pode ganhadr <span style='font-weight: 800'>  1 casa, 1 carrão, prêmios incríveis toda semana e + de mil prêmios de até R$ 500 na hora! </span> <br>
        </td>
    </tr>
    <tr>
        <td align='center'>
            <span class='texto_destaque' style='font-size: 24px'>Boa Sorte!</span>
        </td>
    </tr>
    ";
}
