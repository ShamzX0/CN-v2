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
    const { data: trendingData } = useTrendingData()

    const marketCap = globalData?.total_market_cap?.usd || 0;
    const volume = globalData?.total_volume?.usd || 0;
    const marketCapChangePercent = globalData?.market_cap_change_percentage_24h_usd || 0;
    const volumeChangePercent = ((volume - (volume / (1 + marketCapChangePercent / 100))) / (volume / (1 + marketCapChangePercent / 100))) * 100 || 0;

    return (
        <section className='flex gap-4 w-full py-4'>
            {/* Left half */}
            <div className='flex gap-4 w-1/2'>
                <div className='w-2/3'>
                    <TrendingNFTs trendingNfts={trendingData.nfts} />
                </div>
                <div className='flex flex-col gap-4 w-1/3 h-full'>
                    <InfoChartCard
                        amount={marketCap}
                        changePercent={marketCapChangePercent}
                    />
                    <InfoChartCard
                        amount={volume}
                        changePercent={volumeChangePercent}
                    />
                </div>
            </div>

            {/* Right half */}
            <div className='flex gap-4 w-1/2'>
                <div className='w-4/5'>
                    <TrendingCoins trendingCoins={trendingData.coins} />
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