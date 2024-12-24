import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoData } from '@/lib/types';

interface Props {
    tableCoins: CryptoData
}

const CryptoTable = (props: Props) => {


    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    const formatMarketCap = (marketCap: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(marketCap);
    };

    const formatPercentage = (percentage: number): string => {
        return Math.abs(percentage).toFixed(2);
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg bg-[#0f1d30] p-4">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">#</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Price</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">24h %</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Market Cap</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Volume(24h)</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {data?.map((coin: CryptoData, index: number) => (
                        <tr
                            key={coin.id}
                            className="border-b border-gray-700 hover:bg-[#1a2842] transition-colors duration-200"
                        >
                            <td className="px-4 py-4 text-sm text-gray-300">{index + 1}</td>
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={coin.image}
                                        alt={coin.name}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-200">{coin.name}</span>
                                        <span className="text-xs text-gray-400 uppercase">{coin.symbol}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-right text-sm text-gray-200">
                                {formatPrice(coin.current_price)}
                            </td>
                            <td className="px-4 py-4 text-right text-sm">
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
                            <td className="px-4 py-4 text-right text-sm text-gray-200">
                                {formatMarketCap(coin.market_cap)}
                            </td>
                            <td className="px-4 py-4 text-right text-sm text-gray-200">
                                {formatMarketCap(coin.total_volume)}
                            </td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>
    );
};

export default CryptoTable;