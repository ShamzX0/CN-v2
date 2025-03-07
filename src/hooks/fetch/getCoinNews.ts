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
  currencies?: string[];
  filter?:
    | "rising"
    | "hot"
    | "bullish"
    | "bearish"
    | "important"
    | "saved"
    | "lol";
  regions?: string[];
  kind?: "news" | "media";
  page?: number;
  public?: boolean;
}

const AUTH_TOKEN = "add107fcd8027e1359adcba401377ac5174e859a"; // Your auth token
const MAX_CURRENCIES_PER_REQUEST = 50; // API limitation

// Fallback data if API fails
export const FALLBACK_COIN_NEWS_DATA: NewsItem[] = [
  {
    created_at: new Date().toISOString(),
    currencies: [
      {
        code: "BTC",
        title: "Bitcoin",
        slug: "bitcoin",
        url: "https://cryptopanic.com/news/bitcoin/",
      },
    ],
    domain: "cryptopanic.com",
    kind: "news",
    published_at: new Date().toISOString(),
    slug: "crypto-markets-update-today",
    title: "Cryptocurrency Market Update for Today",
    source: {
      title: "CryptoPanic",
      region: "en",
      domain: "cryptopanic.com",
    },
    url: "https://cryptopanic.com",
    votes: {
      negative: 1,
      positive: 10,
      important: 5,
      liked: 8,
    },
  },
];

export default async function getCoinNews(
  params: NewsApiParams
): Promise<NewsItem[]> {
  try {
    const {
      currencies = ["BTC", "ETH", "ADA", "XRP", "SOL"], // Add default currencies here
      filter,
      regions,
      kind,
      page = 1,
      public: isPublic = true,
    } = params;

    // If we have more than MAX_CURRENCIES_PER_REQUEST, we need to make multiple requests
    if (currencies.length > MAX_CURRENCIES_PER_REQUEST) {
      // Make multiple requests in chunks of MAX_CURRENCIES_PER_REQUEST
      const allResults: NewsItem[] = [];

      // Process in chunks of 50 currencies (API limit)
      for (let i = 0; i < currencies.length; i += MAX_CURRENCIES_PER_REQUEST) {
        const currencyChunk = currencies.slice(
          i,
          i + MAX_CURRENCIES_PER_REQUEST
        );
        const chunkResults = await fetchNewsWithParams({
          ...params,
          currencies: currencyChunk,
        });
        allResults.push(...chunkResults);
      }

      // Remove duplicates (if any) based on slug
      const uniqueResults = Array.from(
        new Map(allResults.map((item) => [item.slug, item])).values()
      );

      // Sort by published_at to keep the most recent first
      return uniqueResults.sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );
    } else {
      // Normal case - fetch with the provided currencies
      return await fetchNewsWithParams(params);
    }
  } catch (error) {
    console.error(`Error fetching coin news:`, error);
    return FALLBACK_COIN_NEWS_DATA;
  }
}

// Helper function to fetch news with the given parameters
async function fetchNewsWithParams(params: NewsApiParams): Promise<NewsItem[]> {
  const queryParams = buildQueryParams(params);
  const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${AUTH_TOKEN}${queryParams}`;

  console.log("Fetching from URL:", url); // Log the full URL (remove in production)

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("API Response not OK:", await response.text());
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Raw API Response:", data); // Log the raw response
    return data.results || [];
  } catch (error) {
    console.error("Error fetching from CryptoPanic API:", error);
    throw error;
  }
}

// Helper function to build query parameters
function buildQueryParams(params: NewsApiParams): string {
  const queryParts: string[] = [];

  if (params.public) {
    queryParts.push("&public=true");
  }

  if (params.currencies && params.currencies.length > 0) {
    queryParts.push(`&currencies=${params.currencies.join(",")}`);
  }

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
