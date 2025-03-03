'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowDown } from 'lucide-react';
import useCoinDetail from '@/hooks/useCoinDetail';

export default function CryptoDetailPage() {
    const params = useParams();
    const cryptoSlug = params.slug as string;
    const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
    const [loading, setLoading] = useState(true);

    const { data: detailData } = useCoinDetail('ethereum')

    console.log(detailData, 'DAATA')

    useEffect(() => {
        // For now, we'll use mock data that matches our interface
        // In a future step, we'll replace this with an actual API call
        setTimeout(() => {
            setCryptoData({
                id: cryptoSlug,
                name: cryptoSlug === 'btc' ? 'Bitcoin' : cryptoSlug.toUpperCase(),
                symbol: cryptoSlug.toUpperCase(),
                image: `/placeholder-coin.png`, // Replace with actual image path
                current_price: 92701,
                price_change_percentage_24h: 7.97,
                price_change_percentage_7d: 5.23,
                market_cap: 1841831458072,
                fully_diluted_valuation: 1941831458072,
                total_volume: 67848753414,
                circulating_supply: 11831434,
                ath: 108786,
                description: cryptoSlug === 'btc'
                    ? "Bitcoin is the first successful internet money based on peer-to-peer technology..."
                    : `${cryptoSlug.toUpperCase()} is a cryptocurrency...`
            });
            setLoading(false);
        }, 1000);
    }, [cryptoSlug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-navy-900 text-white p-8 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!cryptoData) {
        return (
            <div className="min-h-screen bg-navy-900 text-white p-8 flex items-center justify-center">
                <div className="text-xl">Cryptocurrency not found</div>
            </div>
        );
    }

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

    return (
        <div className="min-h-screen bg-navy-900 text-white">
            {/* Header with coin info */}
            <div className="pt-8 px-4 md:px-8">
                <div className="flex items-center gap-4">
                    {/* Placeholder for coin image */}
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                        {cryptoData.image ? (
                            <Image
                                src={cryptoData.image}
                                alt={cryptoData.name}
                                width={64}
                                height={64}
                                className="rounded-full"
                            />
                        ) : (
                            <span className="text-2xl">{cryptoData.symbol.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{cryptoData.name}</h1>
                        <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">{cryptoData.symbol}</span>
                    </div>
                </div>

                {/* Price and changes */}
                <div className="mt-8 flex flex-wrap gap-8">
                    <div>
                        <h2 className="text-4xl font-bold">{formatPrice(cryptoData.current_price)}</h2>
                        <div className={`mt-2 px-3 py-1 rounded-md inline-flex items-center ${cryptoData.price_change_percentage_24h >= 0
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                            }`}>
                            {cryptoData.price_change_percentage_24h >= 0
                                ? <ArrowUp className="w-4 h-4 mr-1" />
                                : <ArrowDown className="w-4 h-4 mr-1" />}
                            <span>{Math.abs(cryptoData.price_change_percentage_24h).toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
                <div className="bg-navy-800 p-6 rounded-xl">
                    <h3 className="text-gray-400 text-sm">Market Cap</h3>
                    <p className="text-xl font-semibold mt-1">{formatLargeNumber(cryptoData.market_cap)}</p>
                </div>

                <div className="bg-navy-800 p-6 rounded-xl">
                    <h3 className="text-gray-400 text-sm">Fully Diluted Valuation</h3>
                    <p className="text-xl font-semibold mt-1">
                        {cryptoData.fully_diluted_valuation
                            ? formatLargeNumber(cryptoData.fully_diluted_valuation)
                            : 'N/A'}
                    </p>
                </div>

                <div className="bg-navy-800 p-6 rounded-xl">
                    <h3 className="text-gray-400 text-sm">All time high</h3>
                    <p className="text-xl font-semibold mt-1">{formatPrice(cryptoData.ath)}</p>
                </div>

                <div className="bg-navy-800 p-6 rounded-xl">
                    <h3 className="text-gray-400 text-sm">Circulating Supply</h3>
                    <p className="text-xl font-semibold mt-1">
                        {new Intl.NumberFormat('en-US').format(cryptoData.circulating_supply)} {cryptoData.symbol}
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

            {/* Description */}
            <div className="mt-12 px-4 md:px-8 pb-16">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <div className="bg-navy-800 p-6 rounded-xl">
                    <p className="text-gray-300 leading-relaxed">
                        {cryptoData.description || `${cryptoData.name} is a cryptocurrency.`}
                    </p>
                </div>
            </div>
        </div>
    );
}