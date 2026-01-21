export const BtnCsat = ({className =""}) => {
    return (
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfzfDulVHgQS7vJNiuXy7ImjFaru8HrRPh1O_JbPohvlCdUHw/viewform" target="_blank" className={` ${className} uppercase  fixed z-[60] font-black right-12 border-2 bottom-12 text py-3 px-4 md:px-6 text-secondary-700  shadow-light-sm border-primary-700 bg-secondary-700 border-white rounded-lg backdrop-blur-md text-white flex gap-2 items-center hover:scale-105 ease-in-out duration-300 `}> <img className="w-3 md:w-5" src="\images\base\icon-csat.svg" /> <p className="-mt-1">dê sua opinião!</p>  </a>
    )
}