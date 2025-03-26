'use client';
import React, { useState, Suspense } from 'react';
import CryptoChart from './CryptoChart';
import PriceStatistics from './PriceStatistics';
import CryptoChartSkeleton from './CryptoChartSkeleton';
import useCoinChartData from '@/hooks/useCoinChartData';

interface CryptoChartContainerProps {
    coinId: string;
}

// This component handles the actual data fetching and chart rendering
const ChartContent = ({ coinId }: { coinId: string }) => {
    // Available timeframe options
    const timeframes = [
        { label: '24h', value: 'day', days: 1 },
        { label: '7d', value: 'week', days: 7 },
        { label: '30d', value: 'month', days: 30 },
        { label: '90d', value: 'month', days: 90 },
        { label: '1y', value: 'year', days: 365 },
    ];

    // Chart type options (new)
    const chartTypes = [
        { label: 'Price', value: 'price' },
        { label: 'Market Cap', value: 'marketCap' },
    ];

    // Default to 90 days
    const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[3]);
    // Default to price chart (new)
    const [selectedChartType, setSelectedChartType] = useState(chartTypes[0]);

    // Fetch chart data using SWR
    const { data } = useCoinChartData(coinId, selectedTimeframe.days);

    // If data is not available yet, show a loading state
    if (!data || !data.prices) {
        return (
            <div className="flex items-center justify-center h-96 w-full bg-slate-800 rounded-xl">
                <p className="text-gray-400">Loading chart data...</p>
            </div>
        );
    }

    return (
        <div className='mt-6'>
            <div className="flex justify-between mb-4 pl-16 w-[840px] ">
                <div className="flex rounded-md overflow-hidden">
                    {chartTypes.map((chartType) => (
                        <button
                            key={chartType.label}
                            onClick={() => setSelectedChartType(chartType)}
                            className={`px-3 py-1 text-xs ${selectedChartType.value === chartType.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                }`}
                        >
                            {chartType.label}
                        </button>
                    ))}
                </div>

                <div className="flex rounded-md overflow-hidden">
                    {timeframes.map((timeframe) => (
                        <button
                            key={timeframe.label}
                            onClick={() => setSelectedTimeframe(timeframe)}
                            className={`px-3 py-1 text-xs ${selectedTimeframe.label === timeframe.label
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                }`}
                        >
                            {timeframe.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Replace the vertical stacking with horizontal flex layout */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-2/3">
                    <CryptoChart
                        priceData={data.prices}
                        marketCapData={data.market_caps}
                        volumeData={data.total_volumes}
                        timeframe={selectedTimeframe.value as 'day' | 'week' | 'month' | 'year'}
                        chartType={selectedChartType.value as 'price' | 'marketCap'}
                    />
                </div>

                {/* Always show the statistics panel */}
                {data.priceChange && (
                    <div className="w-full lg:w-1/3">
                        <PriceStatistics
                            priceChange={data.priceChange}
                            timeframe={selectedTimeframe.label}
                            currency="USD"
                            chartType={selectedChartType.value as 'price' | 'marketCap'}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// This is the container component that handles the Suspense boundary
const CryptoChartContainer: React.FC<CryptoChartContainerProps> = ({ coinId }) => {
    const { isLoading } = useCoinChartData(coinId, 90);

    if (isLoading) {
        return <CryptoChartSkeleton />;
    } else {
        return <ChartContent coinId={coinId} />;
    }
};

export default CryptoChartContainer;