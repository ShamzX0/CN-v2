import useSWR from "swr";
import getTrendingData from "./fetch/getTrendingCoins";

export default function useTrendingData() {
  return useSWR("getTrendingData", () => getTrendingData(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
    fallbackData: [] as any,
  });
}
