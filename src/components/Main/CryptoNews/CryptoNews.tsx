import useCoinNews from '@/hooks/useCoinNews';
import { FALLBACK_NEWS_DATA } from '@/hooks/fetch/getCoinNews';
import { ArrowBigDown, ArrowBigUp, Clock, ExternalLink } from "lucide-react";
import { GiNewspaper } from "react-icons/gi";
import { GiBearFace, GiBullHorns } from "react-icons/gi";
import NewsSkeleton from '../CryptoNews/NewsSkeleton';

import React, { useState } from 'react'

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
    const [newsFilter, setNewsFilter] = useState<'bullish' | 'bearish' | null>('bullish');

    const filterOptions = [
        { value: null, icon: GiNewspaper, size: 22 },
        { value: 'bullish', icon: GiBullHorns, size: 22 },
        { value: 'bearish', icon: GiBearFace, size: 22 },
    ] as const;

    // Fetch general crypto news without specific currency
    const {
        data: coinNews,
        error: newsError,
        isLoading: newsLoading,
    } = useCoinNews({
        filter: newsFilter
    });

    // Use FALLBACK_NEWS_DATA only when there's an error
    const displayData = newsError ? FALLBACK_NEWS_DATA : coinNews;

    // Format date for news items
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            {/* News Section */}
            <div className="mt-2 p-2">
                <div className='flex justify-between'>
                    <div className="flex items-center justify-between mb-1 px-2">
                        <h2 className="text-sm font-bold border-b-[1px] border-[#00FFFF]">News From the CryptoUniverse</h2>
                    </div>
                    <div className="flex gap-3 pb-1 mr-3">
                        {filterOptions.map(({ value, icon: Icon, size }) => (
                            <div
                                key={value ?? 'all'}
                                className={`px-3 py-1 rounded-lg cursor-pointer
                                        ${newsFilter === value ? 'text-[#00FFFF] bg-slate-700' : 'text-[#f4f4f4]'}`}
                            >
                                <Icon
                                    onClick={() => setNewsFilter(value)}
                                    size={size}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* News content */}
                <div className="space-y-2">
                    {newsLoading ? (
                        <NewsSkeleton count={5} />
                    ) : newsError ? (
                        <div className="bg-navy-800 p-6 rounded-xl">
                            <p className="text-red-400">Failed to load news. Showing fallback data.</p>
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
                                    <div className='ounded-xl px-2 py-[0.7px] opacity-90 hover:opacity-100 hover:brightness-110 hover:bg-slate-800 rounded-lg'>
                                        <div className="flex justify-between text-[8px] mb-1">
                                            <div className='flex'>
                                                <div className="mr-3 mt-1 bg-orange-500 rounded-xl px-2">{item.source.title}</div>
                                                <div className='flex mt-1  text-gray-400'>
                                                    <Clock size={12} className='mr-1' />
                                                    {formatDate(item.published_at)}
                                                </div>
                                            </div>
                                            <div className="flex text-[10px]">
                                                <ArrowBigUp size={14} className='text-green-500' />
                                                <span className="text-green-400 mr-2">
                                                    {item.votes.positive}
                                                </span>
                                                <ArrowBigDown size={14} className='text-red-400' />
                                                <span className="text-red-400">
                                                    {item.votes.negative}
                                                </span>
                                                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-[10px] text-gray-300 font-semibold flex-1 hover:text-[#20c3d0]">
                                                {item.title.length > 120
                                                    ? `${item.title.substring(0, 100)}...`
                                                    : item.title
                                                }
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
    )
}

export default CryptoNews