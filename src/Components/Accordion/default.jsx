import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Search } from '../Search';

export const Accordion = ({
  titleButton = '',
  open = false,
  children,
  onClick,
  info = [],
  isVisible,
  onChange,
  word,
  backgroundColor,
  textColor,
  className = '',
  placeholder = ''
}) => {
  const animate = {
    transition: { type: 'tween' },
    height: open ? 'auto' : 0,
    opacity: open ? 1 : 0.5,
  };

  return (
    <div className='flex flex-col text-center rounded-lg border-2 bg-primary p-4'>
      
      <button
        className={`${backgroundColor} text-center w-full text-${textColor} flex justify-between items-center font-bold  text-duvidas-details uppercase gap-2 ${className}`}
        type='button'
        onClick={onClick}
      >
        <p className='text-xl -mt-2 text-left font-black text-white'>{titleButton}</p>
        {
          <p
            className={`text-${textColor} duration-300 ease-in-out font-bold`}
            aria-label={open ? 'Fechar' : 'Abrir'}
          >
            {' '}
            {open ?
            <svg className='-rotate-180 duration-300 ease-in-out' width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8409 0.408203L7.16622 0.408203L1.15577 0.408203C0.12725 0.408203 -0.387011 1.65006 0.341525 2.37806L5.89129 7.92359C6.78053 8.81216 8.22689 8.81216 9.11613 7.92359L11.2267 5.81458L14.6659 2.37806C15.3837 1.65006 14.8694 0.408203 13.8409 0.408203Z" fill="white"/>
            </svg>
            
            : <svg className=' duration-300 ease-in-out' width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8409 0.408203L7.16622 0.408203L1.15577 0.408203C0.12725 0.408203 -0.387011 1.65006 0.341525 2.37806L5.89129 7.92359C6.78053 8.81216 8.22689 8.81216 9.11613 7.92359L11.2267 5.81458L14.6659 2.37806C15.3837 1.65006 14.8694 0.408203 13.8409 0.408203Z" fill="white"/>
            </svg>
            }{' '}
          </p>
        }
      </button>
      <LazyMotion features={domAnimation} strict>
        <div className=''>
          <m.div
            style={{ overflow: 'hidden' }}
            initial={{ height: 0, opacity: 1 }}
            animate={animate}
            exit={{ height: 0, opacity: 1 }}
            className='flex flex-col gap-4'
          >
            {info.length ? (
              <Search isVisible={isVisible} onChange={onChange} word={word}placeholder={placeholder} className={''} />
            ) : (
              ''
            )}
            {open && <div>{children}</div>}
          </m.div>
        </div>
      </LazyMotion>
    </div>
  );
};
