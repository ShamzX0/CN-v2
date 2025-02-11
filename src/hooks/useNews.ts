import useSWR from "swr";
import getNews, { FALLBACK_NEWS_DATA } from "./fetch/getNews";

export default function useNews() {
  return useSWR("getNews", () => getNews(), {
    refreshInterval: 600000,
    revalidateOnFocus: false,
    suspense: true,
    fallbackData: FALLBACK_NEWS_DATA,
  });
}
