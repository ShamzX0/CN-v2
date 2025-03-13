'use client';
import React, { useState } from 'react';
import CryptoChart from './CryptoChart';
import PriceStatistics from './PriceStatistics';
import useCoinChartData from '@/hooks/useCoinChartData';

interface CryptoChartContainerProps {
    coinId: string;
}

const CryptoChartContainer: React.FC<CryptoChartContainerProps> = ({ coinId }) => {
    // Available timeframe options
    const timeframes = [
        { label: '24h', value: 'day', days: 1 },
        { label: '7d', value: 'week', days: 7 },
        { label: '30d', value: 'month', days: 30 },
        { label: '90d', value: 'month', days: 90 },
        { label: '1y', value: 'year', days: 365 },
    ];

    // Default to 90 days
    const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[3]);

    // Fetch chart data using SWR
    const { data } = useCoinChartData(coinId, selectedTimeframe.days);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedTimeframe.label} price chart</h2>
                <div className="flex rounded-md overflow-hidden">
                    {timeframes.map((timeframe) => (
                        <button
                            key={timeframe.label}
                            onClick={() => setSelectedTimeframe(timeframe)}
                            className={`px-3 py-1 text-sm ${selectedTimeframe.label === timeframe.label
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                }`}
                        >
                            {timeframe.label}
                        </button>
                    ))}
                </div>
            </div>

            {data && data.prices ? (
                <>
                    <CryptoChart
                        priceData={data.prices}
                        volumeData={data.total_volumes}
                        timeframe={selectedTimeframe.value as 'day' | 'week' | 'month' | 'year'}
                    />

                    {/* Show price statistics if available */}
                    {data.priceChange && (
                        <PriceStatistics
                            priceChange={data.priceChange}
                            timeframe={selectedTimeframe.label}
                            currency="USD"
                        />
                    )}
                </>
            ) : (
                <div className="flex items-center justify-center h-96 w-full bg-slate-800 rounded-xl">
                    <p className="text-gray-400">Loading chart data...</p>
                </div>
            )}
        </div>
    );
};
export default CryptoChartContainer