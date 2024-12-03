'use client'
import { useEffect, useState } from 'react';
import { fetchCoinGeckoData } from '@/lib/utils.api';
import Overallstats from './Overallstats';
import Trending from './TrendingCoins';
import TrendingNFTs from './TrendingNfts';
import MarketCapCard from './MarketCapCard';
import DominanceCard from './DominanceCard';
import FearGreedIndex from '@/components/FearGreedIndex';
import VolumeCard from './VolumeCard';  // Make sure this points to the correct path

const Dashboard = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Extract required data from the API response
    const marketCap = data?.globalData?.data?.total_market_cap?.usd || 0;
    const volume = data?.globalData?.data?.total_volume?.usd || 0;
    const marketCapChangePercent = data?.globalData?.data?.market_cap_change_percentage_24h_usd || 0;
    const volumeChangePercent = ((volume - (volume / (1 + marketCapChangePercent / 100))) / (volume / (1 + marketCapChangePercent / 100))) * 100 || 0;

    console.log(data, 'ALL DATA')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const receivedData = await fetchCoinGeckoData();

                if (receivedData) {
                    setData(receivedData);
                } else {
                    setError('Failed to fetch data');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <main className="rounded-xl min-h-screen">
            <Overallstats data={data} />
            <Trending data={data} />
            <TrendingNFTs data={data} />
            <DominanceCard data={data} />
            <div className="flex gap-4 flex-wrap">  {/* Added container for cards */}
                <MarketCapCard
                    marketCap={marketCap}
                    changePercent={marketCapChangePercent}
                />
                <VolumeCard
                    volume={volume}
                    changePercent={volumeChangePercent}
                />
                <FearGreedIndex />
            </div>
        </main>
    );
};

export default Dashboard;