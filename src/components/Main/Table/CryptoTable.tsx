'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Sparkline from './Sparkline/Sparkline';
import useTableCoins from '@/hooks/useTableCoins';
import './CryptoTable.css';

// Move formatting functions outside component
const formatters = {
    numberFractions: (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'standard',
            maximumFractionDigits: 0
        }).format(value);
    },

    price: (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'standard',
            maximumFractionDigits: 2
        }).format(value);
    },

    percentage: (value: number): string => {
        return Math.abs(value).toFixed(2);
    }
};

// Reusable UI components
const TrendIndicator = ({ value }: { value: number }) => (
    <div className="flex items-center justify-end gap-1">
        {value > 0 ? (
            <>
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">{formatters.percentage(value)}%</span>
            </>
        ) : (
            <>
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-red-500">{formatters.percentage(value)}%</span>
            </>
        )}
    </div>
);

// Constants for fetch configuration
const ITEMS_PER_PAGE = 20;
const FETCH_DELAY_MS = 4000; // 4 seconds delay between fetches

const CryptoTable = () => {
    const { data: initialCoins, fetchMoreCoins } = useTableCoins();
    const [coins, setCoins] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Add a throttling mechanism with useRef
    const canFetchRef = useRef(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Set initial coins when they are loaded
    useEffect(() => {
        if (initialCoins && initialCoins.length > 0) {
            setCoins(initialCoins);
            setPage(2); // Next fetch will be page 2
        }
    }, [initialCoins]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const loadMoreCoins = async () => {
        // Check if we are already loading or if we've reached the end
        if (loading || !hasMore) return;

        // Add throttling check
        if (!canFetchRef.current) {
            console.log('Throttling in effect, skipping fetch');
            return;
        }

        // Set loading state and disable further fetches
        setLoading(true);
        canFetchRef.current = false;

        try {
            console.log(`Fetching page ${page} with ${ITEMS_PER_PAGE} items per page`);
            const newCoins = await fetchMoreCoins(page, ITEMS_PER_PAGE);

            if (!newCoins || newCoins.length === 0) {
                setHasMore(false);
            } else {
                setCoins((prevCoins) => [...prevCoins, ...newCoins]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error('Error fetching additional coin data:', error);
        } finally {
            setLoading(false);

            // Set up a timeout to re-enable fetching after delay
            timeoutRef.current = setTimeout(() => {
                canFetchRef.current = true;
                // If the user is still at the bottom, trigger another fetch
                // This helps with continuous scrolling even with throttling
                const scrollElement = document.scrollingElement || document.documentElement;
                const scrollPosition = scrollElement.scrollTop + window.innerHeight;
                const scrollThreshold = scrollElement.scrollHeight * 0.95; // 95% of scroll height

                if (scrollPosition >= scrollThreshold && hasMore && !loading) {
                    loadMoreCoins();
                }
            }, FETCH_DELAY_MS);
        }
    };

    // Manual fetch function
    const handleManualFetch = () => {
        if (!loading) {
            loadMoreCoins();
        }
    };

    // Custom loader component with improved messaging that's also clickable
    const loader = (
        <div
            className="flex flex-col items-center py-4 cursor-pointer"
            onClick={handleManualFetch}
            role="button"
            tabIndex={0}
            aria-label="Load more tokens"
        >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                {loading ? "Loading more tokens..." : "Click to load more tokens"}
            </p>
        </div>
    );

    // Move columns definition into useMemo to prevent recreating on each render
    const columns = useMemo<ColumnsType<any>>(() => [
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
            render: (value) => <TrendIndicator value={value} />,
        },
        {
            title: '24h %',
            dataIndex: 'price_change_percentage_24h',
            key: '24h',
            width: 123,
            align: 'right',
            render: (value) => <TrendIndicator value={value} />,
        },
        {
            title: '7d %',
            dataIndex: 'price_change_percentage_7d_in_currency',
            key: '7d',
            width: 123,
            align: 'right',
            render: (value) => <TrendIndicator value={value} />,
        },
        {
            title: 'Market Cap',
            dataIndex: 'market_cap',
            key: 'marketCap',
            width: 220,
            align: 'right',
            render: (value) => (
                <div className="text-sm text-gray-200">{formatters.numberFractions(value)}</div>
            ),
        },
        {
            title: 'Volume(24h)',
            dataIndex: 'total_volume',
            key: 'volume',
            width: 200,
            align: 'right',
            render: (value) => (
                <div className="text-sm text-gray-200">{formatters.numberFractions(value)}</div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'current_price',
            key: 'price',
            width: 120,
            align: 'right',
            render: (value) => (
                <div className="text-sm text-gray-200">{formatters.price(value)}</div>
            ),
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
    ], []);

    const handleRowClick = (record: any) => {
        window.location.href = `/cryptodetail/${record.id.toLowerCase()}`;
    };

    // Don't render until initial data is loaded
    if (!initialCoins || initialCoins.length === 0) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <section className="pt-1 pb-9">
            <InfiniteScroll
                dataLength={coins.length}
                next={loadMoreCoins}
                hasMore={hasMore}
                loader={loader}
                scrollThreshold={0.8} // Increase threshold to load earlier
            >
                <Table
                    columns={columns}
                    dataSource={coins}
                    pagination={false}
                    rowKey="id"
                    className="crypto-table"
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                        className: 'cursor-pointer hover:bg-[#1a2842] transition-colors duration-200',
                    })}
                />
            </InfiniteScroll>

            {/* Optional: Add a subtle API status indicator */}
            <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 rounded-lg text-gray-300 p-2 rounded text-xs z-50">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${canFetchRef.current && !loading
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                        }`}></div>
                    <span>
                        {loading
                            ? 'Fetching data...'
                            : canFetchRef.current
                                ? 'API Ready'
                                : `Throttling (${FETCH_DELAY_MS / 1000}s)`
                        }
                    </span>
                </div>
                <div className='flex w-full justify-end items-center gap-1 mt-3'>
                    <p className='font-unbounded tracking-[0.18rem] opacity-50 text-[8px]'>POWERED BY</p>
                    <Image src="/images/Coingecko_transparent.png" alt="Coingecko logo" width={90} height={100} className='opacity-80' />
                </div>
            </div>
        </section>
    );
};

export default CryptoTable;