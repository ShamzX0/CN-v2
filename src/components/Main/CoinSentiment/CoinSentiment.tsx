import { ArrowUp, ArrowDown, CircleGauge } from 'lucide-react';

interface CoinSentimentProps {
    upVotesPercentage?: number;
    downVotesPercentage?: number;
    name?: string;
    totalVotes?: number;
}

// Moved outside component to prevent re-creation on renders
const formatVotes = (votes: number): string => {
    if (votes >= 1_000_000) return `${(votes / 1_000_000).toFixed(1)}M`;
    if (votes >= 1_000) return `${(votes / 1_000).toFixed(1)}K`;
    return votes.toString();
};

const CoinSentiment = ({
    upVotesPercentage = 0,
    downVotesPercentage = 0,
    name = 'Crypto',
    totalVotes = 0
}: CoinSentimentProps) => {
    return (
        <div className="w-full p-2 mt-2 rounded-lg bg-slate-800">
            <div className="flex items-center justify-between mb-2">
                <span className="flex items-center space-x-1 text-[#2cd3d3]">
                    <CircleGauge size={10} />
                    <h3 className="text-[10px]">Community sentiment</h3>
                </span>
                <span className="text-[8px]">{formatVotes(totalVotes)} votes</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400">
                    <ArrowUp className="w-5 h-5" />
                    <span className="text-md font-bold">{upVotesPercentage.toFixed(0)}%</span>
                </div>

                <div className="relative flex-1 h-1 mx-1 overflow-hidden rounded-full">
                    <div
                        className="absolute top-0 left-0 h-full bg-green-400 rounded-l-full"
                        style={{ width: `${upVotesPercentage}%` }}
                    />
                    <div
                        className="absolute top-0 right-0 h-full bg-red-400 rounded-r-full"
                        style={{ width: `${downVotesPercentage}%` }}
                    />
                </div>

                <div className="flex items-center gap-2 text-red-400">
                    <span className="text-md font-bold">{downVotesPercentage.toFixed(0)}%</span>
                    <ArrowDown className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
};

export default CoinSentiment;