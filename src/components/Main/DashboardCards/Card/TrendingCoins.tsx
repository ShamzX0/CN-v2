import { ChartNoAxesCombined, DollarSign, ImageIcon, Percent } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
    trendingCoins: Coins[];
    isLoading?: boolean;
}

const TrendingCoinsSkeleton = () => {
    return (
        <div className="flex justify-center">
            <div className="bg-[#13233f] rounded-2xl px-6 w-full pt-2 min-h-[310px]">
                {/* Header Skeleton */}
                <div className="flex w-full items-center mb-4 h-[28px]">
                    <div className="w-2/5">
                        <div className="h-6 w-32 bg-gray-500 rounded animate-pulse"></div>
                    </div>
                    <div className="w-1/5 flex justify-end pr-4">
                        <div className="h-4 w-4 bg-gray-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-1/5 flex justify-end pr-4">
                        <div className="h-4 w-4 bg-gray-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-1/5 flex justify-end pr-2">
                        <div className="h-4 w-4 bg-gray-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Table Skeleton */}
                <table className="w-full">
                    <tbody>
                        {[...Array(5)].map((_, index) => (
                            <tr key={index} className="h-[46px]">
                                <td className="py-[13px] w-2/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-4 bg-gray-500 rounded animate-pulse"></div>
                                        <div className="w-6 h-6 bg-gray-500 rounded-full animate-pulse"></div>
                                        <div className="flex flex-col gap-1">
                                            <div className="w-16 h-3 bg-gray-500 rounded animate-pulse"></div>
                                            <div className="w-12 h-2 bg-gray-500 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 text-right w-1/5 pr-4">
                                    <div className="w-16 h-3 bg-gray-500 rounded animate-pulse ml-auto"></div>
                                </td>
                                <td className="py-2 text-right w-1/5 pr-4">
                                    <div className="w-16 h-3 bg-gray-500 rounded animate-pulse ml-auto"></div>
                                </td>
                                <td className="py-2 text-right w-1/5 pr-2">
                                    <div className="w-20 h-6 bg-gray-500 rounded animate-pulse ml-auto"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TrendingCoins = (props: Props) => {
    const { trendingCoins, isLoading } = props;

    // Track which images have failed to load
    const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

    if (isLoading) {
        return <TrendingCoinsSkeleton />;
    }

    const formatPriceChangeWithArrow = (priceChange: number) => {
        const isPositive = priceChange > 0;
        const arrow = isPositive ? "▲" : "▼";
        return (
            <span className={`flex items-center justify-end ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {arrow} {Math.abs(priceChange).toFixed(2)}%
            </span>
        );
    };

    const handleImageError = (coinId: string) => {
        setFailedImages(prev => ({
            ...prev,
            [coinId]: true
        }));
    };

    const CoinImage = ({ coin }: { coin: any }) => {
        if (failedImages[coin.item.id]) {
            return (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-800">
                    <ImageIcon size={20} className="text-gray-400" />
                </div>
            );
        }

        return (
            <Image
                src={coin.item.thumb}
                alt={coin.item.name}
                className="rounded-full"
                width={24}
                height={24}
                onError={() => handleImageError(coin.item.id)}
                style={{ minWidth: '24px', minHeight: '24px' }}
            />
        );
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-full bg-[#13233f] rounded-2xl px-6 pt-2">
            {/* Single Row Header */}
            <div className="flex w-full items-center mb-4">
                <div className="w-2/5">
                    <h1 className="text-base font-bold font-mono border-b-[1px] border-[#00FFFF] inline-block">
                        Trending Coins
                    </h1>
                </div>
                <div className="w-1/5 flex justify-end pr-4">
                    <DollarSign className="text-[#00FFFF] mr-2 border-[0.3px] rounded-full" size={15} />
                </div>
                <div className="w-1/5 flex justify-end pr-4">
                    <Percent className="text-[#00FFFF] mr-5 border-[0.3px] rounded-full" size={15} />
                </div>
                <div className="w-1/5 flex justify-end pr-2">
                    <ChartNoAxesCombined className="text-[#00FFFF] mr-[33px] border-[0.3px] rounded-full" size={15} />
                </div>
            </div>

            {/* Table */}
            <table className="w-full">
                <tbody>
                    {trendingCoins?.slice(0, 5).map((coin: { item: any }, index: number) => {
                        const { item } = coin;

                        return (
                            <tr
                                key={item.id}
                            >
                                <td className="py-[8px] w-2/5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs min-w-[20px]">{index + 1}.</span>
                                        <CoinImage coin={coin} />
                                        <div className="flex flex-col min-w-[50px]">
                                            <span className="text-[10px]">{item.name}</span>
                                            <div className='flex'>
                                                <span className="text-xs text-gray-400">
                                                    {item.symbol.toUpperCase()}
                                                    <span className="text-[9px] text-[#00FFFF] ml-1">
                                                        #{item.market_cap_rank}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 text-right w-1/5 pr-4">
                                    <span className="text-xs">${item.data.price.toFixed(2)}</span>
                                </td>
                                <td className="py-2 text-right w-1/5 pr-4">
                                    <span className="text-xs">
                                        {formatPriceChangeWithArrow(item.data.price_change_percentage_24h.usd)}
                                    </span>
                                </td>
                                <td className="py-2 text-right w-1/5 pr-2">
                                    <Image
                                        src={item.data.sparkline}
                                        height={100}
                                        width={100}
                                        alt={`${item.name} Sparkline`}
                                        className="w-20 h-6 ml-auto"
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TrendingCoins;