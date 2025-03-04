import { CoinData } from "./types";

export default async function getCoinDetail(coinId: string): Promise<CoinData> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`
    );

    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    console.log(data, "COIN DATA FETCHED");

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
    return FALLBACK_COIN_DETAIL_DATA; // Make sure this fallback constant is defined elsewhere
  }
}
