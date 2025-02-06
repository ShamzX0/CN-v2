export default async function getTrendingData(): Promise<TrendingDataResponse> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/search/trending"
    );

    const data = await response.json();
    console.log(data, "RESPONSE getTrendingDatagetTrendingDatagetTrendingData");
    return data;
  } catch (error) {
    console.error("Error fetching markets data:", error);
    return {
      categories: [],
      coins: [],
      nfts: [],
    };
  }
}
