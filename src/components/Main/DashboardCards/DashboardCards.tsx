import React from 'react'
import TrendingNFTs from './Card/TrendingNfts'
import MarketCapCard from './Card/MarketCapCard'
import VolumeCard from './Card/VolumeCard'
import TrendingCoins from './Card/TrendingCoins'
import FearGreedIndex from './Card/FearGreedIndex'
import DominanceCard from './Card/DominanceCard'
import useTrendingData from '@/hooks/useTrendingCoins'

interface Props {
    globalData: any
    isGlobalDataLoading: boolean
}

const DashboardCards = (props: Props) => {

    const { globalData, isGlobalDataLoading } = props
    const { data: trendingData, isLoading: isTrendingDataLoading } = useTrendingData()
    const marketCap = globalData?.total_market_cap?.usd || 0;
    const volume = globalData?.total_volume?.usd || 0;
    const marketCapChangePercent = globalData?.market_cap_change_percentage_24h_usd || 0;
    const volumeChangePercent = ((volume - (volume / (1 + marketCapChangePercent / 100))) / (volume / (1 + marketCapChangePercent / 100))) * 100 || 0;

    if (isGlobalDataLoading) return <div className='text-center w-full'>Loading..</div>;
    return (
        <div className='flex flex-row w-full h-[300px] p-2 overflow-hidden'>
            {/* Left half - this looks fine */}
            <div className='flex w-1/2 gap-4 mr-2 h-[280px]'>
                <div className='w-2/3'>
                    {isTrendingDataLoading ? (
                        <div>Loading data..</div>
                    ) : (

                        <TrendingNFTs trendingData={trendingData} />
                    )
                    }

                </div>
                <div className="flex flex-col w-1/3 gap-4 h-[280px]">
                    <MarketCapCard
                        marketCap={marketCap}
                        changePercent={marketCapChangePercent}
                    />
                    <VolumeCard
                        volume={volume}
                        changePercent={volumeChangePercent}
                    />
                </div>
            </div>
            <div className='flex w-1/2 gap-4 h-[280px]'>
                <div className='w-4/5'>
                    <TrendingCoins trendingData={trendingData} />
                </div>
                <div className="flex flex-col w-1/5 gap-4 h-[280px]">
                    <div className="w-full h-full">
                        <FearGreedIndex />
                    </div>
                    <div className="w-full h-full">
                        <DominanceCard globalData={globalData} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DashboardCards
