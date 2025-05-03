import React from 'react';
import Image from 'next/image';
import formatLargeNumber from '@/helpers/numberHelper';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Activity } from 'lucide-react';
import { BiCandles } from 'react-icons/bi';

// Import all images
import ethImg from '../../../../public/images/ethImg.png';
import btcImg from '../../../../public/images/BitcoinImg.jpeg';
import xrpImg from '../../../../public/images/xrpImg.png';
import bnbImg from '../../../../public/images/bnbImg.png';
import solImg from '../../../../public/images/solImg.png';
import totalImg from '../../../../public/images/totalImg.png';

// Component for divider
const Divider = () => (
    <hr className="h-4 w-px bg-[#f4f4f4] opacity-30" />
);

// Component for stat item
interface StatItemProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-1 mr-3">
        {icon}
        <span>{label}</span>
        {value}
    </div>
);

// Component for crypto market share
interface CryptoShareItemProps {
    image: any; // Using any to match the imported image type
    alt: string;
    percentage: number;
    showArrow?: boolean;
}

const CryptoShareItem: React.FC<CryptoShareItemProps> = ({ image, alt, percentage, showArrow = true }) => (
    <>
        <div className="flex items-center space-x-1 mr-3">
            <Image width={15} height={15} src={image} alt={alt} />
            <span className="text-gray-100"> {formatLargeNumber(percentage)}%</span>
        </div>
        {showArrow && (
            <span className="text-cyan-400 mx-3">
                <MdKeyboardArrowRight size={15} />
            </span>
        )}
    </>
);

interface Props {
    btcData: BitcoinPriceResponse;
    globalData: GlobalData;
}

const RunningTab: React.FC<Props> = ({ btcData, globalData }) => {
    // Extract all necessary data
    const btcMCchange = btcData?.bitcoin?.usd_24h_change;
    const marketCap = globalData?.total_market_cap?.usd;
    const activeCrypto = globalData?.active_cryptocurrencies;
    const totalTradingPairs = globalData?.markets;
    const totalMCchange = globalData?.market_cap_change_percentage_24h_usd;
    const { btc: btcDominance, eth: ethDominance, sol: solDominance, bnb: bnbDominance, xrp: xrpDominance } = globalData?.market_cap_percentage || {};

    // Price change indicator component with dynamic styling
    const PriceChange = ({ change }: { change: number }) => (
        <span className={`ml-1 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? '↑' : '↓'}
            {Math.abs(change).toFixed(2)}%
        </span>
    );

    const StatsContent = () => (
        <div className="flex items-center gap-6 text-[8px] text-gray-300 py-2 px-4 whitespace-nowrap pointer-events-none">
            <Divider />

            <StatItem
                icon={<Activity size={14} />}
                label="Active Projects: "
                value={<span className="text-cyan-400">{activeCrypto}</span>}
            />

            <Divider />

            <StatItem
                icon={<BiCandles size={16} />}
                label="Trading Pairs: "
                value={<span className="text-cyan-400">{totalTradingPairs}</span>}
            />

            <Divider />

            <StatItem
                icon={<Image width={17} height={17} src={totalImg} alt="total" />}
                label="Total Market Cap: "
                value={<span className="text-cyan-400">{formatLargeNumber(marketCap)}</span>}
            />

            <Divider />

            <StatItem
                icon={<Image width={17} height={17} src={totalImg} alt="total" />}
                label="Total MC Change 24h: "
                value={<PriceChange change={totalMCchange} />}
            />

            <Divider />

            <StatItem
                icon={<Image width={15} height={15} src={btcImg} alt="btc" />}
                label="MC Change 24h: "
                value={<PriceChange change={btcMCchange} />}
            />

            <Divider />

            <div className="flex items-center gap-5">
                <span>Market Share:</span>
                <div className="flex items-center">
                    <CryptoShareItem image={btcImg} alt="btc" percentage={btcDominance} />
                    <CryptoShareItem image={ethImg} alt="eth" percentage={ethDominance} />
                    <CryptoShareItem image={xrpImg} alt="xrp" percentage={xrpDominance} />
                    <CryptoShareItem image={bnbImg} alt="bnb" percentage={bnbDominance} />
                    <CryptoShareItem image={solImg} alt="sol" percentage={solDominance} showArrow={false} />
                </div>
            </div>
        </div>
    );

    return (
        <section className="relative mb-5 max-w-[1500px]">
            <div className="w-full overflow-x-hidden relative bg-[#13233f] before:content-[''] before:absolute before:top-0 before:left-0 before:w-36 before:h-full before:z-10 before:pointer-events-none before:bg-gradient-to-r before:from-[#101221] before:to-transparent after:content-[''] after:absolute after:top-0 after:right-0 after:w-36 after:h-full after:z-10 after:pointer-events-none after:bg-gradient-to-l after:from-[#101221] after:to-transparent">
                <div className="flex animate-[scroll_40s_linear_infinite]">
                    <StatsContent />
                    <StatsContent />
                </div>
            </div>
        </section>
    );
};

export default RunningTab;