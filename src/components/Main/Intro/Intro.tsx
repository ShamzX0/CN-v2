import React from 'react';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';
import useNews from '@/hooks/useNews';

interface NewsItem {
    title: string;
    domain: string;
    id: string;
}

const Intro = () => {
    const { data: newsFeed, isLoading: isNewsFeedLoading } = useNews()

    return (
        <div className="flex items-center w-full px-4">
            {/* Left Section - Main Content */}
            <div className="flex w-3/5">
                <div className="flex flex-col font-unbounded w-3/5 justify-center items-start">
                    {/* Header */}
                    <h1 className="text-[37px] text-left text-[#fff] pt-0 mb-10 pl-4 opacity-90 neon-writing">
                        <span className="text-2xl">THE UNIVERSE OF</span>
                        {' '}CRYPTOCURRENCY
                    </h1>

                    {/* Tagline */}
                    <span className="text-base pl-5 mb-10">
                        Discover - Learn - Secure
                    </span>

                    {/* Description */}
                    <p className="text-left text-base mb-8 ml-5">
                        Explore beginner-friendly guides,
                        <br />
                        expert hardware wallet advice, and real-time market prices.
                    </p>
                </div>
            </div>

            {/* Right Section - News Feed */}
            <div className="flex flex-col w-2/5 h-[300px] bg-[#1a1f2e] rounded-xl neon-card">
                {/* Header Container */}
                <div className="flex justify-center w-full">
                    <h1 className="text-base font-bold font-mono border-b-[1px] my-2 border-[#00FFFF] inline-block">
                        Headlines of the day
                    </h1>
                </div>

                {/* News Feed Container - Now centered */}
                <div className="flex-1 flex items-center">
                    <div className="w-full p-2 ">
                        {isNewsFeedLoading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <NewsCardSkeleton key={index} />
                            ))
                        ) : (
                            newsFeed.map((news: NewsItem, index: number) => (
                                <NewsCard
                                    key={news.id}
                                    news={news}
                                    index={index}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
