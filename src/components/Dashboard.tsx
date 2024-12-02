'use client'
import { useEffect, useState } from 'react';
import { fetchCoinGeckoData } from '@/lib/utils.api';
import Overallstats from './Overallstats';

const Dashboard = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const receivedData = await fetchCoinGeckoData();
                console.log('Result:', receivedData);
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

    const btcPrice = data?.bitcoinData?.bitcoin?.usd;
    const marketCap = data?.globalData?.data?.total_market_cap?.usd;
    const trendingCoins = data?.trendingCoins?.coins;


    return (
        <main className="rounded-xl min-h-screen">
            <Overallstats data={data} />

            <div className='flex justify-end'>
                <div className='bg-[#0f1d30] w-2/6 px-[50px] py-6'>
                    <h1 className='flex justify-center'>Trending Coins</h1>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    {/* <h1>BTC Price: ${btcPrice?.toLocaleString()}</h1>
                <h2>Market Cap: ${marketCap?.toLocaleString()}</h2>
                Add your other UI elements here */}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;