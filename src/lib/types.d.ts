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
  kind: "news" | "media";
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
