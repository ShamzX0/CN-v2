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
  title: string;
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
    usd: number;
  };
  total_volume: {
    btc: number;
    eth: number;
    usd: number;
  };
  market_cap_percentage: {
    bnb: number;
    xrp: number;
    btc: number;
    eth: number;
    sol: number;
  };
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: any;
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

  market_cap_change_24h_in_currency?: number;
  price_change_percentage_1y?: number;
  price_change_percentage_30d?: number;
  sentiment_votes_down_percentage?: number;
  sentiment_votes_up_percentage?: number;
  description?: string;
}

interface TrendingDataResponse {
  categories: Categories[];
  coins: Coins[];
  nfts: NFTs[];
}

interface Categories {
  coins_count: string;
  data: CategoryData;
  id: number;
  market_cap_1h_change: number;
  name: string;
  slug: string;
}

interface CategoryData {
  market_cap: number;
  market_cap_btc: number;
  market_cap_change_percentage_24h: MarketCapChangePercentage24h;
  sparkline: string;
  total_volume: number;
  total_volume_btc: number;
}

interface MarketCapChangePercentage24h {
  [key: string]: number;
}

interface Coins {
  item: CoinItem;
}

interface OneCoinData {
  price: number;
  price_btc: string;
  price_change_percentage_24h: PriceChangePercentage;
  market_cap: string;
  market_cap_btc: string;
}

interface CoinItem {
  coin_id: number;
  data: OneCoinData;
  id: string;
  large: string;
  market_cap_rank: number;
  name: string;
  price_btc: number;
  score: number;
  slug: string;
  small: string;
  symbol: string;
  thumb: string;
}

interface PriceChangePercentage {
  [key: string]: number;
}

interface NFTs {
  data: NFTData;
  id: string;
  name: string;
  native_currency_symbol: string;
  nft_contract_id: number;
  symbol: string;
  thumb: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
}

interface NFTData {
  floor_price: string;
  floor_price_in_usd_24h_percentage_change: string;
  h24_volume: string;
  h24_average_sale_price: string;
  sparkline: string;
}
