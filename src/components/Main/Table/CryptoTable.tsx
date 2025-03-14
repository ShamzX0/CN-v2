'use client'

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Sparkline from './Sparkline/Sparkline';
import useTableCoins from '@/hooks/useTableCoins';
import './CryptoTable.css';

const CryptoTable = () => {
    const { data: tableCoins } = useTableCoins();

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

    const columns: ColumnsType<any> = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 60,
            render: (_: any, __: any, index: number) => (
                <div className="text-sm text-gray-300">{index + 1}</div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 230,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Image
                        src={record.image}
                        alt={record.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-200">{record.name}</span>
                        <span className="text-xs text-gray-400 uppercase">{record.symbol}</span>
                    </div>
                </div>
            ),
        },
        {
            title: '1h %',
            dataIndex: 'price_change_percentage_1h_in_currency',
            key: '1h',
            width: 110,
            align: 'right',
            render: (value) => (
                <div className="flex items-center justify-end gap-1">
                    {value > 0 ? (
                        <>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">{formatPercentage(value)}%</span>
                        </>
                    ) : (
                        <>
                            <TrendingDown className="w-4 h-4 text-red-500" />
                            <span className="text-red-500">{formatPercentage(value)}%</span>
                        </>
                    )}
                </div>
            ),
        },
        {
            title: '24h %',
            dataIndex: 'price_change_percentage_24h',
            key: '24h',
            width: 123,
            align: 'right',
            render: (value) => (
                <div className="flex items-center justify-end gap-1">
                    {value > 0 ? (
                        <>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">{formatPercentage(value)}%</span>
                        </>
                    ) : (
                        <>
                            <TrendingDown className="w-4 h-4 text-red-500" />
                            <span className="text-red-500">{formatPercentage(value)}%</span>
                        </>
                    )}
                </div>
            ),
        },
        {
            title: '7d %',
            dataIndex: 'price_change_percentage_7d_in_currency',
            key: '7d',
            width: 123,
            align: 'right',
            render: (value) => (
                <div className="flex items-center justify-end gap-1">
                    {value > 0 ? (
                        <>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">{formatPercentage(value)}%</span>
                        </>
                    ) : (
                        <>
                            <TrendingDown className="w-4 h-4 text-red-500" />
                            <span className="text-red-500">{formatPercentage(value)}%</span>
                        </>
                    )}
                </div>
            ),
        },
        {
            title: 'Market Cap',
            dataIndex: 'market_cap',
            key: 'marketCap',
            width: 220,
            align: 'right',
            render: (value) => <div className="text-sm text-gray-200">{formatNumberFractions(value)}</div>,
        },
        {
            title: 'Volume(24h)',
            dataIndex: 'total_volume',
            key: 'volume',
            width: 200,
            align: 'right',
            render: (value) => <div className="text-sm text-gray-200">{formatNumberFractions(value)}</div>,
        },
        {
            title: 'Price',
            dataIndex: 'current_price',
            key: 'price',
            width: 120,
            align: 'right',
            render: (value) => <div className="text-sm text-gray-200">{formatPrice(value)}</div>,
        },
        {
            title: 'Chart(7d)',
            key: 'chart',
            width: 220,
            align: 'right',
            render: (_, record) => {
                const sparklineData = record.sparkline_in_7d?.price;
                const sparklineColor = sparklineData && sparklineData.length > 1
                    ? sparklineData[sparklineData.length - 1] > sparklineData[0]
                        ? '#009F6B'
                        : '#D20A2E'
                    : 'gray';

                return sparklineData ? (
                    <Sparkline data={sparklineData} color={sparklineColor} />
                ) : (
                    'No Data'
                );
            },
        },
    ];

    return (
        <section className="pt-1 pb-9">
            <Table
                columns={columns}
                dataSource={coins}
                pagination={false}
                rowKey="id"
                className="crypto-table"
                onRow={(record) => ({
                    onClick: () => window.location.href = `/cryptodetail/${record.id.toLowerCase()}`,
                    className: 'cursor-pointer hover:bg-[#1a2842] transition-colors duration-200',
                })}
            />
        </section>
    );
};

export default CryptoTable;