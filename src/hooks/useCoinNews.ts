import useSWR from "swr";
import getCoinNews from "./fetch/getCoinNews";

export type NewsFilter = "bullish" | "bearish";

interface CoinNewsParams {
  filter?: NewsFilter | null;
  kind?: "news" | "media";
  regions?: string[];
  page?: number;
  refreshInterval?: number;
}

export default function useCoinNews(params: CoinNewsParams = {}) {
  const {
    filter,
    kind = "news",
    regions,
    page,
    refreshInterval = 600000, // 10 minutes default
  } = params;

  // Build a unique cache key based on all relevant parameters
  const cacheKey = `coinNews-${filter || "all"}-${kind}-${
    regions?.join(",") || "all"
  }-${page || 1}`;

  const { data, error, isValidating, mutate } = useSWR(
    cacheKey,
    () =>
      getCoinNews({
        filter: filter || undefined,
        kind,
        regions,
        page,
        public: true,
      }),
    {
      refreshInterval,
      revalidateOnFocus: false,
      suspense: false,
    }
  );

  return {
    data,
    error,
    isLoading: !data && !error,
    isValidating,
    refresh: () => mutate(),
  };
}
