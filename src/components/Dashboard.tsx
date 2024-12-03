'use client'
import { useEffect, useState } from 'react';
import { fetchCoinGeckoData } from '@/lib/utils.api';
import Overallstats from './Overallstats';
import Trending from './Trending';

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

    return (
        <main className="rounded-xl min-h-screen">
            <Overallstats data={data} />
            <Trending data={data} />
        </main>
    );
};

export default Dashboard;