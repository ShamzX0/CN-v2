import useCoinDetail from '@/hooks/useCoinDetail';
import useCoinNews from '@/hooks/useCoinNews';
import { ExternalLink } from 'lucide-react';
import { useParams } from 'next/navigation';
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

    const params = useParams();
    const cryptoSlug = params.slug as string;
    const { data: CoinData } = useCoinDetail(cryptoSlug);

    // State for news filters
    const [newsFilter, setNewsFilter] = useState<'rising' | 'hot' | 'bullish' | 'bearish' | null>('rising');

    // Get the currency code for news API
    const currencyCode = CoinData?.symbol?.toUpperCase();

    // Fetch news specific to this coin
    const {
        data: coinNews,
        error: newsError,
        isLoading: newsLoading,
        loadNextPage,
        hasNextPage,
    } = useCoinNews({
        currencies: currencyCode ? [currencyCode] : [],
        filter: newsFilter || undefined,
        kind: 'news'
    });

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
            <div className="mt-12 px-4 w-2/4 md:px-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">News From the CryptoUniverse</h2>

                </div>

                {/* News filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button
                        className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${newsFilter === null ? 'bg-blue-600 text-white' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}
                        onClick={() => setNewsFilter(null)}
                    >
                        All News
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${newsFilter === 'rising' ? 'bg-blue-600 text-white' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}
                        onClick={() => setNewsFilter('rising')}
                    >
                        Rising
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${newsFilter === 'hot' ? 'bg-blue-600 text-white' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}
                        onClick={() => setNewsFilter('hot')}
                    >
                        Hot
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${newsFilter === 'bullish' ? 'bg-green-600 text-white' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}
                        onClick={() => setNewsFilter('bullish')}
                    >
                        Bullish
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${newsFilter === 'bearish' ? 'bg-red-600 text-white' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}
                        onClick={() => setNewsFilter('bearish')}
                    >
                        Bearish
                    </button>
                </div>

                {/* News content */}
                <div className="space-y-4">
                    {newsLoading && (
                        <div className="bg-navy-800 p-6 rounded-xl flex items-center justify-center">
                            <p className="text-gray-400">Loading news...</p>
                        </div>
                    )}

                    {newsError && (
                        <div className="bg-navy-800 p-6 rounded-xl">
                            <p className="text-red-400">Failed to load news. Please try again later.</p>
                        </div>
                    )}

                    {!newsLoading && !newsError && coinNews?.length === 0 && (
                        <div className="bg-navy-800 p-6 rounded-xl">
                            <p className="text-gray-400">No news available for {CoinData?.name} with the selected filter.</p>
                        </div>
                    )}

                    {coinNews && coinNews.map((item: NewsItem, index: number) => (
                        <div key={`${item.slug}-${index}`} className="bg-navy-800 p-6 rounded-xl hover:bg-navy-700 transition-colors">
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold mb-2 flex-1 hover:text-blue-400">{item.title}</h3>
                                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                                </div>

                                <div className="flex items-center text-sm text-gray-400 mb-3">
                                    <span className="mr-3">{item.source.title}</span>
                                    <span>{formatDate(item.published_at)}</span>
                                </div>

                                <div className="flex gap-2">
                                    {item.currencies.map(currency => (
                                        <span
                                            key={currency.code}
                                            className="px-2 py-1 bg-navy-900 rounded-md text-xs"
                                        >
                                            {currency.code}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-3 text-sm">
                                    <span className="text-green-400">
                                        +{item.votes.positive}
                                    </span>
                                    <span className="text-red-400">
                                        -{item.votes.negative}
                                    </span>
                                    {item.votes.important > 0 && (
                                        <span className="text-yellow-400">
                                            {item.votes.important} important
                                        </span>
                                    )}
                                </div>
                            </a>
                        </div>
                    ))}

                    {hasNextPage && (
                        <button
                            onClick={loadNextPage}
                            className="w-full bg-navy-800 hover:bg-navy-700 text-gray-300 p-3 rounded-xl mt-4"
                        >
                            Load More News
                        </button>
                    )}
                </div>
            </div>
        </div>

    )
}

export default CryptoNews

