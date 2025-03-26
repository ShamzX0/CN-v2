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

  return (
    <div className="bg-slate-800 rounded-xl p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3">Price Statistics ({timeframe})</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Price Change:</span>
            <span className={isPositiveChange ? 'text-green-500' : 'text-red-500'}>
              {formatPrice(priceChange.absoluteChange)}
              &nbsp;
              ({priceChange.percentChange.toFixed(2)}%)
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Starting Price:</span>
            <span>{formatPrice(priceChange.startPrice)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Current Price:</span>
            <span>{formatPrice(priceChange.endPrice)}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Highest Price:</span>
            <span className="text-green-500">{formatPrice(priceChange.highPrice)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Highest on:</span>
            <span>{formatDate(priceChange.highTimestamp)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Lowest Price:</span>
            <span className="text-red-500">{formatPrice(priceChange.lowPrice)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Lowest on:</span>
            <span>{formatDate(priceChange.lowTimestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceStatistics;