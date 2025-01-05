'use client'
import { useEffect, useState, useCallback } from 'react';
import DashboardCards from './DashboardCards/DashboardCards';
import CryptoTable from './Table/CryptoTable';
import RunningTab from './RunningTab/RunningTab';
import Intro from './Intro/Intro';
import useBitcoin from '@/hooks/useBitcoin';
import useGlobalData from '@/hooks/useGlobalData';

const Main = () => {
    const [page, setPage] = useState<number>(1);

    // SWR FETCHING HOOK
    const { data: bitcoinData, isLoading: isBitcoinDataLoading } = useBitcoin()
    const { data: globalData, isLoading: isGlobalDataLoading } = useGlobalData()

    // Initial data fetch
    // useEffect(() => {
    //     const fetchInitialData = async () => {
    //         try {
    //             setIsLoading(true);
    //             const receivedData = await fetchCoinGeckoData(1);

    //             if (receivedData) {
    //                 setData(receivedData);
    //                 if (receivedData.tableData.length === 0) setAllTableData(dummyData)
    //                 setAllTableData(receivedData.tableData);
    //             } else {
    //                 setError('Failed to fetch data');
    //             }
    //         } catch (err) {
    //             setError(err instanceof Error ? err.message : 'An error occurred');
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchInitialData();
    // }, []);

    // Function to check if we're at the bottom
    // const isAtBottom = () => {
    //     if (typeof window === 'undefined') return false;

    //     const windowHeight = window.innerHeight;
    //     const documentHeight = document.documentElement.scrollHeight;
    //     const scrollTop = window.scrollY || document.documentElement.scrollTop;

    //     // Only return true if we're very close to the bottom (within 50px)
    //     return windowHeight + scrollTop >= documentHeight - 100;
    // };

    // Handle scroll event with built-in debouncing
    // const handleScroll = useCallback(async () => {
    //     if (!isAtBottom() || isLoadingMore) return;

    //     try {
    //         setIsLoadingMore(true);
    //         const nextPage = page + 1;
    //         const newData = await fetchCoinGeckoData(nextPage);

    //         if (newData && newData.tableData?.length > 0) {
    //             setAllTableData(prev => [...prev, ...newData.tableData]);
    //             setData(prevData => ({
    //                 ...prevData!,
    //                 tableData: [...allTableData, ...newData.tableData]
    //             }));
    //             setPage(nextPage);
    //         }
    //     } catch (err) {
    //         console.error('Error loading more:', err);
    //     } finally {
    //         setIsLoadingMore(false);
    //     }
    // }, [page, isLoadingMore, allTableData]);

    // Infinite Scroll
    // useEffect(() => {
    //     let scrollTimeout: NodeJS.Timeout;

    //     const onScroll = () => {
    //         if (scrollTimeout) {
    //             clearTimeout(scrollTimeout);
    //         }

    //         scrollTimeout = setTimeout(() => {
    //             handleScroll();
    //         }, 500); // Adjust this delay if needed
    //     };

    //     window.addEventListener('scroll', onScroll);

    //     return () => {
    //         window.removeEventListener('scroll', onScroll);
    //         if (scrollTimeout) {
    //             clearTimeout(scrollTimeout);
    //         }
    //     };
    // }, [handleScroll]);

    if (isGlobalDataLoading) return <div className='text-center w-full'>Loading..</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <main className="rounded-xl min-h-screen">
            <div>
                <RunningTab btcData={bitcoinData} globalData={globalData.data} />
                <Intro />
                <DashboardCards globalData={globalData.data} isGlobalDataLoading={isGlobalDataLoading} />
            </div>
            <div className='border-[0.5px] opacity-20 my-2' />
            <CryptoTable />
            {/* {isLoadingMore && (
                <div className="flex justify-center p-4">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
            )} */}
        </main>
    );
};

export default Main;