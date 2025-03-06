'use client'

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';
import Sparkline from './Sparkline/Sparkline';
import useTableCoins from '@/hooks/useTableCoins';
import Link from 'next/link';


const CryptoTable = () => {
    const { data: tableCoins } = useTableCoins()

    const formatNumberFractions = (marketCap: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'standard',
            maximumFractionDigits: 0
        }).format(marketCap);
    };

    const formatPrice = (marketCap: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'standard',
            maximumFractionDigits: 2
        }).format(marketCap);
    };

    const formatPercentage = (percentage: number): string => {
        return Math.abs(percentage).toFixed(2);
    };

    const coins = Array.isArray(tableCoins) ? tableCoins : [];

    const tableHeaders = [
        { id: 'index', label: '#', width: '60px', align: 'left' },
        { id: 'name', label: 'Name', width: '230px', align: 'left' },
        { id: '1h', label: '1h %', width: '110px', align: 'right' },
        { id: '24h', label: '24h %', width: '123px', align: 'right' },
        { id: '7d', label: '7d %', width: '123px', align: 'right' },
        { id: 'marketCap', label: 'Market Cap', width: '220px', align: 'right', noPadding: true },
        { id: 'volume', label: 'Volume(24h)', width: '200px', align: 'right' },
        { id: 'price', label: 'Price', width: '120px', align: 'right' },
        { id: 'chart', label: 'Chart(7d)', width: '220px', align: 'right' },
    ];

    return (
        <section className="px-2 pt-1">
            <table className="w-full">
                <thead className='text-xs'>
                    <tr className="flex w-full border-b border-gray-700 text-gray-400 pb-2">
                        {tableHeaders.map((header) => (
                            <th
                                key={header.id}
                                className={`
                                    ${!header.noPadding ? 'px-4' : ''} 
                                    flex items-center 
                                    ${header.align === 'right' ? 'justify-end text-right' : 'justify-start text-left'}
                                    min-w-[${header.width}]
                                `}
                            >
                                {header.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin: any, index: number) => {
                        const sparklineData = coin.sparkline_in_7d?.price;
                        const sparklineColor = sparklineData && sparklineData.length > 1
                            ? sparklineData[sparklineData.length - 1] > sparklineData[0]
                                ? '#009F6B'
                                : '#D20A2E'
                            : 'gray';

                        return (
                            <tr
                                key={coin.id}
                                className="border-b border-gray-700 hover:bg-[#1a2842] transition-colors duration-200"
                            >
                                <td colSpan={9} className="">
                                    <Link
                                        href={`/cryptodetail/${coin.id.toLowerCase()}`}
                                        className="flex w-full"
                                    >
                                        <div className="flex w-full gap-6 h-16">
                                            {/* Index */}
                                            <div className="px-4 text-sm text-gray-300 flex items-center min-w-[50px]">
                                                {index + 1}
                                            </div>

                                            {/* Name and Image */}
                                            <div className="flex items-center w-[200px]">
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src={coin.image}
                                                        alt={coin.name}
                                                        width={24}
                                                        height={24}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-200">{coin.name}</span>
                                                        <span className="text-xs text-gray-400 uppercase">{coin.symbol}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 1h Volume */}
                                            <div className="px-4 text-right text-sm flex items-center justify-end w-[100px]">
                                                <div className="flex items-center justify-end gap-1">
                                                    {coin.price_change_percentage_24h > 0 ? (
                                                        <>
                                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                                            <span className="text-green-500">
                                                                {formatPercentage(coin.price_change_percentage_1h_in_currency)}%
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TrendingDown className="w-4 h-4 text-red-500" />
                                                            <span className="text-red-500">
                                                                {formatPercentage(coin.price_change_percentage_1h_in_currency)}%
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 24h Volume */}
                                            <div className="px-4 text-right text-sm flex items-center justify-end w-[100px]">
                                                <div className="flex items-center justify-end gap-1">
                                                    {coin.price_change_percentage_24h > 0 ? (
                                                        <>
                                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                                            <span className="text-green-500">
                                                                {formatPercentage(coin.price_change_percentage_24h)}%
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TrendingDown className="w-4 h-4 text-red-500" />
                                                            <span className="text-red-500">
                                                                {formatPercentage(coin.price_change_percentage_24h)}%
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 7d Volume */}
                                            <div className="px-4 text-right text-sm flex items-center justify-end w-[100px]">
                                                <div className="flex items-center justify-end gap-1">
                                                    {coin.price_change_percentage_7d_in_currency > 0 ? (
                                                        <>
                                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                                            <span className="text-green-500">
                                                                {formatPercentage(coin.price_change_percentage_7d_in_currency)}%
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TrendingDown className="w-4 h-4 text-red-500" />
                                                            <span className="text-red-500">
                                                                {formatPercentage(coin.price_change_percentage_7d_in_currency)}%
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Market Cap */}
                                            <div className="text-right text-sm text-gray-200 flex justify-end items-center w-[200px]">
                                                {formatNumberFractions(coin.market_cap)}
                                            </div>

                                            {/* Volume 24h */}
                                            <div className="px-4 text-right text-sm text-gray-200 flex items-center justify-end min-w-[170px]">
                                                {formatNumberFractions(coin.total_volume)}
                                            </div>

                                            {/* Current Price */}
                                            <div className="px-4 text-right text-sm text-gray-200 flex items-center justify-end w-[100px]">
                                                {formatPrice(coin.current_price)}
                                            </div>

                                            {/* Sparkline */}
                                            <div className=" flex justify-end items-center min-w-[210px]">
                                                {sparklineData ? (
                                                    <Sparkline data={sparklineData} color={sparklineColor} />
                                                ) : (
                                                    'No Data'
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
};

export default CryptoTable;
