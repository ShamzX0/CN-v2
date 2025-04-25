export const FALLBACK_GLOBAL_DATA = {
  active_cryptocurrencies: 17058,
  upcoming_icos: 0,
  ongoing_icos: 49,
  ended_icos: 3376,
  markets: 1227,
  total_market_cap: {
    btc: 34141163.216,
    eth: 1209276196.036,
    usd: 312323249678.3,
  },
  total_volume: {
    btc: 2114261.3191025313,
    eth: 74886900.28480999,
    usd: 12324242321.3,
  },
  market_cap_percentage: {
    btc: 58.05256509393119,
    eth: 9.970363027182204,
    sol: 1598.3,
    xrp: 4.21,
    bnb: 2.91,
  },
  market_cap_change_percentage_24h_usd: -2.461,
  updated_at: 1738740983,
};

export default async function getGlobalData(): Promise<GlobalData> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global");

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching markets data:", error);
    return FALLBACK_GLOBAL_DATA;
  }
}
