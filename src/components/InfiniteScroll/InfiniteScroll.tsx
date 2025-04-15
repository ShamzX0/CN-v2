import { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// Generic type for the items we'll be displaying
interface Item {
    id: string | number;
    [key: string]: any; // Allow for any additional properties
}

interface InfiniteScrollListProps<T extends Item> {
    fetchData: (page: number) => Promise<T[]>;
    renderItem: (item: T) => JSX.Element;
    hasMoreInitial?: boolean;
    loader?: JSX.Element;
    endMessage?: JSX.Element;
    className?: string;
    dataLength?: number; // Optional starting data length
    initialItems?: T[]; // Optional initial items
    scrollThreshold?: number; // Configurable scroll threshold
    scrollableTarget?: string; // ID of the scrollable target
    height?: string; // Optional height for the scroll container
    itemsPerPage?: number; // Track items per page for debugging
    debug?: boolean; // Enable debug logging
}

function InfiniteScrollList<T extends Item>({
    fetchData,
    renderItem,
    hasMoreInitial = true,
    loader = <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>,
    endMessage = <p className="text-center py-4">You have seen it all!</p>,
    className = '',
    dataLength = 0,
    initialItems = [],
    scrollThreshold = 0.7, // Changed to match your working example
    scrollableTarget,
    height,
    itemsPerPage = 20,
    debug = false,
}: InfiniteScrollListProps<T>) {
    const [items, setItems] = useState<T[]>(initialItems);
    const [hasMore, setHasMore] = useState(hasMoreInitial);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const mountedRef = useRef(true);

    // Debug logging function
    const logDebug = (message: string, data?: any) => {
        if (debug) {
            console.log(`[InfiniteScrollList] ${message}`, data || '');
        }
    };

    useEffect(() => {
        // If no initial items were provided, fetch the first batch
        if (initialItems.length === 0) {
            logDebug('No initial items, fetching first batch');
            loadMoreData();
        } else {
            logDebug('Using initial items', initialItems.length);
        }

        return () => {
            mountedRef.current = false;
        };
    }, []);

    // Effect to track items changes
    useEffect(() => {
        logDebug('Items updated', items.length);
    }, [items]);

    const loadMoreData = async () => {
        if (loading) {
            logDebug('Already loading, skipping fetch');
            return;
        }

        logDebug(`Fetching page ${page}, current items: ${items.length}`);
        setLoading(true);

        try {
            const newItems = await fetchData(page);

            if (!mountedRef.current) return;

            logDebug(`Received ${newItems.length} new items`);

            if (newItems.length === 0) {
                logDebug('No more items to load');
                setHasMore(false);
            } else {
                setItems((prevItems) => [...prevItems, ...newItems]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            logDebug('Error fetching data:', error);
            console.error('Error fetching data:', error);
        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    };

    // Ensure we have a non-zero dataLength for InfiniteScroll
    const effectiveDataLength = items.length || dataLength || 0;

    const scrollProps = {
        height,
        scrollableTarget,
    };

    // Only include height and scrollableTarget if they're defined
    const filteredScrollProps = Object.fromEntries(
        Object.entries(scrollProps).filter(([_, value]) => value !== undefined)
    );

    return (
        <div className={className}>
            <InfiniteScroll
                dataLength={effectiveDataLength}
                next={loadMoreData}
                hasMore={hasMore}
                loader={loader}
                endMessage={endMessage}
                scrollThreshold={scrollThreshold}
                {...filteredScrollProps}
            >
                {items.map((item, index) => (
                    <div key={item.id || index}>
                        {renderItem(item)}
                    </div>
                ))}
            </InfiniteScroll>

            {/* Add a small element at the bottom to help with scrolling detection */}
            {hasMore && <div className="h-10"></div>}
        </div>
    );
}

export default InfiniteScrollList;