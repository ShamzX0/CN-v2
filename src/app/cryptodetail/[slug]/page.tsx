'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CryptoDetailPage() {
    const params = useParams();
    const cryptoSlug = params.slug as string;
    const [cryptoData, setCryptoData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // For now, just set loading to false and use mock data
        // We'll implement actual data fetching later
        setTimeout(() => {
            setCryptoData({
                name: cryptoSlug === 'btc' ? 'Bitcoin' : cryptoSlug.toUpperCase(),
                symbol: cryptoSlug.toUpperCase()
            });
            setLoading(false);
        }, 1000);
    }, [cryptoSlug]);

    if (loading) return <div className="min-h-screen bg-navy-900 text-white p-8">Loading...</div>;
    if (!cryptoData) return <div className="min-h-screen bg-navy-900 text-white p-8">Cryptocurrency not found</div>;

    return (
        <div className="min-h-screen bg-navy-900 text-white p-8">
            <h1 className="text-3xl font-bold">Crypto Detail Page for {cryptoData.name}</h1>
            <p>Symbol: {cryptoData.symbol}</p>
        </div>
    );
}