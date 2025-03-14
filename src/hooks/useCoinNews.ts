import useSWR from "swr";
import getCoinNews, { FALLBACK_NEWS_DATA } from "./fetch/getCoinNews";

type NewsFilter = "rising" | "hot" | "bullish" | "bearish" | null;

interface CoinNewsParams {
  filter?: NewsFilter;
  kind?: "news" | "media";
  refreshInterval?: number;
}

export default function useCoinNews(params: CoinNewsParams = {}) {
  const {
    filter,
    kind = "news",
    refreshInterval = 600000, // 10 minutes default
  } = params;

  // Build a simple cache key based on the filter
  const cacheKey = `coinNews-${filter || "all"}-${kind}`;

  const { data, error, isValidating, mutate } = useSWR(
    cacheKey,
    () =>
      getCoinNews({
        filter: filter || undefined,
        kind,
        public: true,
      }),
    {
      refreshInterval,
      revalidateOnFocus: false,
      suspense: false,
      fallbackData: undefined,
    }
  );

  return {
    data,
    error,
    isLoading: !data || isValidating,
    isValidating,
    refresh: () => mutate(),
  };
}
