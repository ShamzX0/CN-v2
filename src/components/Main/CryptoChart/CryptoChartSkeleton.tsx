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
            <div className="flex space-x-2">
                {['24h', '7d', '30d', '90d', '1y'].map((_, i) => (
                    <div
                        key={`timeframe-${i}`}
                        className="h-8 w-12 bg-slate-700 rounded animate-pulse"
                    />
                ))}
            </div>
        </div>

        {/* Chart container */}
        <div className="w-full h-72 p-4 rounded-xl bg-slate-800">
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
    </div>
);

export default CryptoChartSkeleton;