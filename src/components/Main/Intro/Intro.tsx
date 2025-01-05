import React from 'react';
import NewsCard from './NewsCard';
import useNews from '@/hooks/useNews';


const Intro = () => {
    const { data: newsFeed, isLoading: isNewsFeedLoading } = useNews()

    if (isNewsFeedLoading) return <div className='text-center w-full'>Loading..</div>;


    return (
        <div className='flex w-full'>
            <div className='flex 4/6'>
                <div className="flex mt-5 lg:mt-0 flex-col lg:w-3/5 justify-center lg:items-start overflow-y-hidden font-unbounded">
                    <h1 className="text-[25px] sm:text-[35px] md:text-[45px] lg:text-[37px] text-center pt-3 lg:pt-0 mb-10 sm:pl-4 opacity-90 lg:text-left text-[#fff] neon-writing">
                        <span className='text-xl sm:text-2xl'>THE UNIVERSE OF</span> CRYPTOCURRENCY
                    </h1>
                    <span className='text-center lg:text-base md:pl-5 md:mt-5 mb-14 lg:mb-10 font-unbounded'>Discover - Learn - Secure</span>

                    <p className="leading-normal sm:ml-5 lg:text-base md:text-xl mb-4 px-10 sm:px-0 sm:mb-8 text-center lg:text-left font-unbounded">
                        <span>Explore beginner-friendly guides,<br /> expert hardware wallet advice, and real-time market prices.</span>
                    </p>
                </div>
            </div>
            <div className='flex flex-col w-1/3 h-[300px] justify-center items-center relative bg-[#1a1f2e] rounded-xl neon-card '>
                <h2 className="text-base font-bold font-unbounded neon-writing m-[-10px]">News of the day</h2>
                <div className="w-full p-2">

                    {newsFeed.results.map((news, index) => (
                        <NewsCard key={news.id} news={news} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Intro;