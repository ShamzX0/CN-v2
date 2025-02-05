const FALLBACK_DATA: BitcoinPriceResponse = {
  bitcoin: {
    usd: 98180,
    usd_24h_change: 0.27666305700037314,
  },
};

export default async function getBitcoin(): Promise<BitcoinPriceResponse> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
    );
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching bitcoin price:", error);
    return FALLBACK_DATA;
  }
}
