import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { MdInfoOutline } from 'react-icons/md';
import { Button } from './Button';

export const CookieModal = () => {
  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const [showModal, setShowModal] = useState(!cookies.cookieConsent);

  const handleAcceptCookies = () => {
    setCookie('cookieConsent', true, { path: '/' });
    setShowModal(false);
  };

  // const handleRejectCookies = () => {
  //   setCookie('cookieConsent', false, { path: '/' });
  //   setShowModal(false);
  // };

  return (
    <>
      {showModal && (
        <div className='fixed text-primary-500 right-6 bottom-6 z-50 bg-white rounded-lg max-w-[25rem] p-4 ml-6 animate-fade-up'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-cookies  font-bold  flex items-center gap-1 '>
              {' '}
              <MdInfoOutline className='text-xl' />
              Nós utilizamos cookies
            </h2>
            <p className='text-sm'>
              Nosso site usa cookies essenciais para garantir um bom
              funcionamento e cookies de rastreamento para entender como você
              interage com ele.
            </p>
            <a
              href='/arquivos/politica-de-privacidade.pdf'
              className='text-cookies font-bold'
              target='_blank'
            >
              Ler mais...
            </a>
            <div className='flex gap-2'>
              {/* <Button  title='RECUSAR' width='100%' primary={false} onClick={handleRejectCookies} /> */}
              <Button
                onClick={handleAcceptCookies}
              >
              Aceitar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
