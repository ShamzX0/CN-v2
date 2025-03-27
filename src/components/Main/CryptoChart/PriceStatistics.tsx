'use client';
import React from 'react';

interface PriceStatisticsProps {
  priceChange: {
    percentChange: number;
    absoluteChange: number;
    startPrice: number;
    endPrice: number;
    highPrice: number;
    lowPrice: number;
    highTimestamp: number;
    lowTimestamp: number;
  };
  timeframe: string;
  currency?: string;
  chartType?: 'price' | 'marketCap';
}

const PriceStatistics: React.FC<PriceStatisticsProps> = ({
  priceChange,
  timeframe,
  currency = 'USD',
  chartType = 'price'
}) => {
  if (!priceChange) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const isPositiveChange = priceChange.percentChange >= 0;

  // PriceStatistics component
  return (
    <div className="w-full h-full p-4">
      <h3 className="text-xs font-semibold text-gray-100 mb-3">
        Detailed Price Statistics (<span className="text-[9px]">{timeframe}</span>)
      </h3>
      <div className="flex flex-col space-y-3">

        <div className="flex justify-between pb-3 border-b-[1px]  border-gray-700">
          <span className="text-xs text-gray-400">Price Change:</span>
          <span className={`text-xs ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
            &nbsp;
            ({priceChange.percentChange.toFixed(2)}%)
          </span>
        </div>


        <div className="flex justify-between pb-3 border-b-[1px]  border-gray-700">
          <span className="text-xs text-gray-400">Starting Price:</span>
          <span className="text-xs">{formatPrice(priceChange.startPrice)}</span>
        </div>


        <div className="flex justify-between pb-3 border-b-[1px]  border-gray-700">
          <span className="text-xs text-gray-400">Current Price:</span>
          <span className="text-xs">{formatPrice(priceChange.endPrice)}</span>
        </div>


        <div className="flex justify-between pb-3 border-b-[1px]  border-gray-700">
          <span className="text-xs text-gray-400">Highest Price:</span>
          <span className="text-xs text-green-500">{formatPrice(priceChange.highPrice)}</span>
        </div>


        <div className="flex justify-between pb-3 border-b-[1px]  border-gray-700">
          <span className="text-xs text-gray-400">Lowest Price:</span>
          <span className="text-xs text-red-500">{formatPrice(priceChange.lowPrice)}</span>
        </div>


        <div className="flex justify-between pb-3 border-b-[1px]  border-gray-700">
          <span className="text-xs text-gray-400">Lowest on:</span>
          <span className="text-xs">{formatDate(priceChange.lowTimestamp)}</span>
        </div>

        <div className="flex justify-between pb-3">
          <span className="text-xs text-gray-400">Highest on:</span>
          <span className="text-xs">{formatDate(priceChange.highTimestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceStatistics;