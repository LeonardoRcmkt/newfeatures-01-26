import React, { useState, useEffect } from 'react';
import { FadeInOutText } from '../Construct/FadeText';
import { Timer } from '../Construct/Timer';

import {
  FaInstagram,
  FaYoutube,
  FaGooglePlus,
  FaFacebook,
} from 'react-icons/fa6';

export const Construct = ({ targetDay, targetMonth, targetYear }) => (
  <main
    id='construct'
    className='bg-black h-screen grid grid-cols-1  md:grid-cols-2 items-center justify-between overflow-hidden gap-8'
  >
    <div className='h-fit md:h-full relative w-full flex flex-col items-center justify-between overflow-hidden  gap-8'>
      <img
        className=' absolute left-0 top-[50%] -translate-y-[50%] w-full'
        src={'/images/construct/alert-bg.png'}
        alt='Aguarde uma nova campanha irá começar'
      />
      <a href='https://rctrademkt.com.br/'>
        {' '}
        <img
          className='w-[4rem] relative mt-6  '
          src={'/images/construct/rc-mkt-logo.svg'}
          alt='LogoRC'
        />
      </a>
      <div className='relative flex justify-center h-[6.5rem] md:h-fit'>
        <FadeInOutText
          texts={[
            'RC Marketing Aguarde...',
            'A próxima campanha já vai começar!',
          ]}
        />
      </div>

      <div className='flex  gap-6 relative mb-6 '>
        <a
          href='https://www.facebook.com/login/?next=https%3A%2F%2Fweb.facebook.com%2Frctrademarketing&_rdc=1&_rdr'
          className='text-2xl text-gray-50 hover:text-construct duration-300 ease-in-out'
        >
          <FaFacebook />
        </a>
        <a
          href='https://www.youtube.com/channel/UCKwdW57rHvFzRk6XFsIgTdA/featured'
          className='text-2xl text-gray-50 hover:text-construct duration-300 ease-in-out'
        >
          <FaYoutube />
        </a>
        <a
          href='https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Frctrademarketing%2F'
          className='text-2xl text-gray-50 hover:text-construct duration-300 ease-in-out'
        >
          <FaInstagram />
        </a>
        <a
          href='https://rctrademkt.com.br/'
          className='text-2xl text-gray-50 hover:text-construct duration-300 ease-in-out '
        >
          <FaGooglePlus />
        </a>
      </div>
    </div>
    <div className='p-6 flex justify-center items-center'>
      <Timer
        targetDay={targetDay}
        targetMonth={targetMonth}
        targetYear={targetYear}
      />
    </div>
  </main>
);
