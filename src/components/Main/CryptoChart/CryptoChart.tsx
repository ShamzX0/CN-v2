'use client';
import React, { useState, useEffect } from 'react';
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

// Stats row component to reduce repetition
const StatRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between pb-3 border-b-[1px] border-gray-700">
        <span className="text-xs text-gray-400">{label}:</span>
        <span className="text-xs text-gray-400">{value}</span>
    </div>
);

// Last stat row without bottom border
const LastStatRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between pb-3">
        <span className="text-xs text-gray-400">{label}:</span>
        <span className="text-xs text-gray-400">{value}</span>
    </div>
);


const CryptoChart: React.FC<CryptoChartProps> = ({
    priceData,
    marketCapData,
    timeframe = 'month',
    chartType = 'price'
}) => {
    // Add state for loading error
    const [isLoadingError, setIsLoadingError] = useState(false);

    // Choose which data to display based on chartType
    const chartData = chartType === 'price' ? priceData : marketCapData;
    const lineColor = chartType === 'price' ? '#00dffd' : '#3B82F6';
    const chartLabel = chartType === 'price' ? 'Price' : 'Market Cap';

    // Effect to handle loading timeout
    useEffect(() => {
        // Only start the timer if we're in a loading state (no data yet)
        if (!chartData || chartData.length === 0) {
            const timer = setTimeout(() => {
                setIsLoadingError(true);
            }, 4000);

            // Cleanup timer on unmount or when data arrives
            return () => clearTimeout(timer);
        }
    }, [chartData]);

    // No data view
    if (!chartData || chartData.length === 0) {
        return (
            <div className='flex w-[1280px]'>
                <div className="flex items-center justify-center h-72 mb-2 w-3/4 bg-slate-800 rounded-xl">
                    {isLoadingError ? (
                        <div className="flex flex-col items-center text-center px-8">
                            <div className="text-red-500 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-md font-bold text-red-400 mb-2">Woops! Something went wrong!</h3>
                            <p className="text-xs text-gray-300 mb-4">Unable to load chart data at this time.</p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-[#2ba7fac2] transition-colors"
                                >
                                    Reload page
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center text-gray-400 text-xs px-4">
                            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600 mb-2"></div>
                            <p className="text-sm tracking-widest ml-2 mt-9 font-unbounded text-[#00c3ff87] hover:text-blue-400 transition-colors animate-pulse">
                                Fetching {chartLabel}...
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex">
                    <div className="w-[300px] h-full p-1 ml-4 mt-[-25px]">
                        <h3 className="text-xs font-semibold text-gray-100 mb-3">
                            Detailed {chartLabel} Statistics (<span className="text-[9px]">{timeframe}</span>)
                        </h3>
                        <div className="flex flex-col space-y-3">
                            <StatRow label={`${chartLabel} Change`} value="N/A" />
                            <StatRow label={`Starting ${chartLabel}`} value="N/A" />
                            <StatRow label={`Current ${chartLabel}`} value="N/A" />
                            <StatRow label={`Highest ${chartLabel}`} value="N/A" />
                            <StatRow label={`Lowest ${chartLabel}`} value="N/A" />
                            <StatRow label="Lowest on" value="N/A" />
                            <LastStatRow label="Highest on" value="N/A" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Transform the data for Recharts
    const formattedData = chartData.map(([timestamp, value]) => ({
        date: timestamp,
        value: value
    }));

    // Utility functions for formatting
    const formatters = {
        // Format date for x-axis labels based on timeframe
        xAxis: (timestamp: number) => {
            const date = new Date(timestamp);

            switch (timeframe) {
                case 'day':
                    return date.toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });
                case 'week':
                    return date.toLocaleDateString([], { weekday: 'short' });
                case 'month':
                case 'year':
                    return date.toLocaleDateString([], {
                        day: 'numeric',
                        month: 'short'
                    });
                default:
                    return date.toLocaleDateString();
            }
        },

        // Format date for tooltip
        tooltipDate: (timestamp: number) => new Date(timestamp).toLocaleString(),

        // Format currency values with appropriate units
        formatCurrency: (value: number, isDetailed = false) => {
            // For detailed view (tooltip)
            if (isDetailed) {
                return `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;
            }

            // For Y-axis labels
            if (chartType === 'marketCap' || value >= 1000) {
                if (value >= 1000000000) {
                    return `$${(value / 1000000000).toFixed(1)}B`;
                } else if (value >= 1000000) {
                    return `$${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                    return `$${(value / 1000).toFixed(1)}K`;
                }
            }

            // Special handling for very small values
            if (value < 0.01) {
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
                        return `$${value.toFixed(zeroCount + 3)}`;
                    }
                }
            }

            // Default case
            return `$${value.toFixed(2)}`;
        }
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
                        tickFormatter={formatters.xAxis}
                        tick={{ fill: '#f4f4f4', fontSize: 8 }}
                        dy={10}
                        interval="preserveStartEnd"
                        minTickGap={50}
                    />
                    <YAxis
                        domain={[minValue, maxValue]}
                        tick={{ fill: '#f4f4f4', fontSize: 11 }}
                        tickFormatter={value => formatters.formatCurrency(value)}
                    />
                    <Tooltip
                        labelFormatter={formatters.tooltipDate}
                        formatter={(value: number) => [
                            formatters.formatCurrency(value, true),
                            chartLabel
                        ]}
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#f4f4f4', fontSize: 12 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={lineColor}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: lineColor }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CryptoChart;