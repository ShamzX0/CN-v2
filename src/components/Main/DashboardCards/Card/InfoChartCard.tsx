import React from 'react';

interface Props {
    amount: number;
    changePercent: number;
    title: string;
}

const InfoChartCard: React.FC<Props> = ({ amount, changePercent, title }) => {
    const formatVolume = (value: number): string => {
        if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
        if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
        if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
        return `$${value.toFixed(2)}`;
    };

    const generateTrendLine = (): string => {
        const points: string[] = [];
        const steps = 24;
        const height = 20;
        const width = 200;

        const amplitude = Math.min(Math.abs(changePercent) * 2, 20);

        for (let i = 0; i < steps; i++) {
            const x = (width / steps) * i;
            const progress = i / steps;
            const curve = Math.sin(progress * Math.PI) * amplitude;
            const noise = Math.random() * 15 - 5;

            const trend = changePercent > 0 ?
                height - (height * 0.6) * progress :
                (height * 0.3) + (height * 0.5) * progress;

            const y = trend + curve + noise;
            points.push(`${x},${y}`);
        }

        return points.join(' ');
    };

    return (
        <div className="p-[10px] w-fit h-full space-y-4 rounded-2xl bg-[#13233f]">
            <div className="flex items-center justify-between">
                <h2 className="text-[11px] text-gray-200 font-bold font-mono tracking-tighter">{title}</h2>
                <div className="font-bold text-[10px] text-gray-200 ">
                    {formatVolume(amount)}
                </div>
            </div>
            <div className="flex text-xs items-center gap-2">
                <span className={`${changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {changePercent > 0 ? '▲' : '▼'} {Math.abs(changePercent).toFixed(2)}% (24h)
                </span>
            </div>
            <div className="relative">
                <svg width="200" height="40" className="w-full">
                    <polyline
                        points={generateTrendLine()}
                        fill="none"
                        stroke={changePercent > 0 ? "#22c55e" : "#ef4444"}
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