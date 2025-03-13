import useSWR from "swr";
import getFearGreed, { DEFAULT_FEAR_GREED_DATA } from "./fetch/getFearGreed";

export default function useFearGreed() {
  return useSWR("getFearGreed", () => getFearGreed(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
    fallbackData: DEFAULT_FEAR_GREED_DATA,
  });
}
