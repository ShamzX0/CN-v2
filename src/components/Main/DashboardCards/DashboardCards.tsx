import React from 'react'
import TrendingNFTs from './Card/TrendingNfts'
import TrendingCoins from './Card/TrendingCoins'
import FearGreedIndex from './Card/FearGreedIndex'
import DominanceCard from './Card/DominanceCard'
import useTrendingData from '@/hooks/useTrendingData'
import InfoChartCard from './Card/InfoChartCard'

interface Props {
    globalData: GlobalData
}

const DashboardCards = (props: Props) => {
    const { globalData } = props
    const { data: trendingData, isLoading } = useTrendingData()

    const marketCap = globalData?.total_market_cap?.usd || 0;
    const volume = globalData?.total_volume?.usd || 0;
    const marketCapChangePercent = globalData?.market_cap_change_percentage_24h_usd || 0;
    const volumeChangePercent = ((volume - (volume / (1 + marketCapChangePercent / 100))) / (volume / (1 + marketCapChangePercent / 100))) * 100 || 0;

    return (
        <section className='flex gap-4 w-full h-[340px] py-4'>
            {/* Left half */}
            <div className='flex gap-4 w-1/2 h-full'>
                <div className='w-2/3'>
                    <TrendingNFTs trendingNfts={trendingData.nfts} isLoading={isLoading} />
                </div>
                <div className='flex flex-col gap-4 w-1/3'>
                    <InfoChartCard
                        amount={marketCap}
                        changePercent={marketCapChangePercent}
                        title="Market Cap 24h"
                    />
                    <InfoChartCard
                        amount={volume}
                        changePercent={volumeChangePercent}
                        title="Volume 24h"
                    />
                </div>
            </div>

            {/* Right half */}
            <div className='flex gap-4 w-1/2 h-full'>
                <div className='w-4/5'>
                    <TrendingCoins trendingCoins={trendingData.coins} isLoading={isLoading} />
                </div>
                <div className='flex flex-col gap-4 w-1/5'>
                    <FearGreedIndex />
                    <DominanceCard globalData={globalData} />
                </div>
            </div>
        </section>
    )
}

export default DashboardCards