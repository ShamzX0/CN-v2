import React from 'react'
import TrendingNFTs from './TrendingNfts'
import MarketCapCard from './MarketCapCard'
import VolumeCard from './VolumeCard'
import TrendingCoins from './TrendingCoins'
import FearGreedIndex from './FearGreedIndex'
import DominanceCard from './DominanceCard'

interface Props {
    data: any
}

const DashboardCards = (props: Props) => {

    const { data } = props

    const marketCap = data?.globalData?.data?.total_market_cap?.usd || 0;
    const volume = data?.globalData?.data?.total_volume?.usd || 0;
    const marketCapChangePercent = data?.globalData?.data?.market_cap_change_percentage_24h_usd || 0;
    const volumeChangePercent = ((volume - (volume / (1 + marketCapChangePercent / 100))) / (volume / (1 + marketCapChangePercent / 100))) * 100 || 0;

    return (
        <div className='flex flex-row w-full gap-5'>
            {/* 1. half of the dashboard */}
            <div className='flex w-1/2 gap-4'>
                <div className='w-2/3'>

                    <TrendingNFTs data={data} />
                </div>

                <div className="flex flex-col w-1/3  gap-4">
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
            {/* 2. second half of the dashboard */}
            <div className='flex w-1/2 gap-4'>
                <div className='w-2/3'>
                    <TrendingCoins data={data} />
                </div>

                <div className="flex flex-col w-1/3 gap-4">
                    <FearGreedIndex />
                    <DominanceCard data={data} />
                </div>
            </div>

        </div>
    )
}

export default DashboardCards
