import useSWR from "swr";
import getBitcoin from "./fetch/getBitcoin";

export default function useBitcoin() {
  return useSWR("getBitcoin", () => getBitcoin(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
  });
}
