// hooks/useCoinNews.ts
import { useState } from "react";
import useSWR from "swr";
import getCoinNews, { FALLBACK_NEWS_DATA } from "../hooks/fetch/getCoinNews";

interface CoinNewsParams {
  currencies?: string[];
  filter?:
    | "rising"
    | "hot"
    | "bullish"
    | "bearish"
    | "important"
    | "saved"
    | "lol";
  regions?: string[];
  kind?: "news" | "media";
  page?: number;
  refreshInterval?: number;
}

export default function useCoinNews(params: CoinNewsParams = {}) {
  const {
    currencies = [],
    filter,
    regions,
    kind,
    page = 1,
    refreshInterval = 600000, // 10 minutes default
  } = params;

  // Build a cache key based on all parameters
  const cacheKey = `coinNews-${currencies.sort().join(",")}-${filter || ""}-${
    regions?.join(",") || ""
  }-${kind || ""}-${page}`;

  const { data, error, isValidating, mutate } = useSWR(
    cacheKey,
    () =>
      getCoinNews({ currencies, filter, regions, kind, page, public: true }),
    {
      refreshInterval,
      revalidateOnFocus: false,
      suspense: false, // Handle loading state manually
      fallbackData: FALLBACK_NEWS_DATA,
    }
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(page);

  // Function to load the next page
  const loadNextPage = async () => {
    if (!currencies.length) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    try {
      // Fetch the next page data
      const nextPageData = await getCoinNews({
        currencies,
        filter,
        regions,
        kind,
        page: nextPage,
        public: true,
      });

      // If we have current data, append the new data to it
      if (data) {
        // Create a new array with all unique items
        const combinedData = [...data, ...nextPageData];
        // Remove duplicates based on slug
        const uniqueData = Array.from(
          new Map(combinedData.map((item) => [item.slug, item])).values()
        );
        // Update the cache
        mutate(uniqueData, false);
      }
    } catch (error) {
      console.error("Error loading next page:", error);
    }
  };

  return {
    data,
    error,
    isLoading: !data && !error && currencies.length > 0,
    isValidating,
    loadNextPage,
    currentPage,
    hasNextPage: data?.length === 50, // If we got 50 items, there might be more
    refresh: () => mutate(),
  };
}
