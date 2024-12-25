'use client'
import { useEffect, useState } from 'react';
import { fetchCoinGeckoData } from '@/lib/utils.api';
import DashboardCards from './DashboardCards/DashboardCards';
import CryptoTable from './Table/CryptoTable';
import RunningTab from './RunningTab/RunningTab';
import Intro from './Intro/Intro';

const Main = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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


    if (isLoading) return <div>Loading..</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <main className="rounded-xl min-h-screen min-w-screen">
            <div>
                <RunningTab data={data} />
                <Intro />
                <DashboardCards data={data} />
            </div>
            <div className='border-[1.3px] opacity-80 border-[#00d9ff] neon-card my-4 border-transparent' />
            <CryptoTable tableCoins={data.tableData} />
        </main>
    );
};

export default Main;