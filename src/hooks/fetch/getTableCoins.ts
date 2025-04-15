import { dummyData } from "@/helpers/dummyData";

export const FALLBACK_TABLE_COINS_DATA = dummyData;

export default async function getTableCoins(
  page: number = 1,
  perPage: number = 20
): Promise<CoinData[]> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&locale=en`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching markets data for page ${page}:`, error);
    // Only return fallback data for the first page
    return page === 1 ? FALLBACK_TABLE_COINS_DATA : [];
  }
}

// import { dummyData } from "@/helpers/dummyData";

// export const FALLBACK_TABLE_COINS_DATA = dummyData;

// export default async function getTableCoins(): Promise<CoinData[]> {
//   try {
//     const response = await fetch(
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h,24h,7d&locale=en"
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error fetching markets data:", error);
//     return FALLBACK_TABLE_COINS_DATA;
//   }
// }
