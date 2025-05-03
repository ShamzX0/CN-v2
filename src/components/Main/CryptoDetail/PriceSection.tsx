import CoinSentiment from '../CoinSentiment/CoinSentiment';

interface PriceSectionProps {
    currentPrice: number;
    sentimentVotesUpPercentage: number;
    sentimentVotesDownPercentage: number;
    name: string;
}

export default function PriceSection({
    currentPrice,
    sentimentVotesUpPercentage,
    sentimentVotesDownPercentage,
    name
}: PriceSectionProps) {
    return (
        <div className="flex flex-col space-y-4">
            <div>
                <h2 className="text-4xl font-bold">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 2
                    }).format(currentPrice)}
                </h2>
            </div>

            <div className="w-full">
                <CoinSentiment
                    upVotesPercentage={sentimentVotesUpPercentage}
                    downVotesPercentage={sentimentVotesDownPercentage}
                    name={name}
                    totalVotes={1600000}
                />
            </div>
        </div>
    );
} 