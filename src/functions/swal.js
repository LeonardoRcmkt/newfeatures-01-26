import Swal from 'sweetalert2';

export async function triggerSwal(
  title,
  text = '',
  icon = 'success',
  html = '',
  textButton = 'OK'
) {
  await Swal.fire({
    icon: icon,
    title: title,
    text: text,
    html: html,
    showCloseButton: true,
    confirmButtonColor: icon == 'success' ? '#007900' : '#BE0044',
    confirmButtonText: textButton,
    showConfirmButton: true,
    // footer:
    //   icon != 'success'
    //     ? `<u><a href="https://wa.me/551126263437?text=Ol%C3%A1%2C+gostaria+de+saber+sobre+a+Promo%C3%A7%C3%A3o+Marcas+Campeãs+2024" target="_blank">Entrar em contato no WhatsApp (11) 2626-3437 </a></u>`
    //     : '',
  });

  return true;
}
