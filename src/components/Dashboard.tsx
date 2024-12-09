'use client'
import { useEffect, useState } from 'react';
import { fetchCoinGeckoData } from '@/lib/utils.api';
import Overallstats from './Overallstats';
import DashboardCards from './DashboardCards';
import MainHeader from './MainHeader';

const Dashboard = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);


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

    if (isLoading) return <div>Loading..</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <main className="rounded-xl min-h-screen min-w-screen">
            <Overallstats data={data} />
            <MainHeader />
            <DashboardCards data={data} />
        </main>
    );
};

export default Dashboard;