import React from 'react'

const MainHeader = () => {
    return (
        <div className="flex mt-5 lg:mt-0 flex-col lg:w-3/5 justify-center lg:items-start overflow-y-hidden font-unbounded">
            <h1 className="text-[25px] sm:text-[35px] md:text-[45px] lg:text-[37px] text-center pt-3 lg:pt-0 mb-10 sm:pl-4 opacity-90 lg:text-left text-[#fff] neon-writing">
                <span className='text-xl sm:text-3xl'>THE UNIVERSE OF</span> CRYPTOCURRENCY
            </h1>
            <span className='text-center lg:text-base md:pl-5 md:mt-5 mb-14 lg:mb-10'>Discover - Learn - Secure</span>

            <p className="leading-normal sm:ml-5 md:text-xl mb-4 px-10 sm:px-0 sm:mb-8 text-center lg:text-left font-unbounded">
                <span>Explore beginner-friendly guides,<br /> expert hardware wallet advice, and real-time market prices.</span>
            </p>
        </div>
    )
}

export default MainHeader
