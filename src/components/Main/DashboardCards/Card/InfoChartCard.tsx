import React, { useMemo } from 'react';

interface Props {
    amount: number;
    changePercent: number;
    title: string;
}

// Currency formatting constants
const CURRENCY_FORMATS = [
    { threshold: 1e12, suffix: 'T', divisor: 1e12 },
    { threshold: 1e9, suffix: 'B', divisor: 1e9 },
    { threshold: 1e6, suffix: 'M', divisor: 1e6 },
];

const InfoChartCard: React.FC<Props> = ({ amount, changePercent, title }) => {
    // Format currency values with appropriate suffix
    const formattedAmount = useMemo(() => {
        const format = CURRENCY_FORMATS.find(f => amount >= f.threshold);

        if (format) {
            return `$${(amount / format.divisor).toFixed(2)}${format.suffix}`;
        }

        return `$${amount.toFixed(2)}`;
    }, [amount]);

    // Generate trend line points - memoized to avoid recalculation on re-renders
    const trendLinePoints = useMemo(() => {
        const points: string[] = [];
        const steps = 24;
        const height = 20;
        const width = 200;
        const amplitude = Math.min(Math.abs(changePercent) * 2, 20);
        const isPositive = changePercent > 0;

        for (let i = 0; i < steps; i++) {
            const x = (width / steps) * i;
            const progress = i / steps;
            const curve = Math.sin(progress * Math.PI) * amplitude;
            const noise = Math.random() * 15 - 5;

            // Simplified trend calculation
            const trend = isPositive
                ? height - (height * 0.6) * progress
                : (height * 0.3) + (height * 0.5) * progress;

            const y = trend + curve + noise;
            points.push(`${x},${y}`);
        }

        return points.join(' ');
    }, [changePercent]);

    // Determine style based on trend direction
    const trendColor = changePercent > 0 ? "#22c55e" : "#ef4444";
    const trendArrow = changePercent > 0 ? '▲' : '▼';
    const trendTextClass = changePercent > 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="p-[10px] w-fit h-full space-y-4 rounded-2xl bg-[#13233f]">
            <div className="flex items-center justify-between">
                <h2 className="text-[11px] text-gray-200 font-bold font-mono tracking-tighter">{title}</h2>
                <div className="font-bold text-[10px] text-gray-200">
                    {formattedAmount}
                </div>
            </div>
            <div className="flex text-xs items-center gap-2">
                <span className={trendTextClass}>
                    {trendArrow} {Math.abs(changePercent).toFixed(2)}% (24h)
                </span>
            </div>
            <div className="relative">
                <svg width="200" height="40" className="w-full">
                    <polyline
                        points={trendLinePoints}
                        fill="none"
                        stroke={trendColor}
                        strokeWidth="1.5"
                    />
                </svg>
                <div className="flex justify-between text-[8px] text-gray-400 mt-2">
                    <span>24h ago</span>
                    <span>Now</span>
                </div>
            </div>
        </div>
    );
};

export default InfoChartCard;