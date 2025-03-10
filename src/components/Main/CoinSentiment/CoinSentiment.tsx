import { ArrowUp, ArrowDown, CircleGauge } from 'lucide-react';

type CoinSentimentProps = {
    upVotesPercentage?: number;
    downVotesPercentage?: number;
    name?: string;
    totalVotes?: number;
};

const CoinSentiment = ({
    upVotesPercentage = 0,
    downVotesPercentage = 0,
    name = 'Crypto',
    totalVotes = 0
}: CoinSentimentProps) => {
    // Ensure we have valid percentages
    const upPercent = upVotesPercentage || 0;
    const downPercent = downVotesPercentage || 0;

    // Format total votes for display (e.g., 1.6M)
    const formatVotes = (votes: number): string => {
        if (votes >= 1000000) {
            return `${(votes / 1000000).toFixed(1)}M`;
        } else if (votes >= 1000) {
            return `${(votes / 1000).toFixed(1)}K`;
        }
        return votes.toString();
    };

    const formattedVotes = formatVotes(totalVotes);

    return (
        <div className="flex flex-col mt-4 bg-slate-800 rounded-lg p-2 w-full">
            <div className="flex justify-between items-center mb-2">
                <span className='flex items-center text-[#2cd3d3] space-x-1'>
                    <CircleGauge size={10} />
                    <h3 className="text-[#2cd3d3] text-[10px]">Community sentiment</h3>
                </span>
                <span className="text-[#2cd3d3] text-[8px]">{formattedVotes} votes</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400">
                    <ArrowUp className="w-5 h-5" />
                    <span className="font-bold text-md">{upPercent.toFixed(0)}%</span>
                </div>

                <div className="relative h-1 flex-1 mx-1 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-green-400 rounded-l-full"
                        style={{ width: `${upPercent}%` }}
                    />
                    <div
                        className="absolute top-0 right-0 h-full bg-red-400 rounded-r-full"
                        style={{ width: `${downPercent}%` }}
                    />
                </div>

                <div className="flex items-center gap-2 text-red-400">
                    <span className="font-bold text-md">{downPercent.toFixed(0)}%</span>
                    <ArrowDown className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
};

export default CoinSentiment;