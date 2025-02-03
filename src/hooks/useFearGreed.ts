import useSWR from "swr";
import getFearGreed from "./fetch/getFearGreed";

export default function useFearGreed() {
  return useSWR("getFearGreed", () => getFearGreed(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
  });
}
