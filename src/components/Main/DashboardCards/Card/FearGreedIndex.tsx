import useFearGreed from '@/hooks/useFearGreed';
import { CircleHelp } from 'lucide-react';
import React from 'react';

const FearGreedIndex = () => {
    const { data: fearGreed } = useFearGreed();

    // Safe parsing of the value with fallback
    const getValue = (): number => {
        const value = fearGreed?.data[0]?.value;
        return value ? parseInt(value, 10) : 0;
    };

    const getGradientColor = (value: number) => {
        const normalizedValue = value / 100;
        return -90 + (normalizedValue * 180);
    };

    // Safe timestamp formatting with fallback
    const getFormattedTimestamp = (): string => {
        const timestamp = Number(fearGreed?.data[0]?.timestamp)
        if (!timestamp) return 'N/A';
        return new Date(timestamp * 1000).toLocaleString();
    };

    const getClassification = (value: number): string => {
        if (value >= 0 && value <= 25) return 'Extreme Fear';
        if (value > 25 && value <= 45) return 'Fear';
        if (value > 45 && value <= 55) return 'Neutral';
        if (value > 55 && value <= 75) return 'Greed';
        if (value > 75 && value <= 100) return 'Extreme Greed';
        return 'Unknown'; // Fallback
    };

    const getSentimentColor = (classification: string): string => {
        switch (classification) {
            case 'Extreme Fear':
                return '#FF0000'; // Bloody red
            case 'Fear':
                return '#FF4444'; // Redish
            case 'Neutral':
                return '#FFBB33'; // Yellow
            case 'Greed':
                return '#00C851'; // Green
            case 'Extreme Greed':
                return '#007E33'; // Dark green
            default:
                return '#FFFFFF'; // White as fallback
        }
    };

    if (!fearGreed?.data?.length) {
        return null; // or a loading state
    }

    const currentValue = getValue();
    const classification = getClassification(currentValue);
    const sentimentColor = getSentimentColor(classification);

    return (
        <div className="bg-[#13233f] p-4 w-full h-[150px] rounded-xl ">
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
                        stroke={sentimentColor}
                        strokeWidth="2"
                        transform={`rotate(${getGradientColor(currentValue)}, 100, 80)`}
                    />
                    <circle
                        cx="100"
                        cy="80"
                        r="4"
                        fill={sentimentColor}
                    />
                </svg>

                {/* Value display - repositioned */}
                <div className='absolute bottom-[5px] left-1/2 transform w-full -translate-x-1/2 flex flex-col items-center'>
                    <div className="text-[8px]" style={{ color: sentimentColor }}>
                        {classification}
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
                                <span>Last updated: {getFormattedTimestamp()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FearGreedIndex;