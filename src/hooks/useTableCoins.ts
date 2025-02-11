import useSWR from "swr";
import getTableCoins, {
  FALLBACK_TABLE_COINS_DATA,
} from "./fetch/getTableCoins";

export default function useTableCoins() {
  return useSWR("getTableCoins", () => getTableCoins(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
    fallbackData: FALLBACK_TABLE_COINS_DATA,
  });
}
