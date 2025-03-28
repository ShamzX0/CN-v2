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
    marketCapData?: [number, number][];
    volumeData?: [number, number][];
    timeframe?: 'day' | 'week' | 'month' | 'year';
    chartType?: 'price' | 'marketCap';
}

const CryptoChart: React.FC<CryptoChartProps> = ({
    priceData,
    marketCapData,
    timeframe = 'month',
    chartType = 'price'
}) => {
    // Choose which data to display based on chartType
    const chartData = chartType === 'price' ? priceData : marketCapData;
    const lineColor = chartType === 'price' ? '#00dffd' : '#3B82F6';


    if (!chartData || chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-72 w-full bg-slate-800 rounded-xl">
                <p className="text-gray-400">No chart data available</p>
            </div>
        );
    }

    // Transform the data for Recharts
    const formattedData = chartData.map(([timestamp, value]) => ({
        date: timestamp,
        value: value
    }));

    // Format date for x-axis labels based on timeframe
    const formatXAxis = (timestamp: number) => {
        const date = new Date(timestamp);

        switch (timeframe) {
            case 'day':
                // Format like "8:00 AM", "12:00 PM"
                return date.toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
            case 'week':
                // Only show day of week for certain intervals
                return date.toLocaleDateString([], { weekday: 'short' });
            case 'month':
            case 'year':
                // For longer timeframes, show cleaner date format
                // This will display like "26 Mar"
                return date.toLocaleDateString([], {
                    day: 'numeric',
                    month: 'short'
                });
            default:
                return date.toLocaleDateString();
        }
    };

    // Format date for tooltip
    const formatTooltipDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString();
    };

    // Function to format value for Y-axis ticks with support for very small values
    const formatYAxisTick = (value: number) => {
        if (chartType === 'marketCap') {
            if (value >= 1000000000) {
                return `$${(value / 1000000000).toFixed(1)}B`;
            } else if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(1)}K`;
            }
        } else {
            // Price formatting with special handling for very small values
            if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(1)}K`;
            } else if (value < 0.01) {
                // Find the significant digits for very small values
                const valueStr = value.toString();
                const decimalIndex = valueStr.indexOf('.');

                if (decimalIndex !== -1) {
                    let zeroCount = 0;
                    let found = false;

                    for (let i = decimalIndex + 1; i < valueStr.length; i++) {
                        if (valueStr[i] === '0') {
                            zeroCount++;
                        } else {
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        // Show with appropriate number of decimal places
                        return `$${value.toFixed(zeroCount + 3)}`;
                    }
                }
            }
        }

        // Default case
        return `$${value.toFixed(2)}`;
    };

    // Function to format value for tooltip (detailed format)
    const formatDetailedValue = (value: number) => {
        return `$${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    // Calculate domain for better visualization
    const values = chartData.map(item => item[1]);
    const minValue = Math.min(...values) * 0.99; // 1% padding below
    const maxValue = Math.max(...values) * 1.01; // 1% padding above

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
                        tick={{ fill: '#f4f4f4', fontSize: 8 }}
                        dy={10}
                        interval="preserveStartEnd"
                        minTickGap={50}
                    />
                    <YAxis
                        domain={[minValue, maxValue]}
                        tick={{ fill: '#f4f4f4', fontSize: 11 }}
                        tickFormatter={formatYAxisTick}
                    />
                    <Tooltip
                        labelFormatter={formatTooltipDate}
                        formatter={(value: number) => [
                            formatDetailedValue(value),
                            chartType === 'price' ? 'Price' : 'Market Cap'
                        ]}
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#f4f4f4', fontSize: 12 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={lineColor} // Use the dynamic color
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: lineColor }} // Also update the activeDot fill color
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CryptoChart;