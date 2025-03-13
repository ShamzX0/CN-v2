import { CoinData } from "./types";

export const FALLBACK_COIN_DETAIL_DATA = (coinId: string) => ({
  id: coinId || "",
  symbol: (coinId || "").substring(0, 3).toLowerCase(),
  name: coinId ? coinId.charAt(0).toUpperCase() + coinId.slice(1) : "Unknown",
  image: {
    thumb: "/fallback-thumb.png",
    small: "/fallback-small.png",
    large: "/fallback-large.png",
  },
  market_cap_rank: 0,
  current_price: 0,
  market_cap: 0,
  fully_diluted_valuation: 0,
  total_volume: 0,
  high_24h: 0,
  low_24h: 0,
  price_change_24h: 0,
  price_change_percentage_24h: 0,
  market_cap_change_24h: 0,
  market_cap_change_percentage_24h: 0,
  circulating_supply: 0,
  total_supply: null,
  max_supply: null,
  ath: 0,
  ath_change_percentage: 0,
  ath_date: "N/A",
  atl: 0,
  atl_change_percentage: 0,
  atl_date: "N/A",
  roi: null,
  last_updated: new Date().toISOString(),
  sparkline_in_7d: { price: [] },
  price_change_percentage_1h_in_currency: 0,
  price_change_percentage_24h_in_currency: 0,
  price_change_percentage_7d_in_currency: 0,
  market_cap_change_24h_in_currency: 0,
  price_change_percentage_1y: 0,
  price_change_percentage_30d: 0,
  sentiment_votes_down_percentage: 0,
  sentiment_votes_up_percentage: 0,
  description: `Fallback description for ${coinId} when API is unavailable`,
});

export default async function getCoinDetail(coinId: string): Promise<CoinData> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`
    );

    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    console.log(data, "THIS IS DETAILED COIN DATA I GET FROM THE API");

    // Transform the nested API response to match your interface
    const coinData: CoinData = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image || {},
      market_cap_rank: data.market_cap_rank,
      current_price:
        data.current_price?.usd || data.market_data?.current_price?.usd,
      market_cap: data.market_cap?.usd || data.market_data?.market_cap?.usd,
      fully_diluted_valuation:
        data.fully_diluted_valuation?.usd ||
        data.market_data?.fully_diluted_valuation?.usd,
      total_volume:
        data.total_volume?.usd || data.market_data?.total_volume?.usd,
      high_24h: data.high_24h?.usd || data.market_data?.high_24h?.usd,
      low_24h: data.low_24h?.usd || data.market_data?.low_24h?.usd,
      price_change_24h:
        data.price_change_24h || data.market_data?.price_change_24h,
      price_change_percentage_24h:
        data.price_change_percentage_24h ||
        data.market_data?.price_change_percentage_24h,
      market_cap_change_24h:
        data.market_cap_change_24h || data.market_data?.market_cap_change_24h,
      market_cap_change_percentage_24h:
        data.market_cap_change_percentage_24h ||
        data.market_data?.market_cap_change_percentage_24h,
      circulating_supply:
        data.circulating_supply || data.market_data?.circulating_supply,
      total_supply: data.total_supply || data.market_data?.total_supply || null,
      max_supply: data.max_supply || data.market_data?.max_supply || null,
      ath: data.ath?.usd || data.market_data?.ath?.usd,
      ath_change_percentage:
        data.ath_change_percentage?.usd ||
        data.market_data?.ath_change_percentage?.usd,
      ath_date: data.ath_date?.usd || data.market_data?.ath_date?.usd,
      atl: data.atl?.usd || data.market_data?.atl?.usd,
      atl_change_percentage:
        data.atl_change_percentage?.usd ||
        data.market_data?.atl_change_percentage?.usd,
      atl_date: data.atl_date?.usd || data.market_data?.atl_date?.usd,
      roi: data.roi
        ? {
            times: data.roi.times,
            currency: data.roi.currency,
            percentage: data.roi.percentage,
          }
        : null,
      last_updated: data.last_updated,
      sparkline_in_7d: data.sparkline_7d || data.market_data?.sparkline_7d,
      price_change_percentage_1h_in_currency:
        data.price_change_percentage_1h_in_currency?.usd ||
        data.market_data?.price_change_percentage_1h_in_currency?.usd,
      price_change_percentage_24h_in_currency:
        data.price_change_percentage_24h_in_currency?.usd ||
        data.market_data?.price_change_percentage_24h_in_currency?.usd,
      price_change_percentage_7d_in_currency:
        data.price_change_percentage_7d_in_currency?.usd ||
        data.market_data?.price_change_percentage_7d_in_currency?.usd,
      market_cap_change_24h_in_currency:
        data.market_cap_change_24h_in_currency?.usd ||
        data.market_data?.market_cap_change_24h_in_currency?.usd,
      price_change_percentage_1y:
        data.price_change_percentage_1y ||
        data.market_data?.price_change_percentage_1y,
      price_change_percentage_30d:
        data.price_change_percentage_30d ||
        data.market_data?.price_change_percentage_30d,
      sentiment_votes_down_percentage: data.sentiment_votes_down_percentage,
      sentiment_votes_up_percentage: data.sentiment_votes_up_percentage,
      description: data.description?.en || "",
    };

    return coinData;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return FALLBACK_COIN_DETAIL_DATA(coinId);
  }
}
