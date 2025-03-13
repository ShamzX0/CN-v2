import useSWR from "swr";
import getBitcoin, { FALLBACK_BTC_DATA } from "./fetch/getBitcoin";

export default function useBitcoin() {
  return useSWR("getBitcoin", () => getBitcoin(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
    fallbackData: FALLBACK_BTC_DATA,
  });
}
