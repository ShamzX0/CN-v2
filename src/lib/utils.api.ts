import { CryptopanicNewsData } from "./types";

// utils.api.ts
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
const CRYPTOPANIC_API_KEY = process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY;


export const fetchCoinGeckoData = async () => {
    const headers = {
        'x-cg-demo-api-key': API_KEY || '',
        'accept': 'application/json'
    };

    try {
        const [globalData, trendingCoins, bitcoin] = await Promise.all([
            fetch('https://api.coingecko.com/api/v3/global', { headers }).then(res => res.json()),
            fetch('https://api.coingecko.com/api/v3/search/trending', { headers }).then(res => res.json()),
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true', { headers }).then(res => res.json())
        ]);

        return {
            globalData,
            trendingCoins,
            bitcoinData: bitcoin
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const getFearGreedIndex = async () => {
    try {
        const response = await fetch('https://api.alternative.me/fng/?limit=1');
        const json = await response.json();
        return json.data[0];
    } catch (error) {
        console.error('Error fetching Fear & Greed Index:', error);
        return null;
    }
};
export const fetchCryptoPanicNews = async () => {
    const CRYPTOPANIC_API_KEY = process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY; // Ensure it's loaded here
    const url = 'https://cryptopanic.com/api/v1/posts/?auth_token=7e0fc2f35594ecd54980cd0bcf47be01a561eb80&public=true';
    // const params = new URLSearchParams({
    //   auth_token: CRYPTOPANIC_API_KEY || '',
    //   public: 'true',
    // });
  
    console.log(CRYPTOPANIC_API_KEY, 'from utils.api.ts'); // Debug
  
    try {
    //   const response = await fetch(`${url}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    const response = await fetch(url)
  
      if (!response.ok) {
        console.error('API fetch error');
      }
  
      const data = await response.json();
      console.log('API response ======:', data.results);

      return data.results as CryptopanicNewsData
    } catch (error) {
      console.error('Error fetching crypto news:', error);
      return [];
    }
  };
  console.log(process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY, 'from utils.api.ts');
  