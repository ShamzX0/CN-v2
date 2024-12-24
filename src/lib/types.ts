interface NewsVotes {
    negative: number;
    positive: number;
    important: number;
    liked: number;
    disliked: number;
}

interface NewsSource {
    domain: string;
    path: string | null;
    region: string;
    title: string;
    type: string;
}

interface CryptopanicNews {
    created_at: string;
    currencies?: Array<Record<string, unknown>>;
    domain: string;
    id: number;
    kind: 'news' | 'media';
    published_at: string;
    slug: string;
    source: NewsSource;
    title: string;
    url: string;
    votes: NewsVotes;
}

type CryptopanicNewsData = CryptopanicNews[];

interface Sparkline {
    price: number[];
}

interface CryptoData {
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
    roi: null | Record<string, any>;
    last_updated: string;
    sparkline_in_7d: Sparkline,
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
  }

export type { CryptopanicNewsData, CryptopanicNews, CryptoData };