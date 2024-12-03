import { CircleDollarSign, DollarSign, Percent, Slash } from "lucide-react";
import Image from "next/image";
import React from "react"

const Trending = ({ data }) => {

    const btcPrice = data?.bitcoinData?.bitcoin?.usd;
    const marketCap = data?.globalData?.data?.total_market_cap?.usd;
    const trendingCoins = data?.trendingCoins?.coins;

    const formatPriceChange = (priceChange: number) => {
        const isPositive = priceChange > 0;
        return (
            <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{priceChange?.toFixed(2)}%
            </span>
        );
    };

    return (
        <div className="flex justify-end">
            {/* Trending CARD */}
            <div className="bg-[#0f1d30] rounded-2xl  px-6 w-2/6 pt-2">
                <div className="flex flex-row justify-between">
                    {/* header + indicators*/}
                    <h1 className="flex mb-3 text-base font-bold font-mono">Trending Coins</h1>
                    <div className="flex flex-row items-center space-x-1">
                        <p className="text-[#00FFFF]"><DollarSign size={16} /></p>
                        <p>/</p>
                        <p className="text-[#00FFFF]"><Percent size={16} /></p>
                    </div>
                </div>

                {trendingCoins?.map((coin: { item: any; }, index: number) => {
                    if (index > 4) return null;
                    const { item } = coin;

                    return (
                        <div key={item.id} className="flex items-center my-2 py-1 justify-between hover:bg-[#1a2842] rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="text-sm">
                                    <span className="text-xs">#</span>{index + 1}
                                </div>
                                <Image
                                    src={item.thumb}
                                    alt={item.name}
                                    className="rounded-full"
                                    width={20}
                                    height={6}
                                />
                                <div className="flex flex-col">
                                    <span className="text-[12px]">{item.name}</span>
                                    <span className="text-xs text-gray-400">{item.symbol}</span>
                                </div>
                            </div>
                            {/* Price & %P.change */}
                            <div className="flex items-center flex-col">
                                <span className="font-medium">${item.data.price.toFixed(2)}</span>
                                <div className="flex text-[11px] gap-2">
                                    {formatPriceChange(item.data.price_change_percentage_24h.usd)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Trending;