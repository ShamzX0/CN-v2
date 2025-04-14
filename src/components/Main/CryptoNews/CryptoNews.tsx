import React, { useState, useEffect } from 'react';
import { ArrowBigDown, ArrowBigUp, Clock, ExternalLink } from "lucide-react";
import { GiNewspaper, GiBearFace, GiBullHorns } from "react-icons/gi";
import useCoinNews from '@/hooks/useCoinNews';
import { FALLBACK_NEWS_DATA } from '@/hooks/fetch/getCoinNews';
import NewsSkeleton from '../CryptoNews/NewsSkeleton';

type NewsFilter = 'bullish' | 'bearish' | null;

interface NewsItem {
    created_at: string;
    currencies: Array<{
        code: string;
        title: string;
        slug: string;
        url: string;
    }>;
    domain: string;
    kind: string;
    published_at: string;
    slug: string;
    title: string;
    source: {
        title: string;
        region: string;
        domain: string;
    };
    url: string;
    votes: {
        negative: number;
        positive: number;
        important: number;
        liked: number;
    };
}

const CryptoNews = () => {
    const [newsFilter, setNewsFilter] = useState<NewsFilter>('bullish');

    const filterOptions = [
        { value: null, icon: GiNewspaper, size: 22 },
        { value: 'bullish', icon: GiBullHorns, size: 22 },
        { value: 'bearish', icon: GiBearFace, size: 22 },
    ] as const;

    // Data fetching with custom hook
    const {
        data: coinNews,
        error: newsError,
        isLoading: newsLoading,
    } = useCoinNews({ filter: newsFilter });

    // Debug logs to track data fetching status
    useEffect(() => {
        console.log('Current filter:', newsFilter);
        console.log('Is data loading:', newsLoading);
        console.log('Fetch error:', newsError);
        console.log('Fetched news data:', coinNews);

        if (newsError) {
            console.error('Error details:', newsError);
        }

        // Check if we're using fallback data
        const usingFallback = newsError || !coinNews;
        console.log('Using fallback data:', usingFallback);

        if (usingFallback) {
            console.log('Fallback data sample:', FALLBACK_NEWS_DATA?.slice(0, 2));
        }
    }, [coinNews, newsError, newsLoading, newsFilter]);

    // Use FALLBACK_NEWS_DATA only when there's an error
    const displayData = newsError ? FALLBACK_NEWS_DATA : coinNews;

    // Helper function for formatting dates
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div>
            {/* News Section */}
            <div className="p-3">
                <div className='flex justify-between'>
                    <div className="flex items-center justify-between mb-1 px-2">
                        <h2 className="text-sm font-bold border-b-[1px] border-[#00FFFF]">
                            News From the CryptoUniverse
                            {newsError && <span className="ml-2 text-xs text-red-400">(Using fallback data)</span>}
                        </h2>
                    </div>
                    {/* Filter Options */}
                    <div className="flex gap-3 pb-1 mr-3">
                        {filterOptions.map(({ value, icon: Icon, size }) => (
                            <div
                                key={value ?? 'all'}
                                onClick={() => {
                                    console.log('Setting filter to:', value);
                                    setNewsFilter(value);
                                }}
                                className={`px-3 py-1 rounded-lg cursor-pointer
                                    ${newsFilter === value ? 'text-[#00FFFF] bg-slate-700' : 'text-[#f4f4f4]'}`}
                            >
                                <Icon size={size} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* News Content */}
                <div className="space-y-2">
                    {newsLoading ? (
                        <NewsSkeleton count={5} />
                    ) : newsError ? (
                        <div className="bg-navy-800 p-6 rounded-xl">
                            <p className="text-red-400">Failed to load news. Showing fallback data.</p>
                            <p className="text-red-400 text-xs mt-1">Error: {newsError.toString()}</p>
                        </div>
                    ) : !displayData?.length ? (
                        <div className="bg-navy-800 p-6 rounded-xl">
                            <p className="text-gray-400">No news available for the selected filter.</p>
                        </div>
                    ) : (
                        displayData.slice(0, 6).map((item: NewsItem, index: number) => (
                            <div key={`${item.slug}-${index}`} className="bg-navy-800 rounded-xl">
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <div className='rounded-xl px-2 py-[2px] opacity-90 hover:opacity-100 hover:brightness-110 hover:bg-slate-800'>
                                        <div className="flex justify-between text-[8px] mb-1">
                                            <div className='flex items-center flex-wrap max-w-[70%]'>
                                                <div className="mr-3 mt-1 bg-orange-500 rounded-xl px-2 whitespace-nowrap">
                                                    {item.source.title}
                                                </div>
                                                <div className='flex mt-1 text-gray-400 whitespace-nowrap'>
                                                    <Clock size={12} className='mr-1 flex-shrink-0' />
                                                    {formatDate(item.published_at)}
                                                </div>
                                            </div>
                                            <div className="flex text-[10px] items-center flex-shrink-0">
                                                <ArrowBigUp size={14} className='text-green-500 flex-shrink-0' />
                                                <span className="text-green-400 mr-2">
                                                    {item.votes.positive}
                                                </span>
                                                <ArrowBigDown size={14} className='text-red-400 flex-shrink-0' />
                                                <span className="text-red-400">
                                                    {item.votes.negative}
                                                </span>
                                                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-start w-full">
                                            <h3 className="text-[10px] text-gray-300 font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full hover:text-[#20c3d0]">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CryptoNews;