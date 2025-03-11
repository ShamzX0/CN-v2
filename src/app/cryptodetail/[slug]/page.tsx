'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import useCoinDetail from '@/hooks/useCoinDetail';
import CoinSentiment from '../../../components/Main/CoinSentiment/CoinSentiment';
import StatItem, {
    getFirstRowStats,
    getSecondRowStats
} from '../../../components/Main/StatsItem/StatsItem';

export default function CryptoDetailPage() {
    const params = useParams();
    const cryptoSlug = params.slug as string;
    const { data: CoinData } = useCoinDetail(cryptoSlug);

    // Get stats arrays using the imported functions
    const firstRowStats = getFirstRowStats(CoinData);
    const secondRowStats = getSecondRowStats(CoinData);

    return (
        <div className="min-h-screen text-[#f4f4f4] p-5">
            {/* Main content wrapper - centered */}
            <div className="w-full mx-auto">
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
                                <h2 className="text-4xl font-bold">
                                    {CoinData?.current_price ? new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        maximumFractionDigits: 2
                                    }).format(CoinData.current_price) : '$0.00'}
                                </h2>
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