'use client';
import React from 'react';

interface PriceChange {
  percentChange: number;
  absoluteChange: number;
  startPrice: number;
  endPrice: number;
  highPrice: number;
  lowPrice: number;
  highTimestamp: number;
  lowTimestamp: number;
}

interface PriceStatisticsProps {
  priceChange?: PriceChange;
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
  const isDataAvailable = Boolean(priceChange);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const isPositiveChange = isDataAvailable && priceChange!.percentChange >= 0;
  const textColorClass = isPositiveChange ? 'text-green-500' : 'text-red-500';

  const renderStatItem = (label: string, value: string | number | null, colorClass?: string) => (
    <div className="flex justify-between pb-3 border-b border-gray-700">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-xs ${colorClass || ''}`}>
        {value ?? 'N/A'}
      </span>
    </div>
  );

  return (
    <div className="w-full h-full p-4">
      <h3 className="text-xs font-semibold text-gray-100 mb-3">
        Detailed Price Statistics (<span className="text-[9px]">{timeframe}</span>)
      </h3>
      <div className="flex flex-col space-y-3">
        {renderStatItem(
          'Price Change:',
          isDataAvailable ? `(${priceChange!.percentChange.toFixed(2)}%)` : null,
          isDataAvailable ? textColorClass : undefined
        )}

        {renderStatItem(
          'Starting Price:',
          isDataAvailable ? formatPrice(priceChange!.startPrice) : null
        )}

        {renderStatItem(
          'Current Price:',
          isDataAvailable ? formatPrice(priceChange!.endPrice) : null
        )}

        {renderStatItem(
          'Highest Price:',
          isDataAvailable ? formatPrice(priceChange!.highPrice) : null,
          isDataAvailable ? 'text-green-500' : undefined
        )}

        {renderStatItem(
          'Lowest Price:',
          isDataAvailable ? formatPrice(priceChange!.lowPrice) : null,
          isDataAvailable ? 'text-red-500' : undefined
        )}

        {renderStatItem(
          'Lowest on:',
          isDataAvailable ? formatDate(priceChange!.lowTimestamp) : null
        )}

        {/* Last item doesn't need a bottom border */}
        <div className="flex justify-between pb-3">
          <span className="text-xs text-gray-400">Highest on:</span>
          <span className="text-xs">
            {isDataAvailable ? formatDate(priceChange!.highTimestamp) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceStatistics;