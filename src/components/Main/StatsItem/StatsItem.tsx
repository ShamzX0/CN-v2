'use client';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Tooltip from '../ToolTip/ToolTip';

// Types for stats data
export type StatItemProps = {
    label: string;
    value: string | number;
    isPercentage?: boolean;
    percentageValue?: number;
    tooltipText: string;
};

// Tooltips for stats data
export const tooltips = {
    marketCap: "The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.\n\nMarket cap = Current price x Circulating supply.",
    fdv: "The market cap if the max supply was in circulation.\n\nFully-diluted value (FDV) = price × max supply.\n\nIf max supply is null, FDV = price × total supply.\n\nIf max supply and total supply are infinite or not available, fully-diluted market cap shows - -.",
    totalSupply: "The amount of coins that have been created, minus any coins that have been burned (removed from circulation).\n\nIt is comparable to outstanding shares in the stock market.",
    maxSupply: "The maximum amount of coins that will ever exist in the lifetime of the cryptocurrency.\n\nNot all cryptocurrencies have a maximum supply.",
    tradingVolume: "A measure of how much of a cryptocurrency was traded in the last 24 hours.\n\nHigher trading volumes indicate more market activity and liquidity.",
    ath: "The highest price point in history of the cryptocurrency in USD.\n\nUseful for understanding a coin's previous peak performance.",
    athChange: "Percentage change from the all-time high price to the current price.\n\nShows how far the current price is from the historical maximum.",
    priceChange1y: "Percentage change in price compared to 1 year ago.\n\nIndicates long-term performance trends.",
    priceChange30d: "Percentage change in price compared to 30 days ago.\n\nShows medium-term price momentum.",
    priceChange24h: "Percentage change in price compared to 24 hours ago.\n\nReflects short-term market sentiment and volatility.",
};

// Utility formatting functions
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    }).format(price);
};

export const formatLargeNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2
    }).format(num);
};

export const formatCryptoAmount = (amount: number, symbol: string): string => {
    return `${new Intl.NumberFormat('en-US').format(amount)} ${symbol?.toUpperCase()}`;
};

// Function to create first row stats array
export const getFirstRowStats = (coinData: any) => [
    { label: 'Market Cap', value: formatLargeNumber(coinData?.market_cap), tooltipText: tooltips.marketCap },
    {
        label: 'FDV',
        value: coinData?.fully_diluted_valuation ? formatLargeNumber(coinData.fully_diluted_valuation) : 'N/A',
        tooltipText: tooltips.fdv
    },
    {
        label: 'Total Supply',
        value: coinData?.total_supply ? formatCryptoAmount(coinData.total_supply, coinData?.symbol) : 'N/A',
        tooltipText: tooltips.totalSupply
    },
    {
        label: 'Max Supply',
        value: coinData?.max_supply ? formatCryptoAmount(coinData.max_supply, coinData?.symbol) : 'N/A',
        tooltipText: tooltips.maxSupply
    },
    {
        label: '24h Trading Volume',
        value: formatLargeNumber(coinData?.total_volume),
        tooltipText: tooltips.tradingVolume
    }
];

// Function to create second row stats array
export const getSecondRowStats = (coinData: any) => [
    { label: 'All time high', value: formatPrice(coinData?.ath), tooltipText: tooltips.ath },
    {
        label: 'ATH Change %',
        value: '',
        isPercentage: true,
        percentageValue: coinData?.ath_change_percentage,
        tooltipText: tooltips.athChange
    },
    {
        label: 'Price Change 1Y',
        value: '',
        isPercentage: true,
        percentageValue: coinData?.price_change_percentage_1y,
        tooltipText: tooltips.priceChange1y
    },
    {
        label: 'Price Change 30d',
        value: '',
        isPercentage: true,
        percentageValue: coinData?.price_change_percentage_30d,
        tooltipText: tooltips.priceChange30d
    },
    {
        label: 'Price Change 24h',
        value: '',
        isPercentage: true,
        percentageValue: coinData?.price_change_percentage_24h,
        tooltipText: tooltips.priceChange24h
    }
];

// StatItem component
const StatItem = ({ label, value, isPercentage, percentageValue, tooltipText }: StatItemProps) => (
    <div className="flex-1 flex flex-col justify-center items-center w-[130px] space-y-2 p-4 rounded-xl border border-gray-600">
        <div className="flex items-center gap-1">
            <h3 className={`text-gray-400 ${label.length > 17 ? 'text-[12px]' : 'text-sm'}`}>{label}</h3>
            <Tooltip tooltipText={tooltipText} />
        </div>
        {isPercentage ? (
            <div className={`inline-flex items-center ${percentageValue && percentageValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {percentageValue && percentageValue >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                <span className="text-md font-semibold">{percentageValue ? Math.abs(percentageValue).toFixed(2) : 0}%</span>
            </div>
        ) : (
            <p className="text-sm font-semibold mt-1">{value}</p>
        )}
    </div>
);

export default StatItem;