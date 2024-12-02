// types/coingecko.ts

// Global Data Response
export interface IGlobalData {  // Added 'I' prefix
    data: {
        active_cryptocurrencies: number;
        total_market_cap: {
            [key: string]: number;
        };
        total_volume: {
            [key: string]: number;
        };
        market_cap_percentage: {
            [key: string]: number;
        };
        market_cap_change_percentage_24h_usd: number;
        updated_at: number;
    };
}

// Trending Coins Response
export interface ITrendingCoins {  // Added 'I' prefix
    coins: Array<{
        item: {
            id: string;
            name: string;
            symbol: string;
            thumb: string;
            price_btc: number;
            // ... rest of the properties
        };
    }>;
}

// Simple Price Response
export interface ISimplePriceResponse {  // Added 'I' prefix
    [coinId: string]: {
        usd: number;
        usd_24h_change?: number;
    };
}

// Combined response type
export interface ICoinGeckoResponse {  // Added 'I' prefix
    globalData: IGlobalData;
    trendingCoins: ITrendingCoins;
    bitcoinData: ISimplePriceResponse;
}

// Now let's update the API utility function with these types:


const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

type ApiHeaders = Record<string, string>;

async function fetchWithErrorHandling<T>(url: string): Promise<T> {
    const headers: ApiHeaders = {
        'x-cg-demo-api-key': API_KEY || '',
        'accept': 'application/json'
    };

    try {
        const response = await fetch(url, { 
            method: 'GET',
            headers 
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        throw error;
    }
}

export const fetchCoinGeckoData = async (): Promise<ICoinGeckoResponse | null> => {
    try {
        const [globalData, trendingCoins, bitcoin] = await Promise.all([
            fetchWithErrorHandling<IGlobalData>('https://api.coingecko.com/api/v3/global'),
            fetchWithErrorHandling<ITrendingCoins>('https://api.coingecko.com/api/v3/search/trending'),
            fetchWithErrorHandling<ISimplePriceResponse>('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
        ]);

        return {
            globalData,
            trendingCoins,
            bitcoinData: bitcoin
        };
    } catch (error) {
        console.error('Error in fetchCoinGeckoData:', error);
        return null;
    }
};