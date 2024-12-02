import formatLargeNumber from '@/helper/numberHelper';
import React from 'react';
import styles from './Overallstats.module.css';

const Overallstats = (props: any) => {
    const { data } = props;

    const btcMCchange = data?.bitcoinData?.bitcoin?.usd_24h_change;
    const marketCap = data?.globalData?.data?.total_market_cap?.usd;
    const activeCrypto = data?.globalData?.data?.active_cryptocurrencies;
    const totalTradingPairs = data?.globalData?.data?.markets;
    const totalMCchange = data?.globalData?.data?.market_cap_change_percentage_24h_usd;
    const btcDominance = data?.globalData?.data?.market_cap_percentage?.btc;
    const ethDominance = data?.globalData?.data?.market_cap_percentage?.eth;
    const solDominance = data?.globalData?.data?.market_cap_percentage?.sol;

    const StatsContent = () => (
        <div className="flex items-center gap-6 text-[10px] text-gray-300 py-2 px-4 whitespace-nowrap">
            <div className="h-4 w-px bg-[#00FFFF] opacity-30" />
            <div>Active Projects: <span className="text-[#00FFFF]">{activeCrypto}</span></div>

            <div className="h-4 w-px bg-[#00FFFF] opacity-30" />
            <div>Total Trading Pairs: <span className="text-[#00FFFF]">{totalTradingPairs}</span></div>

            <div className="h-4 w-px bg-[#00FFFF] opacity-30" />
            <span>Total Market Cap: <span className="text-[#00FFFF]">{formatLargeNumber(marketCap)}</span></span>

            <div className="h-4 w-px bg-[#00FFFF] opacity-30" />
            <span>BTC Market Cap Change 24h:&nbsp;
                <span className={`ml-1 ${btcMCchange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {btcMCchange > 0 ? '↑' : '↓'}
                    {Math.abs(btcMCchange).toFixed(2)}%
                </span>
            </span>

            <div className="h-4 w-px bg-[#00FFFF] opacity-30" />
            <div>Total MC Change 24h:&nbsp;
                <span className={`ml-1 ${totalMCchange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {totalMCchange > 0 ? '↑' : '↓'}
                    {Math.abs(totalMCchange).toFixed(2)}%
                </span>
            </div>

            <div className="h-8 w-px bg-[#00FFFF] opacity-30" />
            <div className='flex items-center gap-1'>
                <span>Market Share:</span>
                <div className='flex items-center'>
                    <span className='text-orange-400'>BTC: </span>
                    <span className='text-[#f4f4f4]'>{formatLargeNumber(btcDominance)}%</span>
                    <span className='text-[#00FFFF] mx-5'>/</span>

                    <span className='text-blue-500'>ETH: </span>
                    <span className='text-[#f4f4f4]'>{formatLargeNumber(ethDominance)}%</span>
                    <span className='text-[#00FFFF] mx-5'>/</span>

                    <span className='text-purple-500'>SOL: </span>
                    <span className='text-[#f4f4f4]'>{formatLargeNumber(solDominance)}%</span>
                </div>
            </div>

        </div>
    );

    return (
        <div className="relative mb-7 rounded-xl">
            <div className={styles.ticker}>
                <div className={styles.tickerContent}>
                    {/* First copy */}
                    <StatsContent />
                    {/* Second copy */}
                    <StatsContent />
                </div>
            </div>
        </div>
    );
};

export default Overallstats;