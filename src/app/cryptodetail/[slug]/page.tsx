'use client';
import { useParams } from 'next/navigation';
import useCoinDetail from '@/hooks/useCoinDetail';
import StatItem, {
    getFirstRowStats,
    getSecondRowStats
} from '../../../components/Main/StatsItem/StatsItem';
import CryptoDetailSkeleton from './CryptoDetailSkeleton';
import CryptoChartContainer from '@/components/Main/CryptoChart/CryptoChartContainer';
import CoinHeader from '@/components/Main/CryptoDetail/CoinHeader';
import PriceSection from '@/components/Main/CryptoDetail/PriceSection';

interface CoinData {
    market_cap_rank: number;
    image?: {
        large: string;
    };
    name: string;
    symbol: string;
    current_price: number;
    sentiment_votes_up_percentage?: number;
    sentiment_votes_down_percentage?: number;
}

export default function CryptoDetailPage() {
    const params = useParams();
    const cryptoSlug = params.slug as string;
    const { data: coinData, isLoading } = useCoinDetail(cryptoSlug);

    if (isLoading) {
        return <CryptoDetailSkeleton />;
    }

    if (!coinData) {
        return <div>Error loading coin data</div>;
    }

    const firstRowStats = getFirstRowStats(coinData);
    const secondRowStats = getSecondRowStats(coinData);

    return (
        <div className="text-[#f4f4f4] py-5">
            <div className="w-full mx-auto">
                <div className="flex flex-col gap-4 md:flex-row">
                    {/* Left section - coin info */}
                    <div className="md:w-1/4 pt-4 flex-col space-y-3">
                        <CoinHeader
                            rank={coinData.market_cap_rank}
                            imageUrl={coinData.image?.large}
                            name={coinData.name}
                            symbol={coinData.symbol}
                        />

                        <PriceSection
                            currentPrice={coinData.current_price}
                            sentimentVotesUpPercentage={coinData.sentiment_votes_up_percentage ?? 0}
                            sentimentVotesDownPercentage={coinData.sentiment_votes_down_percentage ?? 0}
                            name={coinData.name}
                        />
                    </div>

                    {/* Right section - stats grid */}
                    <div className="w-3/4 flex flex-col gap-4 py-4">
                        <div className="flex gap-4 justify-between">
                            {firstRowStats.map((stat, index) => (
                                <StatItem key={`row1-${index}`} {...stat} />
                            ))}
                        </div>
                        <div className="flex gap-4 justify-between">
                            {secondRowStats.map((stat, index) => (
                                <StatItem key={`row2-${index}`} {...stat} />
                            ))}
                        </div>
                    </div>
                </div>

                {cryptoSlug && <CryptoChartContainer coinId={cryptoSlug} />}
            </div>
        </div>
    );
}