import useFearGreed from '@/hooks/useFearGreed';
import { CircleHelp } from 'lucide-react';
import React from 'react';

// Define sentiment ranges and their properties in a single place
const SENTIMENT_RANGES = [
    { min: 0, max: 25, label: 'Extreme Fear', color: '#FF0000' }, // Bloody red
    { min: 26, max: 45, label: 'Fear', color: '#FF4444' }, // Redish
    { min: 46, max: 55, label: 'Neutral', color: '#FFBB33' }, // Yellow
    { min: 56, max: 75, label: 'Greed', color: '#00C851' }, // Green
    { min: 76, max: 100, label: 'Extreme Greed', color: '#007E33' }, // Dark green
];

const FearGreedIndex = () => {
    const { data: fearGreed } = useFearGreed();

    // If no data is available, return null
    if (!fearGreed?.data?.length) {
        return null; // or a loading state
    }

    // Extract current value safely
    const currentValue = (() => {
        const value = fearGreed?.data[0]?.value;
        return value ? parseInt(value, 10) : 0;
    })();

    // Get sentiment classification and color in one go
    const sentiment = (() => {
        const match = SENTIMENT_RANGES.find(
            range => currentValue >= range.min && currentValue <= range.max
        );
        return match || { label: 'Unknown', color: '#FFFFFF' }; // Fallback
    })();

    // Calculate gauge needle rotation angle
    const needleRotation = -90 + ((currentValue / 100) * 180);

    // Format timestamp safely
    const formattedTimestamp = (() => {
        const timestamp = Number(fearGreed?.data[0]?.timestamp);
        return timestamp ? new Date(timestamp * 1000).toLocaleString() : 'N/A';
    })();

    return (
        <div className="bg-[#13233f] p-4 w-full h-[150px] rounded-xl">
            {/* Header */}
            <h2 className="flex justify-center text-[11px] font-bold font-mono">Fear & Greed</h2>

            {/* Gauge Section - restructured for better containment */}
            <div className="relative h-[100px]">
                {/* SVG Gauge - adjusted viewBox and positioning */}
                <svg className="absolute top-0 left-0 w-full" height="70" viewBox="0 0 200 100">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF0000" /> {/* Extreme Fear */}
                            <stop offset="20%" stopColor="#FF4444" /> {/* Fear */}
                            <stop offset="50%" stopColor="#FFBB33" /> {/* Neutral */}
                            <stop offset="75%" stopColor="#00C851" /> {/* Greed */}
                            <stop offset="100%" stopColor="#007E33" /> {/* Extreme Greed */}
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
                        stroke={sentiment.color}
                        strokeWidth="2"
                        transform={`rotate(${needleRotation}, 100, 80)`}
                    />
                    <circle
                        cx="100"
                        cy="80"
                        r="4"
                        fill={sentiment.color}
                    />
                </svg>

                {/* Value display - repositioned */}
                <div className='absolute bottom-[5px] left-1/2 transform w-full -translate-x-1/2 flex flex-col items-center'>
                    <div className="text-[8px]" style={{ color: sentiment.color }}>
                        {sentiment.label}
                    </div>
                    <div className="font-bold text-md">
                        {fearGreed.data[0].value}
                    </div>
                </div>

                {/* Question Mark / Time Stamp */}
                <div className="absolute bottom-[-15px] right-[-5px]">
                    <div className="relative inline-block group">
                        <CircleHelp size={12} className="text-gray-400" />
                        <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 right-6 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-md p-2 shadow-sm transition-all duration-200 z-20 whitespace-nowrap">
                            <div className="text-[8px] text-gray-400">
                                <span>Last updated: {formattedTimestamp}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FearGreedIndex;