'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import useCoinDetail from '@/hooks/useCoinDetail';
import useCoinNews from '@/hooks/useCoinNews';
import CryptoNews from '@/components/Main/CryptoNews/CryptoNews';

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

export default function CryptoDetailPage() {
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

    // Format numbers for display
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
        }).format(price);
    };

    const formatLargeNumber = (num: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 2
        }).format(num);
    };

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
        <div className="min-h-screen bg-navy-900 text-white">
            {/* Header with coin info */}
            <div className="pt-8 px-4 md:px-8">
                <div className="flex items-center gap-4">
                    {/* Placeholder for coin image */}
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        {CoinData?.image ? (
                            <Image
                                src={CoinData.image.small}
                                alt={CoinData.name}
                                width={64}
                                height={64}
                                className="rounded-full"
                            />
                        ) : (
                            <span className="text-2xl">{CoinData?.symbol?.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{CoinData?.name}</h1>
                        <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">{CoinData?.symbol}</span>
                    </div>
                </div>

                {/* Price and changes */}
                <div className="mt-8 flex flex-wrap gap-8">
                    <div>
                        <h2 className="text-4xl font-bold">{formatPrice(CoinData?.current_price)}</h2>
                        <div className={`mt-2 px-3 py-1 rounded-md inline-flex items-center ${CoinData?.price_change_percentage_24h >= 0
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                            }`}>
                            {CoinData?.price_change_percentage_24h >= 0
                                ? <ArrowUp className="w-4 h-4 mr-1" />
                                : <ArrowDown className="w-4 h-4 mr-1" />}
                            <span>{Math.abs(CoinData?.price_change_percentage_24h).toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
                <div className="bg-navy-800 p-6 rounded-xl">
                    <h3 className="text-gray-400 text-sm">Market Cap</h3>
                    <p className="text-xl font-semibold mt-1">{formatLargeNumber(CoinData?.market_cap)}</p>
                </div>

                <div className="bg-navy-800 p-6 rounded-xl">
                    <h3 className="text-gray-400 text-sm">Fully Diluted Valuation</h3>
                    <p className="text-xl font-semibold mt-1">
                        {CoinData?.fully_diluted_valuation
                            ? formatLargeNumber(CoinData.fully_diluted_valuation)
                            : 'N/A'}
                    </p>
                </div>

                <div className="bg-navy-800 p-6 rounded-xl">
                    <h3 className="text-gray-400 text-sm">All time high</h3>
                    <p className="text-xl font-semibold mt-1">{formatPrice(CoinData?.ath)}</p>
                </div>

                <div className="bg-navy-800 p-6 rounded-xl">
                    <h3 className="text-gray-400 text-sm">Circulating Supply</h3>
                    <p className="text-xl font-semibold mt-1">
                        {new Intl.NumberFormat('en-US').format(CoinData?.circulating_supply)} {CoinData?.symbol}
                    </p>
                </div>
            </div>

            {/* Chart placeholder (we'll implement this in a future step) */}
            <div className="mt-12 px-4 md:px-8">
                <h2 className="text-xl font-bold mb-4">90 days daily chart</h2>
                <div className="bg-navy-800 p-4 rounded-xl h-72 flex items-center justify-center">
                    <p className="text-gray-400">Chart will be implemented in a future step</p>
                </div>
            </div>

            {/* News Section */}
            <CryptoNews />

            {/* Description */}
            <div className="mt-12 px-4 md:px-8 pb-16">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <div className="bg-navy-800 p-6 rounded-xl">
                    <p className="text-gray-300 leading-relaxed">
                        {CoinData?.description || `${CoinData?.name} is a cryptocurrency.`}
                    </p>
                </div>
            </div>
        </div>
    );
}