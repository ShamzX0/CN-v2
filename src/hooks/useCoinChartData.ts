// src/hooks/useCoinChartData.ts
import useSWR from "swr";
import getCoinChartData from "./fetch/getCoinChartData";

const FALLBACK_CHART_DATA = {
  prices: [],
  market_caps: [],
  total_volumes: [],
};

export default function useCoinChartData(
  coinId: string,
  days: number = 90,
  currency: string = "usd"
) {
  return useSWR(
    `getCoinChartData-${coinId}-${days}-${currency}`,
    () => getCoinChartData(coinId, days, currency),
    {
      refreshInterval: 300000, // Update every 5 minutes
      revalidateOnFocus: false,
      suspense: true,
      fallbackData: FALLBACK_CHART_DATA,
    }
  );
}
