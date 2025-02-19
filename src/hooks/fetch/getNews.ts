const getRandomPastDate = () => {
  const now = new Date();
  const pastTime =
    now.getTime() -
    Math.floor(
      Math.random() * (22 * 60 * 1000 - 1 * 60 * 1000) + 1 * 60 * 1000
    );
  return new Date(pastTime).toISOString();
};

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
