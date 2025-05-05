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
    refreshInterval = 120000,
  } = params;

  const { data, error, isValidating, mutate } = useSWR(
    `coinsNews/key/${filter}`,
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
