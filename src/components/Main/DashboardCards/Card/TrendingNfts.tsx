import { DollarSign, Percent, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
    trendingData: any
}

const TrendingNFTs = (props: Props) => {
    const { trendingData } = props;
    const trendingNfts = trendingData?.nfts;

    // Track which images have failed to load
    const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

    const formatPriceChange = (priceChange: number) => {
        const isPositive = priceChange > 0;
        return (
            <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{priceChange?.toFixed(2)}%
            </span>
        );
    };

    const handleImageError = (nftId: string) => {
        setFailedImages(prev => ({
            ...prev,
            [nftId]: true
        }));
    };

    const NFTImage = ({ nft }: { nft: any }) => {
        if (failedImages[nft.id]) {
            return (
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-800">
                    <ImageIcon size={20} className="text-gray-400" />
                </div>
            );
        }

        return (
            <Image
                src={nft.thumb}
                alt={nft.name}
                className="rounded-full"
                width={20}
                height={20}
                onError={() => handleImageError(nft.id)}
                style={{ minWidth: '20px', minHeight: '20px' }}
            />
        );
    };

    return (
        <div className="">
            <div className="bg-[#101e36] rounded-2xl px-6 w-full pt-2">
                <div className="flex flex-row justify-between mb-5 mr-2">
                    <h1 className="flex text-base font-bold font-mono border-b-[1px] border-[#00FFFF]">Trending NFTs</h1>
                    <div className="flex flex-row items-center space-x-2">
                        <p className="text-[#00FFFF] border-[0.3px] rounded-full"><DollarSign size={13} /></p>
                        <p>/</p>
                        <p className="text-[#00FFFF] border-[0.3px] rounded-full"><Percent size={13} /></p>
                    </div>
                </div>

                {trendingNfts?.map((nft: any, index: number) => {
                    if (index > 4) return null;

                    return (
                        <div key={nft.id} className="flex items-center py-[4px] justify-between hover:bg-[#1a2842] rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="text-sm">
                                    <span className="text-xs">{index + 1}.</span>
                                </div>
                                <NFTImage nft={nft} />
                                <div className="flex flex-col">
                                    <span className="text-[12px]">{nft.name}</span>
                                    <span className="text-xs text-gray-400">{nft.symbol}</span>
                                </div>
                            </div>
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