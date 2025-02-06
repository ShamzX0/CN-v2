import useSWR from "swr";
import getGlobalData from "./fetch/getGlobalData";

export default function useGlobalData() {
  return useSWR("getGlobalData", () => getGlobalData(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
    fallbackData: [] as unknown as GlobalData,
  });
}
