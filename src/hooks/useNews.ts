import useSWR from "swr";
import getNews from "./fetch/getNews";

export default function useNews() {
  return useSWR("getNews", () => getNews(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
  });
}
