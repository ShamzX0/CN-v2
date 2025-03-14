import formatLargeNumber from '@/helpers/numberHelper';
import React from 'react';

interface Props {
    btcData: BitcoinPriceResponse
    globalData: GlobalData
}

const RunningTab = (props: Props) => {
    const { btcData, globalData } = props;

    const btcMCchange = btcData?.bitcoin?.usd_24h_change;
    const marketCap = globalData?.total_market_cap?.usd;
    const activeCrypto = globalData?.active_cryptocurrencies;
    const totalTradingPairs = globalData?.markets;
    const totalMCchange = globalData?.market_cap_change_percentage_24h_usd;
    const btcDominance = globalData?.market_cap_percentage?.btc;
    const ethDominance = globalData?.market_cap_percentage?.eth;
    const solDominance = globalData?.market_cap_percentage?.sol;

    const StatsContent = () => (
        <div className="flex items-center gap-6 text-[8px] text-gray-300 py-2 px-4 whitespace-nowrap">
            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />
            <div>
                <span>Active Projects: </span>
                <span className="text-cyan-400">{activeCrypto}</span>
            </div>

            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div>
                <span>Total Trading Pairs: </span>
                <span className="text-cyan-400">{totalTradingPairs}</span>
            </div>

            <div className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div>
                <span>Total Market Cap:</span>
                <span className="text-cyan-400">{formatLargeNumber(marketCap)}</span>
            </div>

            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div>
                <span>BTC Market Cap Change 24h:&nbsp;</span>
                <span className={`ml-1 ${btcMCchange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {btcMCchange > 0 ? '↑' : '↓'}
                    {Math.abs(btcMCchange).toFixed(2)}%
                </span>
            </div>

            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div>
                <span>Total MC Change 24h:&nbsp;</span>
                <span className={`ml-1 ${totalMCchange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {totalMCchange > 0 ? '↑' : '↓'}
                    {Math.abs(totalMCchange).toFixed(2)}%
                </span>
            </div>

            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div className="flex items-center gap-1">
                <span>Market Share:</span>
                <div className="flex items-center">

                    <span className="text-orange-400">BTC:
                        <span className="text-gray-100"> {formatLargeNumber(btcDominance)}%</span>
                    </span>

                    <span className="text-cyan-400 mx-5">/</span>

                    <span className="text-blue-500">ETH:
                        <span className="text-gray-100"> {formatLargeNumber(ethDominance)}%</span>
                    </span>

                    <span className="text-cyan-400 mx-5">/</span>

                    <span className="text-purple-500">SOL:
                        <span className="text-gray-100"> {formatLargeNumber(solDominance)}%</span>
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <section className="relative mb-5 max-w-[1500px]">
            <div className="w-full overflow-x-hidden relative bg-[#13233f] before:content-[''] before:absolute before:top-0 before:left-0 before:w-12 before:h-full before:z-10 before:pointer-events-none before:bg-gradient-to-r before:from-[#0f1d30] before:to-transparent after:content-[''] after:absolute after:top-0 after:right-0 after:w-12 after:h-full after:z-10 after:pointer-events-none after:bg-gradient-to-l after:from-[#0f1d30] after:to-transparent">
                <div className="flex animate-[scroll_40s_linear_infinite]">
                    {/* First copy */}
                    <StatsContent />
                    {/* Second copy */}
                    <StatsContent />
                </div>
            </div>
        </section>
    );
};

export default RunningTab;