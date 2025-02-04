export default async function getTrendingData(): Promise<any> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/search/trending"
    );

    const data = await response.json();
    console.log(data, "response getTrendingDatagetTrendingDatagetTrendingData");
    return data;
  } catch (error) {
    console.error("Error fetching markets data:", error);
    return [];
  }
}
