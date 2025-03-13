// src/hooks/useCoinChartData.ts
import useSWR from "swr";
import getCoinChartData from "./fetch/getCoinChartData";

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
    }
  );
}
