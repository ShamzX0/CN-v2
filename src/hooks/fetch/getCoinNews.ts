// app/api/fetch/getCoinNews.ts
export interface NewsItem {
  created_at: string;
  currencies: Array<{
    code: string;
    title: string;
    slug: string;
    url: string;
  }>;
  domain: string;
  kind: string;
  published_at: string;
  slug: string;
  title: string;
  source: {
    title: string;
    region: string;
    domain: string;
  };
  url: string;
  votes: {
    negative: number;
    positive: number;
    important: number;
    liked: number;
  };
}

interface NewsApiParams {
  filter?: "bullish" | "bearish";
  regions?: string[];
  kind?: "news" | "media";
  page?: number;
  public?: boolean;
}

const getRandomPastDate = () => {
  const now = new Date();
  const pastTime =
    now.getTime() -
    Math.floor(
      Math.random() * (22 * 60 * 1000 - 1 * 60 * 1000) + 1 * 60 * 1000
    );
  return new Date(pastTime).toISOString();
};

const AUTH_TOKEN = "add107fcd8027e1359adcba401377ac5174e859a";
// Fallback data if API fails
export const FALLBACK_NEWS_DATA: NewsItem[] = [
  {
    created_at: getRandomPastDate(),
    currencies: [],
    domain: "cryptopanic.com",
    kind: "news",
    published_at: getRandomPastDate(),
    slug: "bitcoin-vs-ethereum-next-bull-run",
    title: "Bitcoin vs Ethereum: Who Will Lead the Next Bull Run?",
    source: {
      title: "CryptoPulse",
      region: "en",
      domain: "cryptopanic.com",
    },
    url: "https://cryptopanic.com",
    votes: {
      negative: 2,
      positive: 15,
      important: 8,
      liked: 10,
    },
  },
  {
    created_at: getRandomPastDate(),
    currencies: [],
    domain: "cryptonews.io",
    kind: "news",
    published_at: getRandomPastDate(),
    slug: "altcoin-season-coming",
    title: "Is the Altcoin Season Finally Here? Experts Weigh In",
    source: {
      title: "BlockReport",
      region: "en",
      domain: "cryptonews.io",
    },
    url: "https://cryptonews.io",
    votes: {
      negative: 1,
      positive: 20,
      important: 12,
      liked: 18,
    },
  },
  {
    created_at: getRandomPastDate(),
    currencies: [],
    domain: "cryptodaily.com",
    kind: "news",
    published_at: getRandomPastDate(),
    slug: "memecoins-rally-continues",
    title: "Meme Coins Rally: Will DOGE and XRP Continue Their Uptrend?",
    source: {
      title: "DailyCrypto",
      region: "en",
      domain: "cryptodaily.com",
    },
    url: "https://cryptodaily.com",
    votes: {
      negative: 5,
      positive: 10,
      important: 7,
      liked: 9,
    },
  },
  {
    created_at: getRandomPastDate(),
    currencies: [],
    domain: "cryptonews.com",
    kind: "news",
    published_at: getRandomPastDate(),
    slug: "bnb-vs-avax-defi-growth",
    title: "BNB vs AVAX: Which Blockchain Is Dominating DeFi in 2025?",
    source: {
      title: "DeFi Watch",
      region: "en",
      domain: "cryptonews.com",
    },
    url: "https://blocknews.com/",
    votes: {
      negative: 3,
      positive: 14,
      important: 9,
      liked: 11,
    },
  },
  {
    created_at: getRandomPastDate(),
    currencies: [],
    domain: "blockchaininsider.io",
    kind: "news",
    published_at: getRandomPastDate(),
    slug: "polkadot-vs-polygon-web3",
    title: "Polkadot vs Polygon: Which Network Is Leading the Web3 Revolution?",
    source: {
      title: "Blockchain Insider",
      region: "en",
      domain: "blockchaininsider.io",
    },
    url: "https://blockchaininsider.io",
    votes: {
      negative: 2,
      positive: 16,
      important: 10,
      liked: 12,
    },
  },
  {
    created_at: getRandomPastDate(),
    currencies: [],
    domain: "blockmaniac.com",
    kind: "news",
    published_at: getRandomPastDate(),
    slug: "bitcoin-vs-ethereum-next-bull-run",
    title: "LTC vs BTC-CASH: Who Will Lead the Next Bull Run?",
    source: {
      title: "CryptoPulse",
      region: "en",
      domain: "cryptopanic.com",
    },
    url: "https://cryptopanic.com",
    votes: {
      negative: 2,
      positive: 15,
      important: 8,
      liked: 10,
    },
  },
];

export default async function getCoinNews(
  params: NewsApiParams
): Promise<NewsItem[]> {
  try {
    // Simplified to directly fetch with the given parameters
    return await fetchNewsWithParams(params);
  } catch (error) {
    console.error(`Error fetching coin news:`, error);
    return FALLBACK_NEWS_DATA;
  }
}

// Helper function to fetch news with the given parameters
async function fetchNewsWithParams(params: NewsApiParams): Promise<NewsItem[]> {
  const queryParams = buildQueryParams(params);
  const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${AUTH_TOKEN}${queryParams}`;

  console.log(`Fetching news with filter: ${params.filter}`);
  console.log(`Full URL: ${url}`);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(
      `Received ${data.results?.length || 0} news items for filter: ${
        params.filter
      }`
    );

    // Check if we got results
    if (!data.results || data.results.length === 0) {
      console.warn(`No results for filter: ${params.filter}`);
    }

    return data.results || [];
  } catch (error) {
    console.error("Error fetching from CryptoPanic API:", error);
    throw error;
  }
}

// Helper function to build query parameters
function buildQueryParams(params: NewsApiParams): string {
  const queryParts: string[] = [];

  // Always set public to true as that's what we're using
  queryParts.push("&public=true");

  if (params.filter) {
    queryParts.push(`&filter=${params.filter}`);
  }

  if (params.regions && params.regions.length > 0) {
    queryParts.push(`&regions=${params.regions.join(",")}`);
  }

  if (params.kind) {
    queryParts.push(`&kind=${params.kind}`);
  }

  if (params.page && params.page > 1) {
    queryParts.push(`&page=${params.page}`);
  }

  return queryParts.join("");
}
