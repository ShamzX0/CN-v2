
import React from 'react';
import NewsCard from './NewsCard';
import useNews from '@/hooks/useNews';

const Intro = () => {
    const { data: newsFeed } = useNews();

    return (
        <section className="flex items-center px-4">
            {/* Left Section - Main Content */}
            <div className="flex w-3/5">
                <div className="flex flex-col font-unbounded w-3/5 justify-center items-start">
                    <h1 className="text-[37px] text-left text-[#fff] pt-0 mb-10 pl-4 opacity-90 neon-writing">
                        <span className="text-2xl">THE UNIVERSE OF</span>{' '}CRYPTOCURRENCY
                    </h1>
                    <span className="text-base pl-5 mb-10">Discover - Learn - Secure</span>
                    <p className="text-left text-base mb-8 ml-5">
                        Explore beginner-friendly guides,<br />
                        expert hardware wallet advice, and real-time market prices.
                    </p>
                </div>
            </div>

            {/* Right Section - News Feed */}
            <div className="flex flex-col w-2/5 h-[300px] bg-[#1a1f2e] rounded-xl neon-card">

                <div className="flex-1 flex items-center">
                    <div className="w-full p-2">
                        {newsFeed.map((news, index) => (
                            <React.Fragment key={index}>
                                <NewsCard news={news} index={index} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;
