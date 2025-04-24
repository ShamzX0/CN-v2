import formatLargeNumber from '@/helpers/numberHelper';
import React from 'react';
import ethImg from '../../../../public/images/ethImg.png'
import btcImg from '../../../../public/images/BitcoinImg.jpeg'
import xrpImg from '../../../../public/images/xrpImg.png'
import bnbImg from '../../../../public/images/bnbImg.png'
import solImg from '../../../../public/images/solImg.png'
import totalImg from '../../../../public/images/totalImg.png'
import Image from 'next/image';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Activity, ChartCandlestick, HandCoins } from 'lucide-react';
import { BiCandles } from 'react-icons/bi';

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
    const bnbDominance = globalData?.market_cap_percentage?.bnb;
    const xrpDominance = globalData?.market_cap_percentage?.xrp;

    const StatsContent = () => (
        <div className="flex items-center gap-6 text-[8px] text-gray-300 py-2 px-4 whitespace-nowrap">
            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />
            <div className=' flex items-center space-x-1 mr-3'>
                <Activity size={14} />
                <span>Active Projects: </span>
                <span className="text-cyan-400">{activeCrypto}</span>
            </div>

            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div className=' flex items-center space-x-1 mr-3'>
                <BiCandles size={16} />
                <span>Trading Pairs: </span>
                <span className="text-cyan-400">{totalTradingPairs}</span>
            </div>

            <div className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div className=' flex items-center space-x-1 mr-3'>
                <Image width={17} height={17} src={totalImg} alt="total" />
                <span>Total Market Cap:</span>
                <span className="text-cyan-400">{formatLargeNumber(marketCap)}</span>
            </div>


            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div className=' flex items-center space-x-1 mr-3'>
                <Image width={17} height={17} src={totalImg} alt="total" />
                <span>Total MC Change 24h:&nbsp;</span>
                <span className={`ml-1 ${totalMCchange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {totalMCchange > 0 ? '↑' : '↓'}
                    {Math.abs(totalMCchange).toFixed(2)}%
                </span>
            </div>

            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div className=' flex items-center space-x-1 mr-3'>
                <Image width={15} height={15} src={btcImg} alt="btc" />
                <span> MC Change 24h:&nbsp;</span>
                <span className={`ml-1 ${btcMCchange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {btcMCchange > 0 ? '↑' : '↓'}
                    {Math.abs(btcMCchange).toFixed(2)}%
                </span>
            </div>

            <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />

            <div className="flex items-center gap-5">
                <span>Market Share:</span>
                <div className="flex items-center">

                    <div className="text-orange-400 flex items-center space-x-1 mr-3">
                        <Image width={15} height={15} src={btcImg} alt="btc" />
                        <span className="text-gray-100"> {formatLargeNumber(btcDominance)}%</span>
                    </div>

                    <span className="text-cyan-400 mx-3"><MdKeyboardArrowRight size={15} /></span>

                    <div className="text-blue-500 flex items-center space-x-1 mr-3">
                        <Image width={15} height={15} src={ethImg} alt="eth" />
                        <span className="text-gray-100"> {formatLargeNumber(ethDominance)}%</span>
                    </div>

                    <div className="text-cyan-400 mx-3"><MdKeyboardArrowRight size={15} /></div>

                    <div className="text-blue-500 flex items-center space-x-1 mr-3">
                        <Image width={15} height={15} src={xrpImg} alt="xrp" />
                        <span className="text-gray-100"> {formatLargeNumber(xrpDominance)}%</span>
                    </div>

                    <div className="text-cyan-400 mx-3"><MdKeyboardArrowRight size={15} /></div>

                    <div className="text-blue-500 flex items-center space-x-1 mr-3">
                        <Image width={15} height={15} src={bnbImg} alt="bnb" />
                        <span className="text-gray-100"> {formatLargeNumber(bnbDominance)}%</span>
                    </div>
                    <span className="text-cyan-400 mx-3"><MdKeyboardArrowRight size={15} /></span>

                    <div className="text-purple-500 flex items-center space-x-1 mr-3">
                        <Image width={15} height={15} src={solImg} alt="sol" />
                        <span className="text-gray-100"> {formatLargeNumber(solDominance)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="relative mb-5 max-w-[1500px]">
            <div className="w-full overflow-x-hidden relative bg-[#13233f] before:content-[''] before:absolute before:top-0 before:left-0 before:w-36 before:h-full before:z-10 before:pointer-events-none before:bg-gradient-to-r before:from-[#101221] before:to-transparent after:content-[''] after:absolute after:top-0 after:right-0 after:w-36 after:h-full after:z-10 after:pointer-events-none after:bg-gradient-to-l after:from-[#101221] after:to-transparent">
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