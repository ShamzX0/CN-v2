// src/hooks/useCoinDetail.ts
import useSWR from "swr";
import getCoinDetail, {
  FALLBACK_COIN_DETAIL_DATA,
} from "./fetch/getCoinDetail";

export default function useCoinDetail(coinId: string) {
  return useSWR(`getCoinDetail-${coinId}`, () => getCoinDetail(coinId), {
    refreshInterval: 60000, // Update every minute for price data
    revalidateOnFocus: false,
    suspense: true,
    fallbackData: FALLBACK_COIN_DETAIL_DATA(coinId),
  });
}
