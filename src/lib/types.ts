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


export type { CryptopanicNewsData, CryptopanicNews };