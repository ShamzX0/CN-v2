// src/hooks/fetch/getCoinChartData.ts

export interface ChartData {
  prices: [number, number][]; // [timestamp, price]
  market_caps: [number, number][]; // [timestamp, market_cap]
  total_volumes: [number, number][]; // [timestamp, volume]
  priceChange?: {
    percentChange: number;
    absoluteChange: number;
    startPrice: number;
    endPrice: number;
    highPrice: number;
    lowPrice: number;
    highTimestamp: number;
    lowTimestamp: number;
  };
}

const FALLBACK_CHART_DATA: ChartData = {
  prices: [],
  market_caps: [],
  total_volumes: [],
};

export default async function getCoinChartData(
  coinId: string,
  days: number = 90,
  currency: string = "usd"
): Promise<ChartData> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
    );

    if (!response.ok) throw new Error("Failed to fetch chart data");

    const data = await response.json();

    const chartData: ChartData = {
      prices: data.prices || [],
      market_caps: data.market_caps || [],
      total_volumes: data.total_volumes || [],
    };

    // Add price change analytics if we have price data
    if (chartData.prices && chartData.prices.length > 0) {
      const prices = chartData.prices.map((item) => item[1]);
      const startPrice = prices[0];
      const endPrice = prices[prices.length - 1];
      const absoluteChange = endPrice - startPrice;
      const percentChange = (absoluteChange / startPrice) * 100;

      // Find high and low prices
      const highPrice = Math.max(...prices);
      const lowPrice = Math.min(...prices);

      // Find timestamps for high and low prices
      const highIndex = prices.indexOf(highPrice);
      const lowIndex = prices.indexOf(lowPrice);

      chartData.priceChange = {
        percentChange,
        absoluteChange,
        startPrice,
        endPrice,
        highPrice,
        lowPrice,
        highTimestamp: chartData.prices[highIndex][0],
        lowTimestamp: chartData.prices[lowIndex][0],
      };
    }

    return chartData;
  } catch (error) {
    console.error("Error fetching coin chart data:", error);
    return FALLBACK_CHART_DATA;
  }
}
