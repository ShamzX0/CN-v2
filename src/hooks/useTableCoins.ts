import useSWR from "swr";
import getTableCoins, {
  FALLBACK_TABLE_COINS_DATA,
} from "./fetch/getTableCoins";

export default function useTableCoins() {
  // Keep the original SWR hook for the first page
  const { data, error, isLoading } = useSWR(
    "getTableCoins",
    () => getTableCoins(1, 20),
    {
      refreshInterval: 600000,
      revalidateOnFocus: false,
      suspense: true,
      fallbackData: FALLBACK_TABLE_COINS_DATA,
    }
  );

  // Add a function to fetch additional pages
  const fetchMoreCoins = async (page: number, perPage: number = 20) => {
    if (page === 1) {
      return data; // Return data from SWR cache for first page
    }

    // For subsequent pages, make a direct API call
    return await getTableCoins(page, perPage);
  };

  return {
    data,
    error,
    isLoading,
    fetchMoreCoins,
  };
}

// import useSWR from "swr";
// import getTableCoins, {
//   FALLBACK_TABLE_COINS_DATA,
// } from "./fetch/getTableCoins";

// export default function useTableCoins() {
//   return useSWR("getTableCoins", () => getTableCoins(), {
//     refreshInterval: 600000,
//     revalidateOnFocus: false,
//     suspense: true,
//     fallbackData: FALLBACK_TABLE_COINS_DATA,
//   });
// }
