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

    const getGradientColor = (value: number) => {
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
        <div className="bg-[#0f1d30] p-4 w-full h-[150px] rounded-xl ">
            {/* Header */}
            <h2 className="flex justify-center text-[11px] font-bold font-mono">Fear & Greed</h2>

            {/* Gauge Section - restructured for better containment */}
            <div className="relative h-[100px]">
                {/* SVG Gauge - adjusted viewBox and positioning */}
                <svg className="absolute top-0 left-0 w-full" height="70" viewBox="0 0 200 100">
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
                        y2="20"
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

                {/* Value display - repositioned */}
                <div className='absolute bottom-[-5px] left-1/2 transform w-full -translate-x-1/2 flex flex-col items-center'>
                    <div className="text-green-400 text-[8px]">
                        {indexData.value_classification}
                    </div>
                    <div className="font-bold text-green-400 text-md">
                        {indexData.value}
                    </div>
                </div>

                {/* Question Mark / Time Stamp */}
                <div className="absolute bottom-[-15px] right-[-5px]">
                    <div className="relative inline-block group">
                        <CircleHelp size={12} className="text-gray-400" />
                        <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 right-6 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-md p-2 shadow-sm transition-all duration-200 z-20 whitespace-nowrap">
                            <div className="text-[8px] text-gray-400">
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