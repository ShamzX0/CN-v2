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

interface NewsVotes {
  negative: number;
  positive: number;
  important: number;
  liked: number;
}

interface NewsSource {
  title: string;
  region: string;
  domain: string;
}

interface NewsItem {
  created_at: string;
  currencies?: {
    [key: string]: any;
  }[];
  domain: string;
  id?: number;
  kind: string;
  published_at: string;
  slug: string;
  source: NewsSource;
  url: string;
  votes: NewsVotes;
}

interface FearGreedDataPoint {
  time_until_update: string;
  timestamp: string;
  value: string;
  value_classification:
    | "Fear"
    | "Greed"
    | "Neutral"
    | "Extreme Fear"
    | "Extreme Greed";
}

interface FearGreedMetadata {
  error: null | string;
  name: string;
}

interface FearGreedResponse {
  name: string;
  data: FearGreedDataPoint[];
  metadata: FearGreedMetadata;
}

interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: {
    btc: number;
    eth: number;
  };
  total_volume: {
    btc: number;
    eth: number;
  };
  market_cap_percentage: {
    btc: number;
    eth: number;
  };
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}
