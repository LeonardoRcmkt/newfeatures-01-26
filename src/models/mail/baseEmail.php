<?php



function baseEmail($bodyEmail, $url)
{

   return "
    <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'>
   <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <meta content='width=device-width, initial-scale=1' name='viewport'>
      <meta name='x-apple-disable-message-reformatting'>
      <meta http-equiv='X-UA-Compatible' content='IE=edge'>
      <style type='text/css'>
         html,
         body {
         margin: 0px !important;
         padding: 0px !important;
         background-color: #ffffff !important;
         align-content: center !important;
         text-align: center !important;
         font-family: 'Courdb';
         }
         /* Stop Outlook resizing small text. */
         * {
         -ms-text-size-adjust: 100%;
         }
         table {
         align-items: center !important; 
         align-content: center !important; 
         }
         td {
         mso-table-lspace: 0pt !important;
         mso-table-rspace: 0pt !important;
         }
         /* Use a better rendering method when resizing images in Outlook IE. */
         img {
         width:30%;
         }
         /* Prevent Windows 10 Mail from underlining links. Styles for underlined links should be inline. */
         a {
            text-decoration: none;
            color: #3F4DAC !important;
            }
            .texto_principal{
            color: #3F4DAC !important;
            font-family: 'arial';
            font-size: 14px; 
            }
            .texto_destaque{
            color: #FF3FDC !important;
            font-family: 'arial';
            font-size: 14px;
            font-weight: 700; 
            }
            .detalhe{
            color: #3F4DAC;
            font-weight: 700;
            }
            .texto_titulo{
            color: #3F4DAC !important;
            font-family: 'arial';
            font-size: 26px;
            font-weight: 700;
            }
            .img_footer_header{
            width: 100%;
            max-width: 600px !important;
            }
            .tabelaajustes {
            white-space: initial;
            width: 600px !important;
            background-color: #fff !important;
            }
      </style>
   </head>
   <body style='text-align: center !important; align-content: center !important;'>
      <table cellpadding='0' cellspacing='0' border='0' align='center' class='tabelaajustes'>
         <tr>
            <td width='600px'>
               <table cellpadding='0' cellspacing='0' border='0' align='center' width='600px'>
                  <tr>
                     <td height='120' width='600px' align='center'>
                        <a href='' target='_blank'>
                        <img class='img_footer_header' src='{$url}/arquivos/header.png' border='0' alt='Acesse: {$url}' title='Acesse: {$url}'>
                        </a>
                     </td>
                  </tr>
                  $bodyEmail
                  <tr>
                     <td height='120' width='600px' align='center'>
                        <a href='' target='_blank'>
                        <img class='img_footer_header' src='{$url}/arquivos/footer.png' border='0' alt='Acesse: {$url}' title='Acesse: {$url}'>
                        </a>
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
      </table>
   </body>
</html>
    ";
}
