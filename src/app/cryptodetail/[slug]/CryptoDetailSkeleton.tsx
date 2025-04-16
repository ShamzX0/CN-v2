'use client';

/**
 * Loading placeholder for CryptoChart component
 */
const CryptoChartSkeleton = () => (
    <div className="w-full mt-6">
        {/* Header with title and timeframe options */}
        <div className="flex justify-between items-center mb-2">
            {/* Title/Selected timeframe */}
            <div className="h-6 w-24 bg-slate-700 rounded animate-pulse" />

            {/* Timeframe options */}
            <div className="flex space-x-2 w-[600px]">
                {['24h', '7d', '30d', '90d'].map((_, i) => (
                    <div
                        key={`timeframe-${i}`}
                        className="h-8 w-12 bg-slate-700 rounded animate-pulse"
                    />
                ))}
            </div>
        </div>

        <div className="flex w-full">
            {/* Chart container */}
            <div className="w-5/6 h-72 p-4 rounded-xl bg-slate-800">
                <div className="w-full h-full flex flex-col">
                    {/* Chart area with grid lines */}
                    <div className="relative flex-grow">
                        {/* Horizontal grid lines */}
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={`h-line-${i}`}
                                className="absolute w-full h-px bg-slate-700"
                                style={{ top: `${20 + i * 15}%` }}
                            />
                        ))}

                        {/* Vertical grid lines */}
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={`v-line-${i}`}
                                className="absolute h-full w-px bg-slate-700"
                                style={{ left: `${i * 20}%` }}
                            />
                        ))}

                        {/* Fake chart line */}
                        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-blue-500 opacity-50">
                            <div className="absolute w-full h-8 bg-gradient-to-r from-blue-500/10 via-blue-500/20 to-blue-500/10 rounded-full blur-sm transform -translate-y-1/2" />
                        </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="h-6 mt-2 flex justify-between">
                        {[...Array(6)].map((_, i) => (
                            <div key={`x-label-${i}`} className="w-10 h-3 bg-slate-700 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Price Statistics container - positioned side by side with chart */}
            <div className="w-2/6 pl-4">
                <PriceStatisticsSkeleton />
            </div>
        </div>
    </div>
);

/**
 * Skeleton component for Detailed Price Statistics
 */
const PriceStatisticsSkeleton = () => (
    <div className="w-full rounded-xl bg-slate-800 p-4 shadow-md">
        {/* Title */}
        <div className="flex items-center mb-5">
            <div className="h-6 w-48 bg-slate-700 rounded animate-pulse" />
        </div>

        {/* Stats items - using a loop for repetitive items */}
        <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
                <div key={`stat-item-${i}`} className="flex justify-between items-center">
                    <div className="h-5 w-32 bg-slate-700 rounded animate-pulse" />
                    <div className="h-5 w-28 bg-slate-700 rounded animate-pulse" />
                </div>
            ))}
        </div>
    </div>
);

/**
 * Main component for the entire crypto detail page skeleton
 */
const CryptoDetailSkeleton = () => {
    return (
        <div className="min-h-screen text-[#f4f4f4] py-5">
            {/* Main content wrapper - centered */}
            <div className="w-full mx-auto">
                <div className="flex flex-col gap-4 md:flex-row">
                    {/* Left section - coin info skeleton */}
                    <div className="md:w-1/4 pt-4 flex-col space-y-3">
                        <div className="flex items-center gap-2">
                            {/* Rank placeholder */}
                            <div className="h-6 w-10 bg-slate-700 rounded-md animate-pulse"></div>

                            {/* Coin image placeholder */}
                            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>

                            {/* Coin name placeholder */}
                            <div className="h-8 w-32 bg-gray-700 rounded-md animate-pulse"></div>
                        </div>

                        {/* Price and sentiment skeleton */}
                        <div className="flex flex-col space-y-4">
                            {/* Price placeholder */}
                            <div>
                                <div className="h-10 w-40 bg-gray-700 rounded-md animate-pulse"></div>
                            </div>

                            {/* Community Sentiment placeholder */}
                            <div className="w-full">
                                <div className="h-[68px] bg-gray-700 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right section - stats grid skeleton */}
                    <div className="w-3/4 flex flex-col gap-4 py-4">
                        {/* First row - 5 stats items */}
                        <div className="flex gap-4 justify-between">
                            {Array(5).fill(0).map((_, index) => (
                                <div key={`skeleton-row1-${index}`} className="flex-1 h-20 bg-gray-700 rounded-md animate-pulse"></div>
                            ))}
                        </div>

                        {/* Second row - 5 stats items */}
                        <div className="flex gap-4 justify-between">
                            {Array(5).fill(0).map((_, index) => (
                                <div key={`skeleton-row2-${index}`} className="flex-1 h-20 bg-gray-700 rounded-md animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Include the chart skeleton with integrated price statistics */}
                <CryptoChartSkeleton />
            </div>
        </div>
    );
};

export default CryptoDetailSkeleton;