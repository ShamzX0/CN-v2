interface BitcoinPriceResponse {
  bitcoin: {
    usd: number;
    usd_24h_change: number;
  };
}

interface CryptopanicNews {
  id: string | number;
  title: string;
  url: string;
  domain: string;
  published_at: string;
}
