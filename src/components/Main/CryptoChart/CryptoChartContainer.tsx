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

    // Chart type options
    const chartTypes = [
        { label: 'Price', value: 'price' },
        { label: 'Market Cap', value: 'marketCap' },
    ];

    // Default to 90 days
    const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[3]);
    // Default to price chart
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
        <div className="flex flex-col lg:flex-row w-full gap-4 my-5">
            {/* Left container - Controls and Chart (2/3 width) */}
            <div className="w-full lg:w-3/4 flex flex-col">
                {/* Controls section */}
                <div className="flex justify-between mb-4 w-full">
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

                {/* Chart section */}
                <CryptoChart
                    priceData={data.prices}
                    marketCapData={data.market_caps}
                    volumeData={data.total_volumes}
                    timeframe={selectedTimeframe.value as 'day' | 'week' | 'month' | 'year'}
                    chartType={selectedChartType.value as 'price' | 'marketCap'}
                />
            </div>

            {/* Right container - Statistics panel (1/3 width) */}
            {data.priceChange && (
                <div className="w-full lg:w-1/4 flex">
                    <div className="rounded-xl w-full">
                        <PriceStatistics
                            priceChange={data.priceChange}
                            timeframe={selectedTimeframe.label}
                            currency="USD"
                            chartType={selectedChartType.value as 'price' | 'marketCap'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CryptoChartContainer;