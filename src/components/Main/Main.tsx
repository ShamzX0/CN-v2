'use client'
import DashboardCards from './DashboardCards/DashboardCards';
import CryptoTable from './Table/CryptoTable';
import RunningTab from './RunningTab/RunningTab';
import Intro from './Intro/Intro';
import useBitcoin from '@/hooks/useBitcoin';
import useGlobalData from '@/hooks/useGlobalData';
import Banner from "@/components/Main/Banner/Banner"

const Main = () => {
    // SWR FETCHING HOOK
    const { data: bitcoinData } = useBitcoin()
    const { data: globalData } = useGlobalData()

    return (
        <>
            <RunningTab btcData={bitcoinData} globalData={globalData} />
            <Intro />
            <Banner />
            <DashboardCards globalData={globalData} />
            <hr className='border-[0.4px] opacity-20 my-2' />
            <CryptoTable />
        </>
    )
};

export default Main;