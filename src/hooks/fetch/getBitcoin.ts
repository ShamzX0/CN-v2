export default async function getBitcoin(): Promise<BitcoinPriceResponse> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching markets data:", error);
    return {
      bitcoin: {
        usd: 98180,
        usd_24h_change: 0.27666305700037314,
      },
    };
  }
}
