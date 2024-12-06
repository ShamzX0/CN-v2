import { DollarSign, Percent } from "lucide-react";
import Image from "next/image";
import React from "react"

interface Props {
    data: any
}

const TrendingNFTs = (props: Props) => {
    const { data } = props;
    const trendingNfts = data?.trendingCoins.nfts

    const formatPriceChange = (priceChange: number) => {
        const isPositive = priceChange > 0;
        return (
            <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{priceChange?.toFixed(2)}%
            </span>
        );
    };

    return (
        <div className="flex">
            {/* Trending NFTs CARD */}
            <div className="bg-[#0f1d30] rounded-2xl px-6 w-full pt-2">
                <div className="flex flex-row justify-between mb-3">
                    {/* header + indicators*/}
                    <h1 className="flex text-base font-bold font-mono border-b-[1px] border-[#00FFFF]">Trending NFTs</h1>
                    <div className="flex flex-row items-center space-x-1">
                        <p className="text-[#00FFFF]"><DollarSign size={13} /></p>
                        <p>/</p>
                        <p className="text-[#00FFFF]"><Percent size={13} /></p>
                    </div>
                </div>

                {trendingNfts?.map((nft: any, index: number) => {
                    if (index > 4) return null;

                    return (
                        <div key={nft.id} className="flex items-center my-1 py-2 justify-between hover:bg-[#1a2842] rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="text-sm">
                                    <span className="text-xs">#</span>{index + 1}
                                </div>
                                <Image
                                    src={nft.thumb}
                                    alt={nft.name}
                                    className="rounded-full"
                                    width={20}
                                    height={6}
                                />
                                <div className="flex flex-col">
                                    <span className="text-[12px]">{nft.name}</span>
                                    <span className="text-xs text-gray-400">{nft.symbol}</span>
                                </div>
                            </div>
                            {/* Floor Price & 24h Change */}
                            <div className="flex items-center flex-col">
                                <span className="text-[14px]">{nft.data.floor_price}</span>
                                <div className="flex text-[11px] gap-2">
                                    {formatPriceChange(nft.floor_price_24h_percentage_change)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrendingNFTs;