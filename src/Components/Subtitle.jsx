export const Subtitle = ({ primary=true, children }) => {
  
  return (
    primary ? (
      <div className='mx-auto max-w-5xl w-full bg-white rounded-lg shadow-light-sm mt-4 mb-8 text-center py-2 px-4'>
        <h3 className='text-center text-sm md:text-xl text-secondary-700 uppercase font-black -mt-1'>
          {children}
        </h3>
      </div>
    ) : (
      <div className='mx-auto max-w-5xl w-full bg-secondary-gradient-linear rounded-lg shadow-dark-md mt-4 mb-8 text-center py-2 px-4'>
      <h3 className='text-center text-sm md:text-xl text-white uppercase font-bold md:font-black -mt-1'>
        {children}
      </h3>
    </div>
    )
  )
}
