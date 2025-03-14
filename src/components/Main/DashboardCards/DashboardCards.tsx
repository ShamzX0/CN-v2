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
        <div className='flex flex-row w-full h-[300px] p-2 overflow-hidden'>
            {/* Left half */}
            <section className='flex w-1/2 gap-4 mr-2 h-[280px]'>
                <div className='w-2/3'>
                    <TrendingNFTs trendingNfts={trendingData.nfts} />
                </div>
                <div className="flex flex-col w-1/3 gap-4 h-[280px]">
                    <InfoChartCard
                        amount={marketCap}
                        changePercent={marketCapChangePercent}
                    />
                    <InfoChartCard
                        amount={volume}
                        changePercent={volumeChangePercent}
                    />
                </div>
            </section>
            {/* Right half */}
            <section className='flex w-1/2 gap-4 h-[280px]'>
                <div className='w-4/5'>
                    <TrendingCoins trendingCoins={trendingData.coins} />
                </div>
                <div className="flex flex-col w-1/5 gap-4 h-[280px]">
                    <div className="w-full h-full">
                        <FearGreedIndex />
                    </div>
                    <div className="w-full h-full">
                        <DominanceCard globalData={globalData} />
                    </div>
                </div>
            </section>
        </div>
    )
}


export default DashboardCards
