import { CircleHelp } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const FearGreedIndex = () => {
    const [indexData, setIndexData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.alternative.me/fng/');
                const data = await response.json();
                setIndexData(data.data[0]);
            } catch (err) {
                setError('Failed to fetch Fear & Greed Index');
            }
        };
        fetchData();
    }, []);

    const getGradientColor = (value) => {
        const normalizedValue = value / 100;
        return -90 + (normalizedValue * 180);
    };

    if (error) return (
        <div className="text-red-500">{error}</div>
    );

    if (!indexData) return (
        <div className="text-white">Loading...</div>
    );

    return (
        <div className="bg-[#1A1D23] p-2 rounded-xl w-fit relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Fear & Greed Index</h2>
            </div>

            {/* Gauge Section */}
            <div className="relative h-20 mb-4">
                <svg className="w-full" height="40" viewBox="0 0 200 100">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF4444" />
                            <stop offset="50%" stopColor="#FFBB33" />
                            <stop offset="100%" stopColor="#00C851" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M20 80 A80 80 0 0 1 180 80"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <line
                        x1="100"
                        y1="80"
                        x2="100"
                        y2="10"
                        stroke="white"
                        strokeWidth="2"
                        transform={`rotate(${getGradientColor(parseInt(indexData.value))}, 100, 80)`}
                    />
                    <circle
                        cx="100"
                        cy="80"
                        r="4"
                        fill="white"
                    />
                </svg>

                <div className='flex flex-col items-center justify-center'>
                    <div className="text-green-400 text-xs">
                        {indexData.value_classification}
                    </div>
                    <div className="font-bold text-green-400 text-lg">
                        {indexData.value}
                    </div>
                </div>
                {/* Question Mark / Time Stamp */}
                <div className="absolute bottom-[-15px] right-2">
                    <div className="relative inline-block group">
                        <CircleHelp size={12} className="text-gray-400" />
                        <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 right-6 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-md p-2 shadow-sm transition-all duration-200 z-20 whitespace-nowrap">
                            <div className="flex justify-between text-[8px] text-gray-400">
                                <span>Last updated: {new Date(indexData.timestamp * 1000).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FearGreedIndex;