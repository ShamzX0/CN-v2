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

    // if (isNewsFeedLoading) return <div className='text-center w-full'>Loading..</div>;


    return (
        <div className="flex items-center w-full p-4">
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
            <div className="flex flex-col w-2/5 h-[300px] justify-center items-center relative bg-[#1a1f2e] rounded-xl neon-card">
                <h2 className="text-sm font-bold font-unbounded neon-writing m-[-15px]">
                    Headlines of the day
                </h2>

                <div className="w-full p-2">
                    {isNewsFeedLoading ? (
                        // Show 3 skeleton cards while loading
                        Array.from({ length: 3 }).map((_, index) => (
                            <NewsCardSkeleton key={index} />
                        ))
                    ) : (
                        // Show actual news cards when data is loaded
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
    );
};

export default Intro;
