import useSWR from "swr";
import getGlobalData, { FALLBACK_GLOBAL_DATA } from "./fetch/getGlobalData";

export default function useGlobalData() {
  return useSWR("getGlobalData", () => getGlobalData(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
    fallbackData: FALLBACK_GLOBAL_DATA,
  });
}
