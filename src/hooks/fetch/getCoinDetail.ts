// You can create a fallback for a single coin
export const FALLBACK_COINDETAIL_DATA = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc",
  image: "/placeholder-coin.png",
  current_price: 12270,
  market_cap: 1841831458072,
  total_volume: 67848753414,
  price_change_percentage_24h: 2.5,
  price_change_percentage_7d_in_currency: 3.2,
  fully_diluted_valuation: 1941831458072,
  circulating_supply: 19500000,
  ath: 138110,
  description: "Bitcoin is the first successful internet money...",
};

export default async function getCoinDetail(coinId: string): Promise<any> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`
    );
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching bitcoin price:", error);
    return FALLBACK_COINDETAIL_DATA;
  }
}
