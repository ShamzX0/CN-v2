'use client';
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowUp, ArrowDown } from 'lucide-react';
import useCoinDetail from '@/hooks/useCoinDetail';
import CoinSentiment from '../../../components/Main/CoinSentiment/CoinSentiment';

type StatItemProps = {
    label: string;
    value: string | number;
    isPercentage?: boolean;
    percentageValue?: number;
};

const StatItem = ({ label, value, isPercentage, percentageValue }: StatItemProps) => (
    <div className="flex-1 flex flex-col justify-center items-center w-[130px] space-y-2 p-4 rounded-xl border border-gray-600">
        <div className="flex items-center gap-1">
            <h3 className={`text-gray-400 ${label.length > 17 ? 'text-[12px]' : 'text-sm'}`}>{label}</h3>
            <HiOutlineQuestionMarkCircle className="w-3 h-3 text-gray-400" />
        </div>
        {isPercentage ? (
            <div className={`inline-flex items-center ${percentageValue && percentageValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {percentageValue && percentageValue >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                <span className="text-md font-semibold">{percentageValue ? Math.abs(percentageValue).toFixed(2) : 0}%</span>
            </div>
        ) : (
            <p className="text-sm font-semibold mt-1">{value}</p>
        )}
    </div>
);

export default function CryptoDetailPage() {
    const params = useParams();
    const cryptoSlug = params.slug as string;
    const { data: CoinData } = useCoinDetail(cryptoSlug);

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

    const formatCryptoAmount = (amount: number, symbol: string): string => {
        return `${new Intl.NumberFormat('en-US').format(amount)} ${symbol?.toUpperCase()}`;
    };

    // First row stats (5 items)
    const firstRowStats = [
        { label: 'Market Cap', value: formatLargeNumber(CoinData?.market_cap) },
        {
            label: 'FDV',
            value: CoinData?.fully_diluted_valuation ? formatLargeNumber(CoinData.fully_diluted_valuation) : 'N/A'
        },
        { label: 'All time high', value: formatPrice(CoinData?.ath) },
        {
            label: 'ATH Change %',
            value: '',
            isPercentage: true,
            percentageValue: CoinData?.ath_change_percentage
        },
        {
            label: '24h Trading Volume',
            value: formatLargeNumber(CoinData?.total_volume)
        }
    ];

    // Second row stats (5 items)
    const secondRowStats = [
        {
            label: 'Price Change 24h',
            value: '',
            isPercentage: true,
            percentageValue: CoinData?.price_change_percentage_24h
        },
        {
            label: 'Price Change 30d',
            value: '',
            isPercentage: true,
            percentageValue: CoinData?.price_change_percentage_30d
        },
        {
            label: 'Price Change 1Y',
            value: '',
            isPercentage: true,
            percentageValue: CoinData?.price_change_percentage_1y
        },
        {
            label: 'Total Supply',
            value: CoinData?.total_supply ? formatCryptoAmount(CoinData.total_supply, CoinData?.symbol) : 'N/A'
        },
        {
            label: 'Max Supply',
            value: CoinData?.max_supply ? formatCryptoAmount(CoinData.max_supply, CoinData?.symbol) : 'N/A'
        }
    ];

    return (
        <div className="min-h-screen text-[#f4f4f4] p-5">
            {/* Main content wrapper - centered */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row">
                    {/* Left section - coin info */}
                    <div className="md:w-1/4 pt-4 px-4 flex-col space-y-3">
                        <div className="flex items-center gap-2">
                            <div className='italic bg-slate-700 p-1 rounded-md'>
                                #{CoinData?.market_cap_rank}
                            </div>
                            <div className="w-10 h-10 bg-gray-800 rounded-full">
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
                            <div className='flex space-x-2'>
                                <h1 className="text-3xl font-bold">{CoinData?.name}</h1>
                            </div>
                        </div>

                        {/* Price and sentiment */}
                        <div className="flex flex-col space-y-4">
                            <div>
                                <h2 className="text-4xl font-bold">{formatPrice(CoinData?.current_price)}</h2>
                            </div>

                            {/* Community Sentiment Component */}
                            <div className="w-full">
                                <CoinSentiment
                                    upVotesPercentage={CoinData?.sentiment_votes_up_percentage}
                                    downVotesPercentage={CoinData?.sentiment_votes_down_percentage}
                                    name={CoinData?.name}
                                    totalVotes={1600000}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right section - stats grid */}
                    <div className="w-3/4 flex flex-col gap-4 p-4 rounded-xl">
                        {/* First row - 5 items */}
                        <div className="flex gap-4 justify-between">
                            {firstRowStats.map((stat, index) => (
                                <StatItem key={`row1-${index}`} {...stat} />
                            ))}
                        </div>
                        {/* Second row - 5 items */}
                        <div className="flex gap-4 justify-between">
                            {secondRowStats.map((stat, index) => (
                                <StatItem key={`row2-${index}`} {...stat} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chart section */}
                <div className="mt-12 px-4 md:px-8">
                    <h2 className="text-xl font-bold mb-4">90 days daily chart</h2>
                    <div className="p-4 rounded-xl h-72 flex items-center justify-center">
                        <p className="text-gray-400">Chart will be implemented in a future step</p>
                    </div>
                </div>
            </div>
        </div>
    );
}