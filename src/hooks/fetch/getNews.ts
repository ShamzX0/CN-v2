export const FALLBACK_NEWS_DATA: NewsItem[] = [
  {
    created_at: new Date().toISOString(),
    currencies: [],
    domain: "cryptopanic.com",
    kind: "news",
    published_at: new Date().toISOString(),
    slug: "no-news-available",
    title: "System",
    source: {
      title: "System",
      region: "en",
      domain: "cryptopanic.com",
    },
    url: "https://cryptopanic.com",
    votes: {
      negative: 0,
      positive: 0,
      important: 0,
      liked: 0,
    },
  },
];

export default async function getNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      "https://cryptopanic.com/api/v1/posts/?auth_token=add107fcd8027e1359adcba401377ac5174e859a&public=true"
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching markets data:", error);
    return FALLBACK_NEWS_DATA;
  }
}
