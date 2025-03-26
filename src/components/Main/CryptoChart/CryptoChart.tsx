'use client';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface CryptoChartProps {
    priceData: [number, number][];
    volumeData?: [number, number][];
    timeframe?: 'day' | 'week' | 'month' | 'year';
}

const CryptoChart: React.FC<CryptoChartProps> = ({
    priceData,
    timeframe = 'month'
}) => {
    if (!priceData || priceData.length === 0) {
        return (
            <div className="flex items-center justify-center h-72 w-full bg-slate-800 rounded-xl">
                <p className="text-gray-400">No chart data available</p>
            </div>
        );
    }

    // Transform the data for Recharts
    const formattedData = priceData.map(([timestamp, price]) => ({
        date: timestamp,
        price: price
    }));

    // Format date for x-axis labels based on timeframe
    const formatXAxis = (timestamp: number) => {
        const date = new Date(timestamp);

        switch (timeframe) {
            case 'day':
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            case 'week':
                return date.toLocaleDateString([], { weekday: 'short' });
            case 'month':
            case 'year':
                return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            default:
                return date.toLocaleDateString();
        }
    };

    // Format date for tooltip
    const formatTooltipDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString();
    };

    // Function to format price for Y-axis ticks (compact format)
    const formatYAxisTick = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        } else {
            return `$${value.toFixed(2)}`;
        }
    };

    // Function to format price for tooltip (detailed format)
    const formatDetailedPrice = (value: number) => {
        return `$${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    // Calculate price domain for better visualization
    const prices = priceData.map(item => item[1]);
    const minPrice = Math.min(...prices) * 0.99; // 1% padding below
    const maxPrice = Math.max(...prices) * 1.01; // 1% padding above

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatXAxis}
                        tick={{ fill: '#f4f4f4' }}
                        dy={10}
                    />
                    <YAxis
                        domain={[minPrice, maxPrice]}
                        tick={{ fill: '#f4f4f4' }}
                        tickFormatter={formatYAxisTick}
                    />
                    <Tooltip
                        labelFormatter={formatTooltipDate}
                        formatter={(value: number) => [formatDetailedPrice(value), 'Price']}
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#f4f4f4' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#3B82F6" // Blue color from Tailwind
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#3B82F6' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CryptoChart;