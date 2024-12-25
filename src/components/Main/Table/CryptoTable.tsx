import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoData } from '@/lib/types';
import Image from 'next/image';
import Sparkline from './Sparkline/Sparkline';

interface Props {
    tableCoins: CryptoData
}

const CryptoTable = (props: Props) => {

    const { tableCoins } = props

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(price);
    };

    const formatMarketCap = (marketCap: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'standard',
            maximumFractionDigits: 0
        }).format(marketCap);
    };

    const formatPercentage = (percentage: number): string => {
        return Math.abs(percentage).toFixed(2);
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg p-4">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">#</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">1h %</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">24h %</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">7d %</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Market Cap</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Volume(24h)</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Price</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300 justify-center mr-[-20px] flex">Chart(7d)</th>
                    </tr>
                </thead>
                <tbody>
                    {tableCoins?.map((coin: CryptoData, index: number) => {
                        const sparklineData = coin.sparkline_in_7d?.price;
                        const sparklineColor = sparklineData && sparklineData.length > 1
                            ? sparklineData[sparklineData.length - 1] > sparklineData[0]
                                ? '	#009F6B'
                                : '#D20A2E'
                            : 'gray'; // Default color if no data

                        return (
                            <tr
                                key={coin.id}
                                className="border-b border-gray-700 hover:bg-[#1a2842] transition-colors duration-200"
                            >
                                <td className="px-4 text-sm text-gray-300">{index + 1}</td>
                                {/* Token - image */}
                                <td className="px-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={coin.image}
                                            alt={coin.name}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        {/* Token - name, symbol */}
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-200">{coin.name}</span>
                                            <span className="text-xs text-gray-400 uppercase">{coin.symbol}</span>
                                        </div>
                                    </div>
                                </td>
                                {/* 1h Volume */}
                                <td className="px-4 text-right text-sm">
                                    <div className="flex items-center justify-end gap-1">
                                        {coin.price_change_percentage_24h > 0 ? (
                                            <>
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="text-green-500">
                                                    {formatPercentage(coin.price_change_percentage_1h_in_currency)}%
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <TrendingDown className="w-4 h-4 text-red-500" />
                                                <span className="text-red-500">
                                                    {formatPercentage(coin.price_change_percentage_1h_in_currency)}%
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </td>
                                {/* 24h Volume */}
                                <td className="px-4 text-right text-sm">
                                    <div className="flex items-center justify-end gap-1">
                                        {coin.price_change_percentage_24h > 0 ? (
                                            <>
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="text-green-500">
                                                    {formatPercentage(coin.price_change_percentage_24h)}%
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <TrendingDown className="w-4 h-4 text-red-500" />
                                                <span className="text-red-500">
                                                    {formatPercentage(coin.price_change_percentage_24h)}%
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </td>
                                {/* 7d Volume */}
                                <td className="px-4 text-right text-sm">
                                    <div className="flex items-center justify-end gap-1">
                                        {coin.price_change_percentage_7d_in_currency > 0 ? (
                                            <>
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="text-green-500">
                                                    {formatPercentage(coin.price_change_percentage_7d_in_currency)}%
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <TrendingDown className="w-4 h-4 text-red-500" />
                                                <span className="text-red-500">
                                                    {formatPercentage(coin.price_change_percentage_7d_in_currency)}%
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </td>
                                {/* Market Cap */}
                                <td className="px-4 text-right text-sm text-gray-200">
                                    {formatMarketCap(coin.market_cap)}
                                </td>
                                {/* Volume 24h */}
                                <td className="px-4 text-right text-sm text-gray-200">
                                    {formatMarketCap(coin.total_volume)}
                                </td>
                                {/* Current Price */}
                                <td className="px-4 text-right text-sm text-gray-200">
                                    {formatMarketCap(coin.current_price)}
                                </td>
                                {/* Sparkline */}
                                <td className='flex justify-end'>
                                    {sparklineData ? (
                                        <Sparkline data={sparklineData} color={sparklineColor} />
                                    ) : (
                                        'No Data'
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;
