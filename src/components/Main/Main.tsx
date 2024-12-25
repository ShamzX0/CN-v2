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
            {/* Divider */}
            <div className='border-b-[1.5px] border-transparent border-[#00d9ff] neon-card mt-4' />
            {/* <div className='border-[0.5px] opacity-30 my-2 ' /> */}
            <CryptoTable tableCoins={data.tableData} />
        </main>
    );
};

export default Main;