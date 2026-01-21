import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Search } from './Search';
import { BsArrowDown } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { BiSolidDownArrow } from "react-icons/bi";
import { HomeAnimation } from './home/HomeAnimation';
import { motion } from 'motion/react'

export const Accordion = ({
  titleButton = '',
  open = false,
  children,
  onClick,
  info = [],
  isVisible,
  onChange,
  word,
  headerClass = '',
  className = "bg-gray-500 text-white rounded-3xl border-white border-4 ",
}) => {
  const animate = {
    transition: { type: 'tween' },
    height: open ? 'auto' : 0,
    opacity: open ? 1 : 0.5,
  };

  return (
    <motion.div
      {...HomeAnimation()} className={` py-4 font-paragraph flex flex-col px-6 justify-between items-center   overflow-hidden ${className}  `}>
      <button
        className={`text-2xl md:text-4xl w-full flex flex-row items-center cursor-pointer  font-title px-8 ${headerClass}`}
        type='button'
        onClick={onClick}
      >
        <p className={`   w-full leading-none mb-2 `}>{titleButton}</p>
        {
          <p
            className={` duration-300 ease-in-out  `}
            aria-label={open ? 'Fechar' : 'Abrir'}
          >
            {' '}
            <BiSolidDownArrow className={`transition-all w-6 h-auto  ${open ? 'rotate-180' : ''} `} />
            {/* <IoIosArrowDown className={`transition-all w-6 h-auto  ${open ? 'rotate-180' : ''} `} /> */}
          </p>
        }
      </button>
      <LazyMotion features={domAnimation} strict>
        <div className='w-full'>
          <m.div
            style={{ overflow: 'hidden' }}
            initial={{ height: 0, opacity: 1 }}
            animate={animate}
            exit={{ height: 0, opacity: 1 }}
          >
            {info.length ? (
              <Search isVisible={isVisible} onChange={onChange} word={word} />
            ) : (
              ''
            )}
            {open && <div className='w-full text-sm md:text-base'>{children}</div>}
          </m.div>
        </div>
      </LazyMotion>
    </motion.div>
  );
};
