import { ChartNoAxesCombined, DollarSign, Percent } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
    data: any;
}

const TrendingCoins = (props: Props) => {
    const { data } = props;
    const trendingCoins = data?.trendingCoins?.coins || [];

    const formatPriceChangeWithArrow = (priceChange: number) => {
        const isPositive = priceChange > 0;
        const arrow = isPositive ? "▲" : "▼";
        return (
            <span className={`flex items-center justify-end ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {arrow} {Math.abs(priceChange).toFixed(2)}%
            </span>
        );
    };

    return (
        <div className="flex justify-center">
            <div className="bg-[#0f1d30] rounded-2xl px-6 w-full pt-2">
                {/* Single Row Header */}
                <div className="flex w-full items-center mb-4">
                    {/* Title column - matches width of coin info column */}
                    <div className="w-2/5">
                        <h1 className="text-base font-bold font-mono border-b-[1px] border-[#00FFFF] inline-block">
                            Trending Coins
                        </h1>
                    </div>

                    {/* Price column header */}
                    <div className="w-1/5 flex justify-end pr-4">
                        <DollarSign className="text-[#00FFFF] mr-2 border-[0.3px] rounded-full" size={15} />
                    </div>

                    {/* Percentage column header */}
                    <div className="w-1/5 flex justify-end pr-4">
                        <Percent className="text-[#00FFFF] mr-5 border-[0.3px] rounded-full" size={15} />
                    </div>

                    {/* Chart column header */}
                    <div className="w-1/5 flex justify-end pr-2">
                        <ChartNoAxesCombined className="text-[#00FFFF] mr-[33px] border-[0.3px] rounded-full" size={15} />
                    </div>
                </div>

                {/* Table */}
                <table className="w-full">
                    <tbody>
                        {trendingCoins.slice(0, 5).map((coin: { item: any }, index: number) => {
                            const { item } = coin;
                            return (
                                <tr
                                    key={item.id}
                                    className="hover:bg-[#1a2842] rounded-lg"
                                >
                                    {/* Rank + Image + Name Column */}
                                    <td className="py-[7px] w-2/5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm min-w-[20px]">{index + 1}.</span>
                                            <Image
                                                src={item.thumb}
                                                alt={item.name}
                                                className="rounded-full"
                                                width={24}
                                                height={24}
                                            />
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

                                    {/* Price Column */}
                                    <td className="py-2 text-right w-1/5 pr-4">
                                        <span className="text-xs">${item.data.price.toFixed(2)}</span>
                                    </td>

                                    {/* Price Change Column */}
                                    <td className="py-2 text-right w-1/5 pr-4">
                                        <span className="text-xs">{formatPriceChangeWithArrow(item.data.price_change_percentage_24h.usd)}</span>
                                    </td>

                                    {/* Sparkline Column */}
                                    <td className="py-2 text-right w-1/5 pr-2">
                                        <img
                                            src={item.data.sparkline}
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
        </div >
    );
};

export default TrendingCoins;